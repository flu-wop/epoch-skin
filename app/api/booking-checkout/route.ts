// app/api/booking-checkout/route.ts
// Creates a Stripe Checkout session for a booking.
// On success, Stripe redirects to /book/success?session_id=xxx
// Webhook at /api/stripe/webhook saves the booking + sends emails.

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { BOOKING_SERVICES } from '@/lib/booking-catalog';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

export async function POST(req: NextRequest) {
  const ok = await rateLimit(`booking-checkout:${clientIp(req)}`, 10, 600); // 10 per 10 min
  if (!ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });

  try {
    const body = await req.json();
    const { name, email, phone, notes, serviceIds, category, date, time } = body;

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
    const price = resolved.reduce((sum, s) => sum + s.price, 0);
    const duration = resolved.reduce((sum, s) => sum + s.duration, 0);
    // Facials, vajacials, and bacials involve actives/extractions close to the
    // skin's barrier — send the client the intake form for these.
    const needsIntakeForm = resolved.some((s) => /^(facial|vaj|bacial)-/.test(s.id));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(price * 100),
            product_data: {
              name: `Epoch Skin — ${service}`,
              description: `${new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric',
              })} at ${time} · ${duration} min`,
            },
          },
        },
      ],
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
        date,
        time,
        duration: String(duration ?? 60),
        needsIntakeForm: needsIntakeForm ? '1' : '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[booking-checkout]', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
