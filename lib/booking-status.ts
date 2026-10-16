// lib/booking-status.ts
// Cancelled bookings stay in the table (so records are never lost) but must
// stop blocking the calendar and stop counting toward revenue. Status is
// 'confirmed' (default) or 'cancelled'.
//
// CREATE TABLE IF NOT EXISTS is a no-op on the live table, so the column is
// added with its own ALTER TABLE (see practices: additive migrations). Every
// query that filters on `status` must call ensureBookingStatus() first, or it
// fails with "no such column" on a database that hasn't been migrated yet.

import type { Client } from '@libsql/client';

export type BookingStatus = 'confirmed' | 'cancelled';

// SQL fragment: rows that still count (NULL = legacy rows = confirmed).
export const ACTIVE_BOOKING_SQL = "(status IS NULL OR status != 'cancelled')";

let ensured: Promise<void> | null = null;

export function ensureBookingStatus(db: Client): Promise<void> {
  if (!ensured) {
    ensured = (async () => {
      try {
        await db.execute(`ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'confirmed'`);
      } catch (err) {
        // Column already exists = fine. A missing table = nothing to migrate
        // yet (the bookings route creates it, then calls this again).
        if (/no such table/i.test(String(err))) { ensured = null; }
      }
    })();
  }
  return ensured;
}
