// lib/insights-db.ts
// Server-side only. Tables behind /admin/insights:
//   site_events   — first-party, cookieless browsing events (see /api/track)
//   content_plans — Kayla's weekly content plan, one row per week (Monday date)
// Both are NEW tables, so CREATE TABLE IF NOT EXISTS is correct here. If a
// column is ever added later, it needs its own ALTER TABLE migration (see
// the bookings table in app/api/bookings/route.ts for the pattern).

import { createClient, type Client } from '@libsql/client';

export function getTurso(): Client {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

let ready: Promise<void> | null = null;

export function ensureInsightsTables(db: Client): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS site_events (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          ts         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
          sid        TEXT NOT NULL,
          type       TEXT NOT NULL,
          path       TEXT,
          item       TEXT,
          value      REAL,
          ref        TEXT,
          device     TEXT
        )
      `);
      await db.execute('CREATE INDEX IF NOT EXISTS idx_site_events_ts ON site_events (ts)');
      await db.execute('CREATE INDEX IF NOT EXISTS idx_site_events_sid ON site_events (sid)');
      await db.execute(`
        CREATE TABLE IF NOT EXISTS content_plans (
          week_start TEXT PRIMARY KEY,
          plan       TEXT NOT NULL,
          updated_at TEXT DEFAULT (datetime('now'))
        )
      `);
    })().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}

// Bookings and orders tables are created by their own routes; make sure they
// exist so a fresh database doesn't 500 the insights page.
export async function ensureCoreTables(db: Client): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, items TEXT NOT NULL,
      subtotal_cents INTEGER NOT NULL, discount_code TEXT, tax_cents INTEGER NOT NULL,
      total_cents INTEGER NOT NULL, stripe_session_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL,
      phone TEXT, service TEXT NOT NULL, category TEXT, price REAL, date TEXT NOT NULL,
      time TEXT NOT NULL, duration INTEGER, notes TEXT, stripe_session_id TEXT,
      paid INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}
