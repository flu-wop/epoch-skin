// lib/intake-db.ts
// Turso helpers for the on-site intake forms.
//
// - bookings.needs_*_form: whether this booking still owes a form (set by the
//   Stripe webhook after the "first booking of this type" check).
// - intake_submissions: one row per (booking, form). `answers` is kept ONLY
//   while the email to Kayla has not gone out (status 'pending' / 'failed') so
//   a Resend hiccup never loses a client's answers; once the email is sent the
//   answers are wiped and only the metadata remains.
import { createClient, type Client } from '@libsql/client';
import type { FormType } from '@/lib/intake-forms';

export function getTurso(): Client {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

export async function ensureIntakeSchema(db: Client) {
  for (const col of ['needs_facial_form', 'needs_waxing_form', 'needs_massage_form']) {
    try {
      await db.execute(`ALTER TABLE bookings ADD COLUMN ${col} INTEGER DEFAULT 0`);
    } catch {
      // Column already exists — expected after the first run.
    }
  }
  await db.execute(`
    CREATE TABLE IF NOT EXISTS intake_submissions (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT NOT NULL,
      form_type         TEXT NOT NULL,
      status            TEXT NOT NULL,
      answers           TEXT,
      submitted_at      TEXT DEFAULT (datetime('now')),
      emailed_at        TEXT,
      UNIQUE (stripe_session_id, form_type)
    )
  `);
}

export interface IntakeBooking {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  forms: Record<FormType, boolean>;
}

export async function getIntakeBooking(db: Client, sessionId: string): Promise<IntakeBooking | null> {
  const r = await db.execute({
    sql: `SELECT name, email, service, date, time,
                 needs_facial_form, needs_waxing_form, needs_massage_form
          FROM bookings WHERE stripe_session_id = ? AND paid = 1 LIMIT 1`,
    args: [sessionId],
  });
  const row = r.rows[0];
  if (!row) return null;
  return {
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    service: String(row.service ?? ''),
    date: String(row.date ?? ''),
    time: String(row.time ?? ''),
    forms: {
      facial: Number(row.needs_facial_form) === 1,
      waxing: Number(row.needs_waxing_form) === 1,
      massage: Number(row.needs_massage_form) === 1,
    },
  };
}

export async function getSubmittedForms(db: Client, sessionId: string): Promise<Set<FormType>> {
  const r = await db.execute({
    sql: `SELECT form_type FROM intake_submissions WHERE stripe_session_id = ? AND status = 'sent'`,
    args: [sessionId],
  });
  return new Set(r.rows.map((row) => String(row.form_type) as FormType));
}

/** Saves (or re-saves after a failed send) the answers as 'pending'. */
export async function savePendingSubmission(
  db: Client, sessionId: string, formType: FormType, answers: Record<string, string>,
) {
  await db.execute({
    sql: `INSERT INTO intake_submissions (stripe_session_id, form_type, status, answers)
          VALUES (?, ?, 'pending', ?)
          ON CONFLICT (stripe_session_id, form_type)
          DO UPDATE SET status = 'pending', answers = excluded.answers, submitted_at = datetime('now')
          WHERE intake_submissions.status != 'sent'`,
    args: [sessionId, formType, JSON.stringify(answers)],
  });
}

export async function markSubmissionSent(db: Client, sessionId: string, formType: FormType) {
  await db.execute({
    sql: `UPDATE intake_submissions
          SET status = 'sent', answers = NULL, emailed_at = datetime('now')
          WHERE stripe_session_id = ? AND form_type = ?`,
    args: [sessionId, formType],
  });
}

export async function markSubmissionFailed(db: Client, sessionId: string, formType: FormType) {
  await db.execute({
    sql: `UPDATE intake_submissions SET status = 'failed'
          WHERE stripe_session_id = ? AND form_type = ? AND status != 'sent'`,
    args: [sessionId, formType],
  });
}
