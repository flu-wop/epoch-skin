// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { DISCOUNT_CODES } from '@/lib/discounts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const TAX_RATE = 0.0945; // Louisiana state + New Orleans local

// Server-side price lookup — the client sends only a product id + quantity.
const PRICE_BY_ID: Record<string, { name: string; cents: number }> = Object.fromEntries(
  products.map((p) => [p.id, { name: p.name, cents: Math.round(p.price * 100) }])
);

export async function POST(req: Request) {
  const ok = await rateLimit(`checkout:${clientIp(req)}`, 10, 600); // 10 per 10 min
  if (!ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });

  try {
    const body = await req.json();
    const items: unknown = body?.items;
    const rawCode: unknown = body?.discountCode;

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json({ error: 'Invalid cart.' }, { status: 400 });
    }

    // Validate + resolve every line item against the real catalog.
    const resolved: { name: string; unitCents: number; quantity: number }[] = [];
    for (const raw of items) {
      const id = String((raw as any)?.slug ?? (raw as any)?.id ?? '');
      const quantity = Number((raw as any)?.quantity);
      const catalog = PRICE_BY_ID[id];
      if (!catalog) return NextResponse.json({ error: 'Unknown product in cart.' }, { status: 400 });
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json({ error: 'Invalid quantity.' }, { status: 400 });
      }
      resolved.push({ name: catalog.name, unitCents: catalog.cents, quantity });
    }

    // Discount code — case-insensitive, validated against the server-side map only.
    let discountPct = 0;
    let appliedCode: string | null = null;
    if (typeof rawCode === 'string' && rawCode.trim().length > 0) {
      const code = rawCode.trim().toUpperCase().slice(0, 20);
      if (DISCOUNT_CODES[code]) {
        discountPct = DISCOUNT_CODES[code];
        appliedCode = code;
      } else {
        return NextResponse.json({ error: 'Invalid discount code.' }, { status: 400 });
      }
    }

    const lineItems = resolved.map((item) => {
      const discountedUnit = Math.round(item.unitCents * (1 - discountPct));
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: discountedUnit,
        },
        quantity: item.quantity,
      };
    });

    const discountedSubtotalCents = resolved.reduce(
      (sum, item) => sum + Math.round(item.unitCents * (1 - discountPct)) * item.quantity,
      0
    );
    const taxCents = Math.round(discountedSubtotalCents * TAX_RATE);

    if (taxCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sales Tax (LA 9.45%)' },
          unit_amount: taxCents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        items: JSON.stringify(resolved.map((i) => ({ name: i.name, qty: i.quantity }))),
        discountCode: appliedCode ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Checkout failed. Please try again.' }, { status: 500 });
  }
}
