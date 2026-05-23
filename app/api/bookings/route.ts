// app/api/bookings/route.ts
// Saves booking to Turso, generates .ics, sends confirmation emails via Resend

import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/email';
import { createClient } from '@libsql/client';

const SITE     = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';
const TO_KAYLA = process.env.RESEND_TO_EMAIL ?? 'kayla@epochskin.com';
const FROM     = process.env.RESEND_FROM_EMAIL ?? 'hello@epochskin.com';

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
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

export interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  category: string;
  price: number;
  date: string;      // YYYY-MM-DD
  time: string;      // "2:00 PM"
  duration: number;  // minutes
  notes?: string;
}

// ── ICS generator ───────────────────────────────────────────────
function generateICS(b: BookingPayload): string {
  const [year, month, day] = b.date.split('-').map(Number);
  const [timePart, mer] = b.time.split(' ');
  const [hStr, mStr]   = timePart.split(':');
  let h = parseInt(hStr); const m = parseInt(mStr || '0');
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  const p = (n: number) => String(n).padStart(2, '0');
  const dtStart = `${year}${p(month)}${p(day)}T${p(h)}${p(m)}00`;
  const endTotal = h * 60 + m + b.duration;
  const dtEnd = `${year}${p(month)}${p(day)}T${p(Math.floor(endTotal/60)%24)}${p(endTotal%60)}00`;
  const uid = `epoch-${Date.now()}@epochskin.com`;
  const now = new Date().toISOString().replace(/[\-:.]/g,'').slice(0,15)+'Z';
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Epoch Skin//Booking//EN',
    'CALSCALE:GREGORIAN','METHOD:REQUEST','BEGIN:VEVENT',
    `UID:${uid}`,`DTSTAMP:${now}`,`DTSTART:${dtStart}`,`DTEND:${dtEnd}`,
    `SUMMARY:Epoch Skin – ${b.service}`,
    `DESCRIPTION:Appointment at Epoch Skin\\nService: ${b.service}\\nDate: ${b.date} at ${b.time}\\n\\nQuestions? (504) 777-4094`,
    `LOCATION:Epoch Skin Studio\\, New Orleans\\, LA`,
    `ORGANIZER;CN=Epoch Skin:mailto:kayla@epochskin.com`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;CN=${b.name}:mailto:${b.email}`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR',
  ].join('\r\n');
}

// ── Email HTML ───────────────────────────────────────────────────
function emailHTML(b: BookingPayload, isClient: boolean): string {
  const dateStr = new Date(b.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;">
  <div style="background:#1C1C1A;padding:28px 36px;text-align:center;">
    <p style="color:#C9A96E;font-size:22px;margin:0;letter-spacing:0.1em;">EPOCH SKIN</p>
    <p style="color:#8A8076;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Organic Skincare · New Orleans</p>
  </div>
  <div style="padding:36px;color:#2E2E2C;line-height:1.7;">
    <h2 style="font-size:22px;margin-bottom:8px;color:#1C1C1A;">${isClient ? `Hi ${b.name},` : `New Booking: ${b.name}`}</h2>
    <p style="font-size:14px;">${isClient ? 'Your appointment at Epoch Skin is confirmed. We can\'t wait to see you!' : 'A new appointment has been booked.'}</p>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      ${[
        ['Service', b.service],
        ['Date', dateStr],
        ['Time', b.time],
        ['Duration', `${b.duration} min`],
        ['Price', `$${b.price}`],
        ...(b.phone ? [['Phone', b.phone]] : []),
        ...(b.email ? [['Email', b.email]] : []),
        ...(b.notes ? [['Notes', b.notes]] : []),
      ].map(([k,v]) => `<tr>
        <td style="color:#8C8680;padding:7px 0;width:38%;vertical-align:top;">${k}</td>
        <td style="color:${k==='Price'?'#C9A96E':'#1C1C1A'};${k==='Price'?'font-weight:600;':''}padding:7px 0;">${v}</td>
      </tr>`).join('')}
    </table>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    ${isClient ? `
    <p style="font-size:13px;color:#5A5550;">The .ics calendar file is attached — open it to add to Apple or Google Calendar.</p>
    <p style="font-size:13px;color:#5A5550;">Need to reschedule? Call or text <strong>(504) 777-4094</strong> at least 24 hours in advance.</p>
    <a href="${SITE}/book" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#C9A96E;color:#1C1C1A;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Book Another Service</a>
    ` : `<a href="mailto:${b.email}" style="display:inline-block;padding:12px 28px;background:#1C1C1A;color:#C9A96E;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Reply to ${b.name}</a>`}
  </div>
  <div style="background:#F5F0E8;padding:18px 36px;text-align:center;color:#8C8680;font-size:11px;">
    <p style="margin:0;">© 2026 Epoch Skin · <a href="${SITE}" style="color:#C9A96E;">epoch-skin.com</a> · (504) 777-4094</p>
  </div>
</div></body></html>`;
}

// ── POST — create booking ────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const booking: BookingPayload = await req.json();
    if (!booking.name || !booking.email || !booking.service || !booking.date || !booking.time) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Store in Turso
    try {
      const db = getTurso();
      await initDB(db);
      await db.execute({
        sql: `INSERT INTO bookings (name, email, phone, service, category, price, date, time, duration, notes)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          booking.name,
          booking.email,
          booking.phone ?? null,
          booking.service,
          booking.category ?? null,
          booking.price ?? null,
          booking.date,
          booking.time,
          booking.duration ?? null,
          booking.notes ?? null,
        ],
      });
    } catch (dbErr) {
      console.error('[bookings] Turso error:', dbErr);
      // Don't block email sending if DB fails
    }

    // ICS
    const ics = generateICS(booking);
    const icsB64 = Buffer.from(ics).toString('base64');

    // Emails
    const resend = getResend();
    await Promise.all([
      resend.emails.send({
        from: FROM, to: booking.email, reply_to: TO_KAYLA,
        subject: `Your Epoch Skin appointment — ${booking.service}`,
        html: emailHTML(booking, true),
        attachments: [{ filename: 'epoch-skin-appointment.ics', content: icsB64 }],
      }),
      resend.emails.send({
        from: FROM, to: TO_KAYLA, reply_to: booking.email,
        subject: `New Booking: ${booking.name} – ${booking.service} on ${booking.date} at ${booking.time}`,
        html: emailHTML(booking, false),
        attachments: [{ filename: 'appointment.ics', content: icsB64 }],
      }),
    ]);

    return NextResponse.json({ success: true, icsContent: ics });
  } catch (err) {
    console.error('[bookings]', err);
    return NextResponse.json({ error: 'Booking failed. Please try again.' }, { status: 500 });
  }
}

// ── GET — list bookings (admin) ──────────────────────────────────
export async function GET() {
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
