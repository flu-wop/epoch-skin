// app/api/stripe/webhook/route.ts
// On checkout.session.completed: save booking to Turso + send confirmation emails.
// Set webhook endpoint in Stripe Dashboard → Developers → Webhooks:
//   https://epoch-skin.com/api/stripe/webhook
// Events to listen for: checkout.session.completed

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@libsql/client';
import { getResend } from '@/lib/email';

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!);
const SITE    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';
const TO_KAYLA = process.env.RESEND_TO_EMAIL    ?? 'kayla@epoch-skin.com';
const FROM    = process.env.RESEND_FROM_EMAIL   ?? 'hello@epoch-skin.com';

function getTurso() {
  return createClient({
    url:       process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

async function initDB(db: ReturnType<typeof getTurso>) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      service    TEXT NOT NULL,
      category   TEXT,
      price      REAL,
      date       TEXT NOT NULL,
      time       TEXT NOT NULL,
      duration   INTEGER,
      notes      TEXT,
      stripe_session_id TEXT,
      paid       INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_session ON bookings(stripe_session_id)
  `);
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function generateICS(b: {
  name: string; email: string; service: string;
  date: string; time: string; duration: number;
}): string {
  const [year, month, day] = b.date.split('-').map(Number);
  const [timePart, mer]    = b.time.split(' ');
  const [hStr, mStr]       = timePart.split(':');
  let h = parseInt(hStr); const m = parseInt(mStr || '0');
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  const dtStart   = `${year}${pad(month)}${pad(day)}T${pad(h)}${pad(m)}00`;
  const endTotal  = h * 60 + m + b.duration;
  const dtEnd     = `${year}${pad(month)}${pad(day)}T${pad(Math.floor(endTotal/60)%24)}${pad(endTotal%60)}00`;
  const uid       = `epoch-${Date.now()}@epoch-skin.com`;
  const now       = new Date().toISOString().replace(/[\-:.]/g,'').slice(0,15)+'Z';
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Epoch Skin//Booking//EN',
    'CALSCALE:GREGORIAN','METHOD:REQUEST','BEGIN:VEVENT',
    `UID:${uid}`,`DTSTAMP:${now}`,`DTSTART:${dtStart}`,`DTEND:${dtEnd}`,
    `SUMMARY:Epoch Skin – ${b.service}`,
    `DESCRIPTION:Appointment at Epoch Skin\\nService: ${b.service}\\nDate: ${b.date} at ${b.time}\\n\\nQuestions? (504) 777-4094`,
    `LOCATION:Epoch Skin Studio\\, New Orleans\\, LA`,
    `ORGANIZER;CN=Epoch Skin:mailto:kayla@epoch-skin.com`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;CN=${b.name}:mailto:${b.email}`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR',
  ].join('\r\n');
}

function emailHTML(b: {
  name: string; email: string; phone: string; service: string;
  date: string; time: string; duration: number; price: number; notes: string;
}, isClient: boolean): string {
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
    <h2 style="font-size:22px;margin-bottom:8px;color:#1C1C1A;">${isClient ? `Hi ${b.name},` : `New Paid Booking: ${b.name}`}</h2>
    <p style="font-size:14px;">${isClient
      ? 'Your appointment at Epoch Skin is confirmed and payment received. We can\'t wait to see you!'
      : 'A new appointment has been booked and paid.'}</p>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      ${[
        ['Service',  b.service],
        ['Date',     dateStr],
        ['Time',     b.time],
        ['Duration', `${b.duration} min`],
        ['Paid',     `$${b.price}`],
        ...(b.phone ? [['Phone', b.phone]] : []),
        ...(b.email ? [['Email', b.email]] : []),
        ...(b.notes ? [['Notes', b.notes]] : []),
      ].map(([k,v]) => `<tr>
        <td style="color:#8C8680;padding:7px 0;width:38%;vertical-align:top;">${k}</td>
        <td style="color:${k==='Paid'?'#C9A96E':'#1C1C1A'};${k==='Paid'?'font-weight:600;':''}padding:7px 0;">${v}</td>
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

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object as Stripe.Checkout.Session;
    const meta     = session.metadata ?? {};

    const booking = {
      name:      meta.name     ?? '',
      email:     meta.email    ?? session.customer_email ?? '',
      phone:     meta.phone    ?? '',
      service:   meta.service  ?? '',
      category:  meta.category ?? '',
      price:     parseFloat(meta.price ?? '0'),
      date:      meta.date     ?? '',
      time:      meta.time     ?? '',
      duration:  parseInt(meta.duration ?? '60'),
      notes:     meta.notes    ?? '',
      sessionId: session.id,
    };

    // Save to Turso — idempotent via UNIQUE(stripe_session_id)
    let isDuplicate = false;
    try {
      const db = getTurso();
      await initDB(db);
      const result = await db.execute({
        sql: `INSERT OR IGNORE INTO bookings
              (name, email, phone, service, category, price, date, time, duration, notes, stripe_session_id, paid)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        args: [
          booking.name, booking.email, booking.phone || null,
          booking.service, booking.category || null, booking.price,
          booking.date, booking.time, booking.duration,
          booking.notes || null, booking.sessionId,
        ],
      });
      isDuplicate = result.rowsAffected === 0;
    } catch (dbErr) {
      console.error('[webhook] Turso error:', dbErr);
    }

    if (isDuplicate) {
      // Stripe retry of an event we already processed — don't re-send emails.
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Send emails
    try {
      const ics    = generateICS(booking);
      const icsB64 = Buffer.from(ics).toString('base64');
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
          subject: `Paid Booking: ${booking.name} – ${booking.service} on ${booking.date} at ${booking.time}`,
          html: emailHTML(booking, false),
          attachments: [{ filename: 'appointment.ics', content: icsB64 }],
        }),
      ]);
    } catch (emailErr) {
      console.error('[webhook] Email error:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
