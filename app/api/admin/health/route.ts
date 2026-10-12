// app/api/admin/health/route.ts
// Backs /admin/system. Admin-cookie gated like every other /api/admin route.
// Runs every check server-side and returns JSON; secrets never leave the server.

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { checkEnvVars, checkStripe, checkLastSale, checkResend, checkTurso, checkApiUsage } from '@/lib/health-checks';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!(await rateLimit(`health:${clientIp(req)}`, 30, 300))) {
    return NextResponse.json({ error: 'Too many checks. Try again in a few minutes.' }, { status: 429 });
  }

  const [stripe, lastSale, resend, turso, apiUsage] = await Promise.all([
    checkStripe(), checkLastSale(), checkResend(), checkTurso(), checkApiUsage(),
  ]);

  return NextResponse.json({
    envVars: checkEnvVars(),
    webhookHealth: { stripe, lastSale, resend, turso },
    apiUsage,
    checkedAt: new Date().toISOString(),
  });
}
