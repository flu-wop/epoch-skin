// app/api/booking-checkout/route.ts
// Creates a Stripe Checkout session for a booking.
// On success, Stripe redirects to /book/success?session_id=xxx
// Webhook at /api/stripe/webhook saves the booking + sends emails.

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, notes, service, category, price, date, time, duration } = body;

    if (!name || !email || !service || !date || !time || !price) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

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
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[booking-checkout]', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
