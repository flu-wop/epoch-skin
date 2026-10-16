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
import { ensureBookingStatus } from '@/lib/booking-status';
import { checkSlotAvailable } from '@/lib/availability';
import { TIME_SLOTS } from '@/lib/availability-shared';

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
  // 'confirmed' | 'cancelled' — cancelled rows are kept but free the slot.
  await ensureBookingStatus(db);
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

// ── PATCH — edit, cancel or restore a booking (admin only) ─────────
// body: { id, ...fields }            edit details
//       { id, status: 'cancelled' }  cancel (row is kept, slot is freed)
//       { id, status: 'confirmed' }  restore (re-checks the slot)
// Stripe-paid bookings keep their price and payment method locked — the
// money already moved through Stripe. Time/duration changes re-check the
// calendar and return 409 SLOT_TAKEN unless `force: true` (admin override).
export async function PATCH(req: Request) {
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

  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'A valid booking id is required.' }, { status: 400 });
  }

  try {
    const db = getTurso();
    await initDB(db);
    const found = await db.execute({ sql: 'SELECT * FROM bookings WHERE id = ?', args: [id] });
    const cur = found.rows[0];
    if (!cur) return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });

    const isStripe = !cur.payment_method || String(cur.payment_method) === 'stripe';
    const curStatus = String(cur.status ?? 'confirmed') === 'cancelled' ? 'cancelled' : 'confirmed';

    const sets: string[] = [];
    const args: (string | number | null)[] = [];
    const set = (col: string, val: string | number | null) => { sets.push(`${col} = ?`); args.push(val); };

    // Merged view of the booking after this edit — used for the slot check.
    let date = String(cur.date ?? '');
    let time = String(cur.time ?? '');
    let duration = Number(cur.duration) > 0 ? Number(cur.duration) : 60;
    let status: 'confirmed' | 'cancelled' = curStatus;

    if (body.name !== undefined) {
      const v = String(body.name).trim();
      if (!v) return NextResponse.json({ error: 'Name can\u2019t be empty.' }, { status: 400 });
      set('name', v);
    }
    if (body.email !== undefined) set('email', String(body.email).trim() || '(in-person)');
    if (body.phone !== undefined) set('phone', String(body.phone).trim() || null);
    if (body.service !== undefined) {
      const v = String(body.service).trim();
      if (!v) return NextResponse.json({ error: 'Service can\u2019t be empty.' }, { status: 400 });
      set('service', v);
    }
    if (body.category !== undefined) set('category', String(body.category).trim() || null);
    if (body.notes !== undefined) set('notes', String(body.notes).trim() || null);
    if (body.date !== undefined) {
      const v = String(body.date).trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return NextResponse.json({ error: 'Date must be YYYY-MM-DD.' }, { status: 400 });
      date = v; set('date', v);
    }
    if (body.time !== undefined) {
      const v = String(body.time).trim();
      if (!TIME_SLOTS.includes(v)) return NextResponse.json({ error: 'Pick a time from the list.' }, { status: 400 });
      time = v; set('time', v);
    }
    if (body.duration !== undefined) {
      const v = parseInt(String(body.duration), 10);
      if (!Number.isFinite(v) || v <= 0) return NextResponse.json({ error: 'Duration must be a positive number of minutes.' }, { status: 400 });
      duration = v; set('duration', v);
    }
    // Money fields are only editable on manual (in-person) bookings.
    if (!isStripe) {
      if (body.price !== undefined) {
        const v = body.price === '' || body.price === null ? null : parseFloat(String(body.price));
        if (v !== null && (Number.isNaN(v) || v < 0)) return NextResponse.json({ error: 'Price must be a valid non-negative number.' }, { status: 400 });
        set('price', v);
      }
      if (body.paymentMethod !== undefined) {
        const v = String(body.paymentMethod);
        if (!['square', 'cash', 'other'].includes(v)) return NextResponse.json({ error: 'Invalid payment method.' }, { status: 400 });
        set('payment_method', v);
      }
    }
    if (body.status !== undefined) {
      if (body.status !== 'confirmed' && body.status !== 'cancelled') {
        return NextResponse.json({ error: 'Status must be confirmed or cancelled.' }, { status: 400 });
      }
      status = body.status;
      set('status', status);
    }

    if (!sets.length) return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });

    // Re-check the calendar whenever a live booking moves, grows, or is restored.
    const slotChanged = body.date !== undefined || body.time !== undefined || body.duration !== undefined;
    const restoring = curStatus === 'cancelled' && status === 'confirmed';
    if (status === 'confirmed' && (slotChanged || restoring) && body.force !== true) {
      const check = await checkSlotAvailable(date, time, duration, id);
      if (!check.ok) {
        return NextResponse.json(
          {
            error: check.reason === 'SLOT_TAKEN'
              ? 'That time overlaps another booking (including the 60-minute gap).'
              : 'That time isn\u2019t a valid slot.',
            code: check.reason,
          },
          { status: 409 }
        );
      }
    }

    args.push(id);
    await db.execute({ sql: `UPDATE bookings SET ${sets.join(', ')} WHERE id = ?`, args });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[bookings] PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 });
  }
}
