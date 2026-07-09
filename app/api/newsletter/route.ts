// app/api/newsletter/route.ts
// Saves subscribers to Turso and sends a welcome email with a discount code.
// Storing raw emails here (rather than an ESP) keeps this migration-friendly —
// export the table or add a Mailchimp/Klaviyo call alongside the insert later.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { sendNewsletterWelcome, sendNewsletterNotification } from '@/lib/email';

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

async function initDB(db: ReturnType<typeof getTurso>) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      source TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email)
  `);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ok = await rateLimit(`newsletter:${clientIp(req)}`, 5, 600); // 5 per 10 min
  if (!ok) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 200);
    const source = typeof body?.source === 'string' ? body.source.slice(0, 50) : 'website';

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    let isNew = true;
    try {
      const db = getTurso();
      await initDB(db);
      const result = await db.execute({
        sql: `INSERT OR IGNORE INTO newsletter_subscribers (email, source) VALUES (?, ?)`,
        args: [email, source],
      });
      isNew = result.rowsAffected > 0;
    } catch (dbErr) {
      console.error('[newsletter] Turso error:', dbErr);
      // Don't block the welcome email just because the DB write failed
    }

    // Only send the welcome email (with discount code) to genuinely new subscribers,
    // so re-submitting an already-subscribed email doesn't hand out repeat codes.
    if (isNew) {
      try {
        await sendNewsletterWelcome({ email });
        await sendNewsletterNotification({ email });
      } catch (emailErr) {
        console.error('[newsletter] Email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[newsletter]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
