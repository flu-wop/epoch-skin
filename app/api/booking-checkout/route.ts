// app/api/booking-checkout/route.ts
// Creates a Stripe Checkout session for a booking.
// On success, Stripe redirects to /book/success?session_id=xxx
// Webhook at /api/stripe/webhook saves the booking + sends emails.

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { BOOKING_SERVICES } from '@/lib/booking-catalog';
import { resolveDiscountCode } from '@/lib/discounts';
import { checkSlotAvailable, isValidDateString } from '@/lib/availability';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

// Shop fee added on top of the service total (after any discount code).
// Keep this number in sync with SHOP_FEE_RATE in app/book/page.tsx.
const SHOP_FEE_RATE = 0.35;

export async function POST(req: NextRequest) {
  const ok = await rateLimit(`booking-checkout:${clientIp(req)}`, 10, 600); // 10 per 10 min
  if (!ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });

  try {
    const body = await req.json();
    const { name, email, phone, notes, serviceIds, category, date, time, discountCode } = body;

    if (!name || !email || !date || !time || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (serviceIds.length > 20) {
      return NextResponse.json({ error: 'Too many services selected.' }, { status: 400 });
    }

    // Server-side price/duration lookup — never trust amounts from the client.
    const resolved: { id: string; name: string; price: number; duration: number }[] = [];
    for (const rawId of serviceIds) {
      const id = String(rawId);
      const catalog = BOOKING_SERVICES[id];
      if (!catalog) {
        return NextResponse.json({ error: `Unknown service: ${id}` }, { status: 400 });
      }
      resolved.push({ id, ...catalog });
    }

    const service = resolved.map((s) => s.name).join(', ');
    const rawPrice = resolved.reduce((sum, s) => sum + s.price, 0);
    const duration = resolved.reduce((sum, s) => sum + s.duration, 0);

    // Re-check availability on the server, using the catalog duration (never a
    // client-supplied one), before any payment is created. The booking page
    // greys out taken times, but that is only a convenience — this is the real
    // gate, so a hand-edited request can't double-book either.
    if (!isValidDateString(String(date))) {
      return NextResponse.json({ error: 'Invalid date.' }, { status: 400 });
    }
    const slot = await checkSlotAvailable(String(date), String(time), duration);
    if (!slot.ok) {
      if (slot.reason === 'INVALID_TIME') {
        return NextResponse.json({ error: 'Invalid appointment time.' }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'That time was just booked by someone else. Please choose another time.', code: 'SLOT_TAKEN' },
        { status: 409 }
      );
    }

    // Discount code — validated server-side against the same shared map the
    // shop cart uses (lib/discounts.ts). Never trust a discounted price from
    // the client.
    let appliedCode: string | null = null;
    let price = rawPrice;
    if (typeof discountCode === 'string' && discountCode.trim().length > 0) {
      const match = resolveDiscountCode(discountCode);
      if (!match) {
        return NextResponse.json({ error: 'Invalid discount code.' }, { status: 400 });
      }
      appliedCode = match.code;
      price = Math.round(rawPrice * (1 - match.pct) * 100) / 100;
    }

    // Shop fee — calculated server-side on the post-discount service total.
    const serviceCents = Math.round(price * 100);
    const shopFeeCents = Math.round(serviceCents * SHOP_FEE_RATE);
    const shopFee = shopFeeCents / 100;
    const totalCharged = (serviceCents + shopFeeCents) / 100;

    // Facials, vajacials, and bacials involve actives/extractions close to the
    // skin's barrier — send the client the facial intake form for these.
    const needsFacialForm = resolved.some((s) => /^(facial|vaj|bacial)-/.test(s.id));
    // Women's/men's waxing services get the waxing intake form. Note: a
    // booking can trigger both forms if it mixes waxing with a facial-type
    // service in the same appointment.
    const needsWaxingForm = resolved.some((s) => /^(w|m)-/.test(s.id));
    // Standalone massage services get the massage intake form (contraindication
    // screening — pregnancy, DVT/blood clots, recent surgery, etc.). Uses the
    // `mas-` prefix specifically to avoid colliding with the `m-` prefix used
    // by men's waxing above.
    const needsMassageForm = resolved.some((s) => /^mas-/.test(s.id));

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: serviceCents,
          product_data: {
            name: `Epoch Skin — ${service}`,
            description: `${new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })} at ${time} · ${duration} min${appliedCode ? ` · Code ${appliedCode} applied` : ''}`,
          },
        },
      },
    ];

    if (shopFeeCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: shopFeeCents,
          product_data: {
            name: `Shop fee (${Math.round(SHOP_FEE_RATE * 100)}%)`,
          },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${SITE}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE}/book?cancelled=1`,
      metadata: {
        type: 'booking',
        name,
        email,
        phone:    phone    ?? '',
        notes:    notes    ?? '',
        service,
        category: category ?? '',
        price:    String(price),
        subtotal: String(rawPrice),
        discountAmount: String(Math.round((rawPrice - price) * 100) / 100),
        serviceIds: resolved.map((s) => s.id).join(','),
        shopFee:  String(shopFee),
        totalCharged: String(totalCharged),
        date,
        time,
        duration: String(duration ?? 60),
        needsFacialForm: needsFacialForm ? '1' : '',
        needsWaxingForm: needsWaxingForm ? '1' : '',
        needsMassageForm: needsMassageForm ? '1' : '',
        discountCode: appliedCode ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[booking-checkout]', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
