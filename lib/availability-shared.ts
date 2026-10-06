// lib/availability-shared.ts
// Pure scheduling logic shared by the booking page (browser) and the server
// (availability API + checkout re-check). No imports and no I/O on purpose, so
// the page and the server can never disagree about what counts as "booked".
//
// Rule: every appointment blocks its own time PLUS a 60-minute gap after it,
// and a new appointment must also end at least 60 minutes before the next one
// starts. Example: a 2-hour service at 9:00 AM ends at 11:00, so the studio is
// held through 12:00 PM — 11:30 AM is blocked and 12:00 PM is the first open slot.

export const BUFFER_MINUTES = 60;

export const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM",
];

// Used when an existing booking row has no usable duration.
export const DEFAULT_DURATION = 60;

export interface BusyBlock {
  time: string;     // "10:00 AM"
  duration: number; // minutes
}

// "2:30 PM" -> 870. Also accepts "2pm" / "2:30pm". Returns null if unreadable.
export function parseTimeToMinutes(time: string): number | null {
  const m = /^\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*$/i.exec(String(time ?? ""));
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3].toLowerCase();
  if (h < 1 || h > 12 || min > 59) return null;
  if (mer === "pm" && h !== 12) h += 12;
  if (mer === "am" && h === 12) h = 0;
  return h * 60 + min;
}

// True if a new appointment starting at `slot` and lasting `duration` minutes
// would collide with any existing block (including the 60-minute gap on both
// sides). Unreadable slot times count as unavailable.
export function isSlotBlocked(slot: string, duration: number, busy: BusyBlock[]): boolean {
  const start = parseTimeToMinutes(slot);
  if (start === null) return true;
  const len = duration > 0 ? duration : DEFAULT_DURATION;
  const end = start + len;

  for (const b of busy) {
    const bStart = parseTimeToMinutes(b.time);
    if (bStart === null) continue;
    const bLen = b.duration > 0 ? b.duration : DEFAULT_DURATION;
    const bEnd = bStart + bLen;
    // Intervals are padded by the gap on the trailing side of each appointment,
    // so two appointments conflict unless one ends >= BUFFER before the other starts.
    if (start < bEnd + BUFFER_MINUTES && bStart < end + BUFFER_MINUTES) return true;
  }
  return false;
}

// Every slot that is NOT bookable for a service of `duration` minutes.
export function getBlockedSlots(duration: number, busy: BusyBlock[]): string[] {
  return TIME_SLOTS.filter((slot) => isSlotBlocked(slot, duration, busy));
}
