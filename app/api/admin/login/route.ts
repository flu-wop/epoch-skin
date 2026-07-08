// app/api/admin/login/route.ts
// POSTs the admin password once, sets an httpOnly session cookie.
// The password itself never touches client-side JS or query params.
import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { verifyAdminPassword, getAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST(req: Request) {
  const ok = await rateLimit(`admin-login:${clientIp(req)}`, 5, 900); // 5 per 15 min
  if (!ok) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const password = String(body?.password ?? '').slice(0, 200);

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8h
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return res;
}
