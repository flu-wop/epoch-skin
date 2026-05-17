// app/api/stripe/webhook/route.ts
// Handles Stripe webhook events post-checkout
// Set webhook endpoint in Stripe dashboard → Developers → Webhooks
// Endpoint: https://epoch-skin.com/api/stripe/webhook

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-10',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  // ─── Handle events ─────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Log for now — in production, fulfill order, update DB, etc.
    console.log('[webhook] Payment completed:', {
      sessionId: session.id,
      customer: session.customer_email,
      amount: session.amount_total,
    });

    // Track repeat customers: store email in KV with purchase count
    if (session.customer_email) {
      try {
        const { kv } = await import('@vercel/kv');
        const key = `customer:${session.customer_email.toLowerCase()}`;
        const existing = (await kv.get<{ email: string; purchases: number }>(key)) ?? { email: session.customer_email, purchases: 0 };
        await kv.set(key, { ...existing, purchases: existing.purchases + 1, lastPurchase: new Date().toISOString() });
      } catch {
        console.warn('[webhook] KV not available for customer tracking');
      }
    }
  }

  return NextResponse.json({ received: true });
}
