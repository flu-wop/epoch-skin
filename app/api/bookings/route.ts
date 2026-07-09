// app/api/bookings/route.ts
// Admin listing only — reading bookings the webhook (app/api/stripe/webhook)
// already wrote after a paid checkout. There is no unpaid booking path on
// this site; every booking goes through Stripe Checkout first.

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
