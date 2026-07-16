// app/api/orders/route.ts
// Admin listing only — reading orders the webhook (app/api/stripe/webhook)
// already wrote after a paid product checkout.

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
}

// ── GET — list orders (admin) ──────────────────────────────────
export async function GET() {
  const cookieStore = await cookies();
  const authed = verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getTurso();
    await initDB(db);
    const result = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
    // items is stored as a JSON string in Turso — parse it for the client.
    const orders = result.rows.map((row) => ({
      ...row,
      items: (() => {
        try { return JSON.parse(String(row.items)); } catch { return []; }
      })(),
    }));
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('[orders] GET error:', err);
    return NextResponse.json({ orders: [], note: 'DB not configured' });
  }
}
