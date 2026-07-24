// app/api/stripe/webhook/route.ts
// On checkout.session.completed: save booking to Turso + send confirmation emails.
// Set webhook endpoint in Stripe Dashboard → Developers → Webhooks:
//   https://epoch-skin.com/api/stripe/webhook
// Events to listen for: checkout.session.completed

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@libsql/client';
import { sendPaidBookingEmails, sendPaidOrderEmails, sendDbWriteFailureAlert } from '@/lib/email';

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

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
  // Migrations for `bookings` — ALTER TABLE ADD COLUMN errors if the column
  // already exists on this libSQL version — that's expected on every run
  // after the first and safely ignored. These MUST run before any
  // CREATE INDEX on these columns, since CREATE TABLE IF NOT EXISTS is a
  // no-op on a table that predates a given column, and an index on a
  // nonexistent column throws SQL_INPUT_ERROR ("no such column").
  // had_facial_service / had_waxing_service track whether a booking included
  // a facial-type or waxing service, so we can tell whether a new booking is
  // a client's FIRST of that type (and therefore needs the intake form) or a
  // repeat (already on file).
  for (const col of ['had_facial_service', 'had_waxing_service']) {
    try {
      await db.execute(`ALTER TABLE bookings ADD COLUMN ${col} INTEGER DEFAULT 0`);
    } catch {
      // Column already exists — fine.
    }
  }
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN discount_code TEXT`);
  } catch {
    // Column already exists — fine.
  }
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN stripe_session_id TEXT`);
  } catch {
    // Column already exists — fine.
  }
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_session ON bookings(stripe_session_id)
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id                 INTEGER PRIMARY KEY AUTOINCREMENT,
      email              TEXT NOT NULL,
      items              TEXT NOT NULL,
      subtotal_cents     INTEGER NOT NULL,
      discount_code      TEXT,
      tax_cents          INTEGER NOT NULL,
      total_cents        INTEGER NOT NULL,
      stripe_session_id  TEXT,
      created_at         TEXT DEFAULT (datetime('now'))
    )
  `);
  try {
    await db.execute(`ALTER TABLE orders ADD COLUMN stripe_session_id TEXT`);
  } catch {
    // Column already exists — fine.
  }
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_order_session ON orders(stripe_session_id)
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

    if (meta.type === 'product') {
      await handleProductOrder(session);
    } else {
      // Default to booking for backward compatibility with any in-flight
      // sessions created before the `type` field existed.
      await handleBooking(session, meta);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleBooking(session: Stripe.Checkout.Session, meta: Record<string, string>) {
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
      needsFacialForm: meta.needsFacialForm === '1',
      needsWaxingForm: meta.needsWaxingForm === '1',
      discountCode: meta.discountCode || null,
    };

    // Save to Turso — idempotent via UNIQUE(stripe_session_id)
    let isDuplicate = false;
    let dbSaved = true;
    try {
      const db = getTurso();
      await initDB(db);

      // Intake forms only need to go out once per client per treatment type —
      // check booking history by email before deciding whether to attach.
      // Default to "send it" if the lookup itself fails; a duplicate form is
      // a minor annoyance, a missing one is a liability gap.
      if (booking.needsFacialForm) {
        try {
          const prior = await db.execute({
            sql: `SELECT 1 FROM bookings WHERE email = ? AND had_facial_service = 1 AND stripe_session_id != ? LIMIT 1`,
            args: [booking.email, booking.sessionId],
          });
          booking.needsFacialForm = prior.rows.length === 0;
        } catch (lookupErr) {
          console.error('[webhook] Facial-history lookup failed, defaulting to send:', lookupErr);
        }
      }
      if (booking.needsWaxingForm) {
        try {
          const prior = await db.execute({
            sql: `SELECT 1 FROM bookings WHERE email = ? AND had_waxing_service = 1 AND stripe_session_id != ? LIMIT 1`,
            args: [booking.email, booking.sessionId],
          });
          booking.needsWaxingForm = prior.rows.length === 0;
        } catch (lookupErr) {
          console.error('[webhook] Waxing-history lookup failed, defaulting to send:', lookupErr);
        }
      }

      const result = await db.execute({
        sql: `INSERT OR IGNORE INTO bookings
              (name, email, phone, service, category, price, date, time, duration, notes, stripe_session_id, paid, had_facial_service, had_waxing_service, discount_code)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
        args: [
          booking.name, booking.email, booking.phone || null,
          booking.service, booking.category || null, booking.price,
          booking.date, booking.time, booking.duration,
          booking.notes || null, booking.sessionId,
          meta.needsFacialForm === '1' ? 1 : 0,
          meta.needsWaxingForm === '1' ? 1 : 0,
          booking.discountCode,
        ],
      });
      isDuplicate = result.rowsAffected === 0;
    } catch (dbErr) {
      console.error('[webhook] Turso error:', dbErr);
      dbSaved = false;
    }

    if (!dbSaved) {
      // Payment succeeded but the record didn't save — get a human's eyes on
      // it immediately instead of letting it disappear into Vercel logs.
      try {
        await sendDbWriteFailureAlert({
          kind: 'booking',
          sessionId: booking.sessionId,
          details: {
            Name: booking.name, Email: booking.email, Phone: booking.phone,
            Service: booking.service, Date: booking.date, Time: booking.time,
            Duration: booking.duration, Price: booking.price, Notes: booking.notes,
          },
        });
      } catch (alertErr) {
        console.error('[webhook] Failed to send DB-failure alert (booking):', alertErr);
      }
    }

    if (isDuplicate) {
      // Stripe retry of an event we already processed — don't re-send emails.
      return;
    }

    // Send emails
    try {
      await sendPaidBookingEmails(booking);
    } catch (emailErr) {
      console.error('[webhook] Booking email error:', emailErr);
    }
}

async function handleProductOrder(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? session.customer_email ?? '';
  const discountCode = session.metadata?.discountCode || null;

  // Line items live on Stripe itself — no size limits, no need to round-trip
  // cart contents through metadata (which is capped at 500 chars/value).
  // Tax is added as a plain line item in /api/checkout (not Stripe's native
  // tax feature), so pull it back out by name rather than trusting total_details.
  let items: { name: string; quantity: number; amountCents: number }[] = [];
  let taxCents = 0;
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    for (const li of lineItems.data) {
      const name = li.description ?? 'Item';
      const amountCents = li.amount_total ?? 0;
      if (name.startsWith('Sales Tax')) {
        taxCents = amountCents;
      } else {
        items.push({ name, quantity: li.quantity ?? 1, amountCents });
      }
    }
  } catch (err) {
    console.error('[webhook] Failed to fetch line items:', err);
  }

  const totalCents = session.amount_total ?? 0;
  const subtotalCents = totalCents - taxCents;

  let isDuplicate = false;
  let dbSaved = true;
  try {
    const db = getTurso();
    await initDB(db);
    const result = await db.execute({
      sql: `INSERT OR IGNORE INTO orders
            (email, items, subtotal_cents, discount_code, tax_cents, total_cents, stripe_session_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        email, JSON.stringify(items), subtotalCents, discountCode, taxCents, totalCents, session.id,
      ],
    });
    isDuplicate = result.rowsAffected === 0;
  } catch (dbErr) {
    console.error('[webhook] Turso error (order):', dbErr);
    dbSaved = false;
  }

  if (!dbSaved) {
    try {
      await sendDbWriteFailureAlert({
        kind: 'order',
        sessionId: session.id,
        details: {
          Email: email,
          Items: items.map((i) => `${i.name} × ${i.quantity}`).join(', '),
          Subtotal: `$${(subtotalCents / 100).toFixed(2)}`,
          Discount: discountCode,
          Tax: `$${(taxCents / 100).toFixed(2)}`,
          Total: `$${(totalCents / 100).toFixed(2)}`,
        },
      });
    } catch (alertErr) {
      console.error('[webhook] Failed to send DB-failure alert (order):', alertErr);
    }
  }

  if (isDuplicate) return;

  try {
    await sendPaidOrderEmails({
      email, items, subtotalCents, discountCode, taxCents, totalCents, sessionId: session.id,
    });
  } catch (emailErr) {
    console.error('[webhook] Order email error:', emailErr);
  }
}
