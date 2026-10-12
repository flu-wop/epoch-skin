// app/api/admin/env-check/route.ts
// Reports which required env vars are present in this deployment, WITHOUT
// ever revealing their values. Same secret-gated pattern as
// /api/stripe/webhook-check and /api/stripe/sync-products.

import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { REQUIRED_VARS } from '@/lib/health-checks';

function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

// The list lives in lib/health-checks.ts (REQUIRED_VARS) so /admin/system and
// this route can never disagree. Keep it in sync with .env.example.

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
