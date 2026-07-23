// app/api/admin/env-check/route.ts
// Reports which required env vars are present in this deployment, WITHOUT
// ever revealing their values. Same secret-gated pattern as
// /api/stripe/webhook-check and /api/stripe/sync-products.

import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { rateLimit, clientIp } from '@/lib/rate-limit';

function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

// Mirrors .env.example — keep these two in sync when either changes.
const REQUIRED_VARS = [
  { name: 'STRIPE_SECRET_KEY', group: 'Stripe' },
  { name: 'STRIPE_WEBHOOK_SECRET', group: 'Stripe' },
  { name: 'TURSO_DATABASE_URL', group: 'Turso' },
  { name: 'TURSO_AUTH_TOKEN', group: 'Turso' },
  { name: 'RESEND_API_KEY', group: 'Resend' },
  { name: 'RESEND_FROM_EMAIL', group: 'Resend' },
  { name: 'RESEND_TO_EMAIL', group: 'Resend' },
  { name: 'NEWSLETTER_TO', group: 'Resend' },
  { name: 'ADMIN_PASSWORD', group: 'Admin panel' },
  { name: 'SYNC_SECRET', group: 'Stripe sync' },
  { name: 'NEXT_PUBLIC_SITE_URL', group: 'Site' },
  { name: 'ANTHROPIC_API_KEY', group: 'Newsletter engine' },
  { name: 'CRON_SECRET', group: 'Newsletter engine' },
  { name: 'NEWSLETTER_SECRET', group: 'Newsletter engine' },
  { name: 'APPROVER_EMAIL', group: 'Newsletter engine' },
] as const;

export async function POST(req: Request) {
  const ok = await rateLimit(`env-check:${clientIp(req)}`, 10, 900);
  if (!ok) return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });

  const configuredSecret = process.env.SYNC_SECRET;
  if (!configuredSecret) {
    return NextResponse.json({ error: 'Not configured.' }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const providedSecret = String(body?.secret ?? '');
  if (!safeEq(providedSecret, configuredSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = REQUIRED_VARS.map((v) => ({
    name: v.name,
    group: v.group,
    present: !!process.env[v.name] && process.env[v.name] !== '',
  }));

  const missing = results.filter((r) => !r.present);

  return NextResponse.json({ results, missingCount: missing.length });
}
