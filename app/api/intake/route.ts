// app/api/intake/route.ts
// On-site intake forms.
//   GET  ?session_id=cs_...   → which forms this booking still needs
//   POST {session_id, form_type, answers} → validate, render PDF, email Kayla
//
// The Stripe Checkout session id (unguessable, only ever in the client's own
// success URL / confirmation email) is the credential. Only paid bookings
// that actually owe the form are accepted.
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import {
  FORMS, FORM_LABELS, FORM_TYPES, isFormType, validateAnswers,
} from '@/lib/intake-forms';
import {
  ensureIntakeSchema, getTurso, getIntakeBooking, getSubmittedForms,
  savePendingSubmission, markSubmissionSent, markSubmissionFailed,
} from '@/lib/intake-db';
import { buildIntakePdf } from '@/lib/intake-pdf';
import { sendIntakeSubmissionEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{8,200}$/;
const MAX_BODY = 100_000;

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id') ?? '';
  if (!SESSION_RE.test(sessionId)) {
    return NextResponse.json({ error: 'Invalid session.' }, { status: 400 });
  }
  try {
    if (!(await rateLimit(`intake-get:${clientIp(req)}`, 60, 600))) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }
    const db = getTurso();
    await ensureIntakeSchema(db);
    const booking = await getIntakeBooking(db, sessionId);
    if (!booking) {
      // The Stripe webhook may not have written the booking yet.
      return NextResponse.json({ ready: false });
    }
    const done = await getSubmittedForms(db, sessionId);
    return NextResponse.json({
      ready: true,
      name: booking.name,
      email: booking.email,
      forms: FORM_TYPES.filter((t) => booking.forms[t]).map((t) => ({
        type: t,
        label: FORM_LABELS[t],
        submitted: done.has(t),
      })),
    });
  } catch (err) {
    console.error('[intake] GET failed:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: { session_id?: unknown; form_type?: unknown; answers?: unknown };
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: 'Form too large.' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const sessionId = typeof body.session_id === 'string' ? body.session_id : '';
  const formType = body.form_type;
  if (!SESSION_RE.test(sessionId) || !isFormType(formType)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  try {
    if (!(await rateLimit(`intake-post:${clientIp(req)}:${sessionId.slice(-12)}`, 12, 3600))) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const db = getTurso();
    await ensureIntakeSchema(db);
    const booking = await getIntakeBooking(db, sessionId);
    if (!booking || !booking.forms[formType]) {
      return NextResponse.json({ error: 'No intake form is needed for this booking.' }, { status: 404 });
    }
    const done = await getSubmittedForms(db, sessionId);
    if (done.has(formType)) {
      return NextResponse.json({ ok: true, alreadySubmitted: true });
    }

    const def = FORMS[formType];
    const { clean, errors } = validateAnswers(def, body.answers);
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Please complete the required fields.', fields: errors }, { status: 422 });
    }

    // Keep the answers until the email to Kayla has actually gone out.
    await savePendingSubmission(db, sessionId, formType, clean);

    const submittedAt = new Date();
    const appointment = `${booking.date} at ${booking.time}`;
    try {
      const pdf = await buildIntakePdf(def, clean, {
        clientName: clean.fullName || booking.name,
        service: booking.service,
        appointment,
        submittedAt,
      });
      await sendIntakeSubmissionEmail({
        clientName: clean.fullName || booking.name,
        clientEmail: clean.email || booking.email,
        formLabel: FORM_LABELS[formType],
        service: booking.service,
        appointment,
        pdf,
      });
    } catch (sendErr) {
      console.error('[intake] Render/send failed:', sendErr);
      await markSubmissionFailed(db, sessionId, formType);
      return NextResponse.json(
        { error: "We couldn't send your form just now. Please try again in a moment, or email kayla@epoch-skin.com." },
        { status: 502 },
      );
    }

    await markSubmissionSent(db, sessionId, formType);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[intake] POST failed:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
