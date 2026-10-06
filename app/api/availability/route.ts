// app/api/availability/route.ts
// Public, read-only. Returns the already-booked time blocks for one day so the
// booking page can grey out unavailable times. Only times and durations are
// returned — never names, emails, phone numbers, or anything about the client.
//
// GET /api/availability?date=YYYY-MM-DD
// -> { date, busy: [{ time: "9:00 AM", duration: 120 }, ...] }

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { getBusyBlocks, isValidDateString } from '@/lib/availability';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ok = await rateLimit(`availability:${clientIp(req)}`, 60, 60); // 60 per minute
  if (!ok) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  const date = req.nextUrl.searchParams.get('date') ?? '';
  if (!isValidDateString(date)) {
    return NextResponse.json({ error: 'A valid date (YYYY-MM-DD) is required.' }, { status: 400 });
  }

  try {
    const busy = await getBusyBlocks(date);
    return NextResponse.json({ date, busy }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('[availability] GET error:', err);
    return NextResponse.json({ error: 'Could not load availability.' }, { status: 500 });
  }
}
