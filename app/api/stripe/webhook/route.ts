// app/api/stripe/webhook/route.ts
// On checkout.session.completed: save booking to Turso + send confirmation emails.
// Set webhook endpoint in Stripe Dashboard → Developers → Webhooks:
//   https://epoch-skin.com/api/stripe/webhook
// Events to listen for: checkout.session.completed

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@libsql/client';
import { sendPaidBookingEmails } from '@/lib/email';

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getTurso() {
  return createClient({
    url:       process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

async function initDB(db: ReturnType<typeof getTurso>) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      service    TEXT NOT NULL,
      category   TEXT,
      price      REAL,
      date       TEXT NOT NULL,
      time       TEXT NOT NULL,
      duration   INTEGER,
      notes      TEXT,
      stripe_session_id TEXT,
      paid       INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_session ON bookings(stripe_session_id)
  `);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature');

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

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object as Stripe.Checkout.Session;
    const meta     = session.metadata ?? {};

    const booking = {
      name:      meta.name     ?? '',
      email:     meta.email    ?? session.customer_email ?? '',
      phone:     meta.phone    ?? '',
      service:   meta.service  ?? '',
      category:  meta.category ?? '',
      price:     parseFloat(meta.price ?? '0'),
      date:      meta.date     ?? '',
      time:      meta.time     ?? '',
      duration:  parseInt(meta.duration ?? '60'),
      notes:     meta.notes    ?? '',
      sessionId: session.id,
    };

    // Save to Turso — idempotent via UNIQUE(stripe_session_id)
    let isDuplicate = false;
    try {
      const db = getTurso();
      await initDB(db);
      const result = await db.execute({
        sql: `INSERT OR IGNORE INTO bookings
              (name, email, phone, service, category, price, date, time, duration, notes, stripe_session_id, paid)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        args: [
          booking.name, booking.email, booking.phone || null,
          booking.service, booking.category || null, booking.price,
          booking.date, booking.time, booking.duration,
          booking.notes || null, booking.sessionId,
        ],
      });
      isDuplicate = result.rowsAffected === 0;
    } catch (dbErr) {
      console.error('[webhook] Turso error:', dbErr);
    }

    if (isDuplicate) {
      // Stripe retry of an event we already processed — don't re-send emails.
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Send emails
    try {
      await sendPaidBookingEmails(booking);
    } catch (emailErr) {
      console.error('[webhook] Email error:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
