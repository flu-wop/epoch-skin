// app/api/contact/route.ts
// POST: saves the submission to Turso and sends notification + auto-reply emails.
// GET: admin-only listing of submissions (mirrors /api/bookings, /api/orders, /api/newsletter).

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { cookies } from 'next/headers';
import { sendContactNotification, sendContactAutoReply, sendDbWriteFailureAlert } from '@/lib/email';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

async function initDB(db: ReturnType<typeof getTurso>) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      service    TEXT,
      message    TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

export async function POST(req: NextRequest) {
  const ok = await rateLimit(`contact:${clientIp(req)}`, 5, 600); // 5 per 10 min
  if (!ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });

  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    let dbSaved = true;
    try {
      const db = getTurso();
      await initDB(db);
      await db.execute({
        sql: `INSERT INTO contact_submissions (name, email, phone, service, message)
              VALUES (?, ?, ?, ?, ?)`,
        args: [name, email, phone || null, service || null, message],
      });
    } catch (dbErr) {
      console.error('[contact] Turso error:', dbErr);
      dbSaved = false;
      // Don't block the notification emails just because the DB write failed —
      // Kayla still gets the message either way.
    }

    if (!dbSaved) {
      try {
        await sendDbWriteFailureAlert({
          kind: 'contact submission',
          sessionId: 'n/a',
          details: { Name: name, Email: email, Phone: phone, Service: service, Message: message },
        });
      } catch (alertErr) {
        console.error('[contact] Failed to send DB-failure alert:', alertErr);
      }
    }

    // Send both emails in parallel
    await Promise.all([
      sendContactNotification({ name, email, phone, service, message }),
      sendContactAutoReply({ name, email }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

// ── GET — list submissions (admin) ──────────────────────────────
export async function GET() {
  const cookieStore = await cookies();
  const authed = verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getTurso();
    await initDB(db);
    const result = await db.execute('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    return NextResponse.json({ submissions: result.rows });
  } catch (err) {
    console.error('[contact] GET error:', err);
    return NextResponse.json({ submissions: [], note: 'DB not configured' });
  }
}
