// app/api/stripe/webhook-check/route.ts
// Self-check for /admin/sync: confirms the Stripe webhook endpoint is
// configured correctly, and cross-checks recent *completed* Stripe Checkout
// sessions against Turso to catch cases where a payment went through but
// the webhook never fired (or fired and failed) — the exact failure mode
// that would otherwise only surface when a client complains they paid but
// never got a confirmation.

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@libsql/client';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { timingSafeEqual } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });
const SITE   = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';
const EXPECTED_WEBHOOK_URL = `${SITE}/api/stripe/webhook`;

function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

function getTurso() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

export async function POST(req: Request) {
  const ok = await rateLimit(`webhook-check:${clientIp(req)}`, 5, 900); // 5 per 15 min
  if (!ok) return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });

  const configuredSecret = process.env.SYNC_SECRET;
  if (!configuredSecret) {
    return NextResponse.json({ error: 'Not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const providedSecret = String(body?.secret ?? '');
    if (!safeEq(providedSecret, configuredSecret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1) Confirm the webhook endpoint itself is registered, enabled, and
    // listening for the one event this whole flow depends on.
    const endpoints = await stripe.webhookEndpoints.list({ limit: 20 });
    const match = endpoints.data.find((e) => e.url === EXPECTED_WEBHOOK_URL);
    const endpointCheck = match
      ? {
          found: true,
          status: match.status, // 'enabled' | 'disabled'
          hasCheckoutEvent: match.enabled_events.includes('checkout.session.completed') || match.enabled_events.includes('*'),
          apiVersion: match.api_version,
        }
      : { found: false, status: null, hasCheckoutEvent: false, apiVersion: null };

    // 2) Cross-check recent completed Stripe sessions against Turso — the
    // real proof the pipeline works end to end, not just that config looks right.
    const sessions = await stripe.checkout.sessions.list({ limit: 15 });
    const completed = sessions.data.filter((s) => s.status === 'complete' && s.payment_status === 'paid');

    let sessionChecks: {
      id: string; amount: number | null; email: string | null;
      created: string; type: string; matched: boolean;
    }[] = [];
    let dbReachable = true;

    if (completed.length > 0) {
      try {
        const db = getTurso();
        const ids = completed.map((s) => s.id);
        const placeholders = ids.map(() => '?').join(',');
        const [bookingRows, orderRows] = await Promise.all([
          db.execute({ sql: `SELECT stripe_session_id FROM bookings WHERE stripe_session_id IN (${placeholders})`, args: ids }),
          db.execute({ sql: `SELECT stripe_session_id FROM orders WHERE stripe_session_id IN (${placeholders})`, args: ids }),
        ]);
        const recordedIds = new Set([
          ...bookingRows.rows.map((r) => String(r.stripe_session_id)),
          ...orderRows.rows.map((r) => String(r.stripe_session_id)),
        ]);
        sessionChecks = completed.map((s) => ({
          id: s.id,
          amount: s.amount_total,
          email: s.customer_details?.email ?? s.customer_email ?? null,
          created: new Date(s.created * 1000).toISOString(),
          type: s.metadata?.type ?? 'booking',
          matched: recordedIds.has(s.id),
        }));
      } catch (dbErr) {
        console.error('[webhook-check] Turso unreachable:', dbErr);
        dbReachable = false;
      }
    }

    const unmatched = sessionChecks.filter((s) => !s.matched);

    return NextResponse.json({
      endpoint: endpointCheck,
      dbReachable,
      checkedCount: sessionChecks.length,
      unmatchedCount: unmatched.length,
      sessions: sessionChecks,
    });
  } catch (err) {
    console.error('[webhook-check]', err);
    return NextResponse.json({ error: 'Check failed', detail: String(err) }, { status: 500 });
  }
}
