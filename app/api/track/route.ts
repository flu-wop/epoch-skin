// app/api/track/route.ts
// First-party, cookieless event intake for /admin/insights.
// Receives navigator.sendBeacon payloads (text/plain JSON) from lib/track.ts.
// Stores no IPs, emails, or names — only an anonymous per-tab session id.

import { NextResponse } from 'next/server';
import { getTurso, ensureInsightsTables } from '@/lib/insights-db';
import { rateLimit, clientIp } from '@/lib/rate-limit';

const TYPES = new Set([
  'page_view', 'page_time', 'add_to_cart', 'checkout_start', 'service_select', 'booking_start',
]);
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|monitor/i;

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const s = v.replace(/[\u0000-\u001f]/g, '').trim();
  return s ? s.slice(0, max) : null;
}

export async function POST(req: Request) {
  const ua = req.headers.get('user-agent') ?? '';
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const type = clean(body.type, 32);
  const sid = clean(body.sid, 40);
  const path = clean(body.path, 200);
  if (!type || !TYPES.has(type) || !sid || !/^[a-z0-9]+$/i.test(sid)) {
    return new NextResponse(null, { status: 400 });
  }
  if (path && (path.startsWith('/admin') || path.startsWith('/api'))) {
    return new NextResponse(null, { status: 204 });
  }

  const rawValue = Number(body.value);
  const value = Number.isFinite(rawValue) ? Math.max(0, Math.min(rawValue, 100000)) : null;
  const device = /Mobi|Android|iPhone/i.test(ua) ? 'mobile' : /iPad|Tablet/i.test(ua) ? 'tablet' : 'desktop';

  try {
    if (!(await rateLimit(`track:${clientIp(req)}`, 240, 60))) {
      return new NextResponse(null, { status: 204 });
    }
    const db = getTurso();
    await ensureInsightsTables(db);
    await db.execute({
      sql: 'INSERT INTO site_events (ts, sid, type, path, item, value, ref, device) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: [new Date().toISOString(), sid, type, path, clean(body.item, 300), value, clean(body.ref, 120), device],
    });
  } catch (err) {
    console.error('[track] insert failed:', err);
  }
  return new NextResponse(null, { status: 204 });
}
