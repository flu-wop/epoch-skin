// app/api/bookings/route.ts
// GET: admin listing — reads bookings the webhook (app/api/stripe/webhook)
// wrote after a paid Stripe checkout, PLUS any manually-logged in-person
// bookings (Square reader, cash, etc.) added below.
// POST: admin-only manual entry, for in-person payments taken outside the
// site (Square reader/app) so the slot still blocks the calendar and shows
// up alongside online bookings. No payment is processed here — the payment
// already happened in person; this just logs it.

import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { cookies } from 'next/headers';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

async function initDB(db: ReturnType<typeof getTurso>) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      category TEXT,
      price REAL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      duration INTEGER,
      notes TEXT,
      stripe_session_id TEXT,
      paid INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  // CREATE TABLE IF NOT EXISTS is a no-op on the live table — these columns
  // were added post-launch and must be migrated explicitly. Safe to no-op
  // on every run after the first.
  for (const col of ['had_facial_service', 'had_waxing_service', 'had_massage_service']) {
    try {
      await db.execute(`ALTER TABLE bookings ADD COLUMN ${col} INTEGER DEFAULT 0`);
    } catch {}
  }
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN discount_code TEXT`);
  } catch {}
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN paid INTEGER DEFAULT 1`);
  } catch {}
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN stripe_session_id TEXT`);
  } catch {}
  // Tags how the booking was paid — 'stripe' (online, default) vs manual
  // in-person entries ('square', 'cash', 'other'). Existing rows are all
  // real Stripe bookings, so the default backfills correctly.
  try {
    await db.execute(`ALTER TABLE bookings ADD COLUMN payment_method TEXT DEFAULT 'stripe'`);
  } catch {}
}

// ── GET — list bookings (admin) ──────────────────────────────────
export async function GET() {
  const cookieStore = await cookies();
  const authed = verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getTurso();
    await initDB(db);
    const result = await db.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    return NextResponse.json({ bookings: result.rows });
  } catch (err) {
    console.error('[bookings] GET error:', err);
    return NextResponse.json({ bookings: [], note: 'DB not configured' });
  }
}

// ── POST — manual booking entry (admin only) ──────────────────────
// For in-person sales rung up on the Square reader/app. Logs the booking
// directly as paid so it blocks the calendar slot and shows in the table —
// no checkout session, no webhook, since the payment already happened.
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const authed = verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name    = String(body.name ?? '').trim();
  const email   = String(body.email ?? '').trim();
  const phone   = body.phone ? String(body.phone).trim() : null;
  const service = String(body.service ?? '').trim();
  const category = body.category ? String(body.category).trim() : null;
  const price   = body.price != null && body.price !== '' ? parseFloat(String(body.price)) : null;
  const date    = String(body.date ?? '').trim();
  const time    = String(body.time ?? '').trim();
  const duration = body.duration ? parseInt(String(body.duration)) : 60;
  const notes   = body.notes ? String(body.notes).trim() : null;
  const paymentMethod = ['square', 'cash', 'other'].includes(String(body.paymentMethod))
    ? String(body.paymentMethod)
    : 'square';

  if (!name || !service || !date || !time) {
    return NextResponse.json(
      { error: 'Name, service, date, and time are required.' },
      { status: 400 }
    );
  }
  if (price != null && (Number.isNaN(price) || price < 0)) {
    return NextResponse.json({ error: 'Price must be a valid non-negative number.' }, { status: 400 });
  }

  try {
    const db = getTurso();
    await initDB(db);
    const result = await db.execute({
      sql: `INSERT INTO bookings
            (name, email, phone, service, category, price, date, time, duration, notes, paid, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [
        name, email || '(in-person)', phone, service, category, price,
        date, time, duration, notes, paymentMethod,
      ],
    });
    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (err) {
    console.error('[bookings] POST error:', err);
    return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 });
  }
}
