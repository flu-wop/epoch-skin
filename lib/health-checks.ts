// lib/health-checks.ts
// Server-side only. Checks behind /admin/system (via /api/admin/health).
// Every check returns { status, detail } and never throws, so one broken
// integration can't blank the whole page. Env vars are reported by presence
// only; values are never returned.

import Stripe from 'stripe';
import { getTurso } from '@/lib/insights-db';
import { getResend } from '@/lib/email';

export type CheckStatus = 'ok' | 'warn' | 'error';
export type CheckResult = { status: CheckStatus; detail: string };

const short = (err: unknown) => (err instanceof Error ? err.message : String(err)).slice(0, 160);

// ── 1. Env Var Status ────────────────────────────────────────────
// Mirrors .env.example. /api/admin/env-check reads this same list, so there
// is only one place to edit when a variable is added.
export const REQUIRED_VARS = [
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
  { name: 'SQUARE_ACCESS_TOKEN', group: 'Square' },
  { name: 'SQUARE_LOCATION_ID', group: 'Square' },
  { name: 'SQUARE_ENVIRONMENT', group: 'Square' },
  { name: 'NEXT_PUBLIC_SITE_URL', group: 'Site' },
  { name: 'ANTHROPIC_API_KEY', group: 'Newsletter engine' },
  { name: 'CRON_SECRET', group: 'Newsletter engine' },
  { name: 'NEWSLETTER_SECRET', group: 'Newsletter engine' },
  { name: 'APPROVER_EMAIL', group: 'Newsletter engine' },
] as const;

export function checkEnvVars() {
  return REQUIRED_VARS.map((v) => {
    const present = !!process.env[v.name] && process.env[v.name] !== '';
    return { name: v.name, group: v.group, status: (present ? 'ok' : 'error') as CheckStatus, detail: present ? 'set' : 'MISSING' };
  });
}

// ── 2. Webhook Health ────────────────────────────────────────────
const WEBHOOK_PATH = '/api/stripe/webhook';
const bareHost = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

export async function checkStripe(): Promise<CheckResult> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return { status: 'error', detail: 'STRIPE_SECRET_KEY is missing' };
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
    const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';
    const endpoints = await stripe.webhookEndpoints.list({ limit: 20 });
    const match = endpoints.data.find((e) => {
      try { return new URL(e.url).pathname === WEBHOOK_PATH && bareHost(e.url) === bareHost(site); } catch { return false; }
    });
    if (!match) return { status: 'error', detail: `No Stripe webhook registered for ${site}${WEBHOOK_PATH}` };
    if (match.status !== 'enabled') return { status: 'error', detail: `Webhook endpoint is ${match.status}` };
    const hears = match.enabled_events.includes('checkout.session.completed') || match.enabled_events.includes('*');
    if (!hears) return { status: 'error', detail: 'Webhook is not listening for checkout.session.completed' };
    return { status: 'ok', detail: 'Registered, enabled, listening for checkout.session.completed' };
  } catch (err) {
    return { status: 'error', detail: `Stripe API error: ${short(err)}` };
  }
}

// A webhook that is registered but silently not firing shows up here: the
// newest paid record stops moving even though people are checking out.
export async function checkLastSale(): Promise<CheckResult> {
  try {
    const db = getTurso();
    const [o, b] = await Promise.all([
      db.execute('SELECT MAX(created_at) AS last FROM orders'),
      db.execute('SELECT MAX(created_at) AS last FROM bookings WHERE paid IS NULL OR paid != 0'),
    ]);
    const stamps = [o.rows[0]?.last, b.rows[0]?.last]
      .filter(Boolean)
      .map((s) => new Date(String(s).includes('T') ? String(s) : String(s).replace(' ', 'T') + 'Z'))
      .filter((d) => !Number.isNaN(d.getTime()));
    if (!stamps.length) return { status: 'warn', detail: 'No orders or bookings recorded yet' };
    const last = new Date(Math.max(...stamps.map((d) => d.getTime())));
    const days = Math.floor((Date.now() - last.getTime()) / 86_400_000);
    const when = last.toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });
    if (days >= 14) return { status: 'warn', detail: `Last paid record ${days} days ago (${when}). Quiet is fine; if people did check out, the webhook may be failing.` };
    return { status: 'ok', detail: `Last paid record ${when}` };
  } catch (err) {
    return { status: 'error', detail: `Database read failed: ${short(err)}` };
  }
}

export async function checkResend(): Promise<CheckResult> {
  try {
    if (!process.env.RESEND_API_KEY) return { status: 'error', detail: 'RESEND_API_KEY is missing' };
    const from = process.env.RESEND_FROM_EMAIL ?? '';
    const domain = from.match(/@([^>\s]+)/)?.[1]?.toLowerCase();
    if (!domain) return { status: 'error', detail: 'RESEND_FROM_EMAIL is missing or has no domain' };
    if (domain === 'resend.dev') return { status: 'warn', detail: 'Sending from resend.dev: customers will not receive email until a real domain is verified' };
    const res = await getResend().domains.list();
    const err = (res as { error?: { message?: string } | null }).error;
    if (err) return { status: 'error', detail: `Resend API error: ${(err.message ?? 'unknown').slice(0, 160)}` };
    const payload = res.data as unknown;
    const list = (Array.isArray(payload) ? payload : (payload as { data?: unknown[] } | null)?.data ?? []) as { name: string; status: string }[];
    const match = list.find((d) => d.name.toLowerCase() === domain);
    if (!match) return { status: 'error', detail: `${domain} is not in this Resend account` };
    if (match.status !== 'verified') return { status: 'error', detail: `${domain} is ${match.status}, not verified` };
    return { status: 'ok', detail: `${domain} verified` };
  } catch (err) {
    return { status: 'error', detail: `Resend API error: ${short(err)}` };
  }
}

export async function checkTurso(): Promise<CheckResult> {
  try {
    await getTurso().execute('SELECT 1');
    return { status: 'ok', detail: 'Connected' };
  } catch (err) {
    return { status: 'error', detail: `Turso connection failed: ${short(err)}` };
  }
}

// ── 3. API Usage ─────────────────────────────────────────────────
// Resend's API does not expose a monthly send count, so this reports what the
// providers and our own tables can show: Stripe event volume and paid records.
export async function checkApiUsage(): Promise<CheckResult> {
  const parts: string[] = [];
  let status: CheckStatus = 'ok';
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
      const since = Math.floor(Date.now() / 1000) - 30 * 86_400;
      const ev = await stripe.events.list({ limit: 100, created: { gte: since } });
      parts.push(`Stripe events (30d): ${ev.data.length}${ev.has_more ? '+' : ''}`);
    }
  } catch (err) {
    status = 'warn';
    parts.push(`Stripe usage unavailable (${short(err)})`);
  }
  try {
    const db = getTurso();
    const [o, b] = await Promise.all([
      db.execute("SELECT COUNT(*) AS n FROM orders WHERE created_at >= datetime('now', '-30 days')"),
      db.execute("SELECT COUNT(*) AS n FROM bookings WHERE created_at >= datetime('now', '-30 days')"),
    ]);
    parts.push(`Orders (30d): ${Number(o.rows[0]?.n ?? 0)}`, `Bookings (30d): ${Number(b.rows[0]?.n ?? 0)}`);
  } catch {
    status = 'warn';
    parts.push('Order and booking counts unavailable');
  }
  parts.push('Resend send counts are not exposed by Resend');
  return { status, detail: parts.join(' · ') };
}
