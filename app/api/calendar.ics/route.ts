// app/api/calendar.ics/route.ts
// Serves all bookings as a subscribable iCal feed.
// Subscribe in iCal: File → New Calendar Subscription → https://epoch-skin.com/api/calendar.ics

import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toICSDate(date: string, time: string): string {
  // date: YYYY-MM-DD, time: "10:00 AM"
  const [year, month, day] = date.split('-').map(Number);
  const [timePart, mer] = time.split(' ');
  const [hStr, mStr] = timePart.split(':');
  let h = parseInt(hStr);
  const m = parseInt(mStr || '0');
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  return `${year}${pad(month)}${pad(day)}T${pad(h)}${pad(m)}00`;
}

function addMinutes(dtStart: string, duration: number): string {
  const year  = parseInt(dtStart.slice(0, 4));
  const month = parseInt(dtStart.slice(4, 6)) - 1;
  const day   = parseInt(dtStart.slice(6, 8));
  const h     = parseInt(dtStart.slice(9, 11));
  const m     = parseInt(dtStart.slice(11, 13));
  const d = new Date(year, month, day, h, m + duration);
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

function escapeICS(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export async function GET() {
  try {
    const db = getTurso();

    // Ensure table exists (graceful if empty)
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
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    const result = await db.execute('SELECT * FROM bookings ORDER BY date ASC, time ASC');
    const bookings = result.rows;

    const now = new Date().toISOString().replace(/[\-:.]/g, '').slice(0, 15) + 'Z';

    const events = bookings.map((b) => {
      const date     = String(b.date ?? '');
      const time     = String(b.time ?? '9:00 AM');
      const duration = Number(b.duration ?? 60);
      const service  = String(b.service ?? 'Appointment');
      const name     = String(b.name ?? '');
      const email    = String(b.email ?? '');
      const phone    = b.phone ? String(b.phone) : null;
      const price    = b.price != null ? `$${b.price}` : null;
      const notes    = b.notes ? String(b.notes) : null;

      const dtStart = toICSDate(date, time);
      const dtEnd   = addMinutes(dtStart, duration);
      const uid     = `epoch-booking-${b.id}@epoch-skin.com`;

      const descParts = [
        `Client: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        price ? `Price: ${price}` : null,
        notes ? `Notes: ${notes}` : null,
      ].filter(Boolean).join('\\n');

      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${escapeICS(service)} — ${escapeICS(name)}`,
        `DESCRIPTION:${descParts}`,
        `LOCATION:Epoch Skin Studio\\, New Orleans\\, LA`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
      ].join('\r\n');
    });

    const cal = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Epoch Skin//Bookings//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Epoch Skin Bookings',
      'X-WR-TIMEZONE:America/Chicago',
      'X-WR-CALDESC:All Epoch Skin appointment bookings',
      ...events,
      'END:VCALENDAR',
    ].join('\r\n');

    return new NextResponse(cal, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'inline; filename="epoch-skin-bookings.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('[calendar.ics]', err);
    return new NextResponse('Error generating calendar', { status: 500 });
  }
}
