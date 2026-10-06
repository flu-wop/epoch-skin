// lib/availability.ts
// Server-only: reads which appointments already exist for a given day.
// Counts every row in `bookings` — online (Stripe) bookings AND in-person
// bookings logged from /admin/bookings — so both block the calendar.
// The overlap math itself lives in lib/availability-shared.ts.

import { createClient } from '@libsql/client';
import {
  BusyBlock,
  DEFAULT_DURATION,
  TIME_SLOTS,
  isSlotBlocked,
  parseTimeToMinutes,
} from '@/lib/availability-shared';

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

// YYYY-MM-DD that is also a real calendar date (rejects 2026-02-31 etc.).
export function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [y, m, d] = date.split('-').map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d));
  return probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d;
}

// Existing appointments for one day, as time + duration only (no client info).
export async function getBusyBlocks(date: string): Promise<BusyBlock[]> {
  const db = getTurso();
  try {
    const result = await db.execute({
      sql: 'SELECT time, duration FROM bookings WHERE date = ?',
      args: [date],
    });
    const blocks: BusyBlock[] = [];
    for (const row of result.rows) {
      const time = String(row.time ?? '');
      const duration = Number(row.duration);
      if (parseTimeToMinutes(time) === null) {
        // A row we can't read can't block anything — surface it so it gets fixed.
        console.warn('[availability] Unreadable booking time ignored:', time, 'on', date);
        continue;
      }
      blocks.push({ time, duration: Number.isFinite(duration) && duration > 0 ? duration : DEFAULT_DURATION });
    }
    return blocks;
  } catch (err) {
    // Fresh database where the bookings table doesn't exist yet = nothing booked.
    if (/no such table/i.test(String(err))) return [];
    throw err;
  }
}

export type SlotCheck =
  | { ok: true }
  | { ok: false; reason: 'INVALID_TIME' | 'SLOT_TAKEN' };

// Authoritative check used by checkout: is this exact time bookable right now
// for a service of this length?
export async function checkSlotAvailable(date: string, time: string, duration: number): Promise<SlotCheck> {
  if (!TIME_SLOTS.includes(time)) return { ok: false, reason: 'INVALID_TIME' };
  const busy = await getBusyBlocks(date);
  if (isSlotBlocked(time, duration, busy)) return { ok: false, reason: 'SLOT_TAKEN' };
  return { ok: true };
}
