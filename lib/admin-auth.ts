// lib/admin-auth.ts
// Server-side only. Never expose ADMIN_PASSWORD via NEXT_PUBLIC_ — that inlines
// it into the client JS bundle, which is public on a public repo deploy.
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'epoch_admin';

function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

// Stateless session token derived from the admin password — no server-side
// session storage needed, but the raw password never sits in the cookie.
export function getAdminToken(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('ADMIN_PASSWORD not configured');
  return createHmac('sha256', secret).update('epoch-admin-session').digest('hex');
}

export function verifyAdminPassword(input: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return safeEq(input, secret);
}

export function verifyAdminCookie(cookieValue: string | undefined | null): boolean {
  if (!cookieValue) return false;
  try {
    return safeEq(cookieValue, getAdminToken());
  } catch {
    return false;
  }
}
