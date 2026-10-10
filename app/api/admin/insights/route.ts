// app/api/admin/insights/route.ts
// Admin-only aggregation behind /admin/insights and the /admin home snapshot.
// Sales numbers come from the real orders + bookings tables; browsing numbers
// come from site_events (see /api/track). Times are bucketed in New Orleans time.

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { parseTimeToMinutes } from '@/lib/availability-shared';
import { getTurso, ensureInsightsTables, ensureCoreTables } from '@/lib/insights-db';
import {
  products, PRODUCT_GROUP, SERVICE_BY_NAME, SERVICE_COUNT, PRODUCT_COUNT,
  matchProduct, productBySlugPath, norm,
} from '@/lib/insights-catalog';

export const dynamic = 'force-dynamic';

const TZ = 'America/Chicago';
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });

// SQLite datetime('now') → "YYYY-MM-DD HH:MM:SS" in UTC; events use ISO with Z.
function toDate(ts: unknown): Date | null {
  if (!ts) return null;
  const s = String(ts);
  const iso = s.includes('T') ? s : s.replace(' ', 'T') + 'Z';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}
const localDay = (d: Date) => dayFmt.format(d);

function addDays(day: string, n: number): string {
  const d = new Date(day + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

type OrderItem = { name: string; quantity: number; amountCents: number };

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const days = Math.max(7, Math.min(365, Number(url.searchParams.get('days')) || 30));
  const today = localDay(new Date());
  const start = addDays(today, -(days - 1));
  const prevStart = addDays(start, -days);
  // Pull a little extra in UTC so timezone edges are covered, then filter by local day.
  const sqlFloor = addDays(prevStart, -1);

  try {
    const db = getTurso();
    await Promise.all([ensureInsightsTables(db), ensureCoreTables(db)]);

    const [ordersRes, bookingsRes, eventsRes, prevVisRes, firstEvRes, upcomingRes] = await Promise.all([
      db.execute({ sql: 'SELECT items, total_cents, created_at FROM orders WHERE created_at >= ?', args: [sqlFloor] }),
      db.execute({
        sql: 'SELECT service, price, created_at, stripe_session_id, paid FROM bookings WHERE created_at >= ?',
        args: [sqlFloor],
      }),
      db.execute({
        sql: 'SELECT ts, sid, type, path, item, value, ref, device FROM site_events WHERE ts >= ? ORDER BY ts',
        args: [addDays(start, -1)],
      }),
      db.execute({
        sql: 'SELECT ts, sid FROM site_events WHERE type = ? AND ts >= ? AND ts < ?',
        args: ['page_view', addDays(prevStart, -1), addDays(start, 1)],
      }),
      db.execute('SELECT MIN(ts) AS first FROM site_events'),
      db.execute({
        sql: `SELECT id, name, service, date, time, duration, price FROM bookings
              WHERE date >= ? AND (paid IS NULL OR paid != 0) ORDER BY date LIMIT 40`,
        args: [today],
      }),
    ]);

    const inCur = (d: string) => d >= start && d <= today;
    const inPrev = (d: string) => d >= prevStart && d < start;

    // ── Daily buckets ───────────────────────────────────────────
    const daily = new Map<string, { date: string; shop: number; studio: number; visitors: Set<string> }>();
    for (let d = start; d <= today; d = addDays(d, 1)) daily.set(d, { date: d, shop: 0, studio: 0, visitors: new Set() });

    // ── Orders → product sales ──────────────────────────────────
    const prodStats = new Map<string, { views: Set<string>; time: Map<string, number>; carts: number; cartSids: Set<string>; checkouts: number; sold: number; revenue: number }>();
    const blankProd = () => ({ views: new Set<string>(), time: new Map<string, number>(), carts: 0, cartSids: new Set<string>(), checkouts: 0, sold: 0, revenue: 0 });
    for (const p of products) prodStats.set(p.id, blankProd());
    const otherItems = new Map<string, { sold: number; revenue: number }>();

    let revCur = 0, revPrev = 0, ordersCur = 0, ordersPrev = 0, shopRev = 0;
    for (const r of ordersRes.rows) {
      const dt = toDate(r.created_at); if (!dt) continue;
      const day = localDay(dt);
      const total = Number(r.total_cents) / 100 || 0;
      if (inPrev(day)) { revPrev += total; ordersPrev++; continue; }
      if (!inCur(day)) continue;
      revCur += total; ordersCur++; shopRev += total;
      daily.get(day)!.shop += total;
      let items: OrderItem[] = [];
      try { items = JSON.parse(String(r.items)); } catch { /* skip */ }
      for (const it of items) {
        const p = matchProduct(it.name ?? '');
        const qty = Number(it.quantity) || 1;
        const amt = (Number(it.amountCents) || 0) / 100;
        if (p) { const s = prodStats.get(p.id)!; s.sold += qty; s.revenue += amt; }
        else {
          const k = it.name || 'Item';
          const o = otherItems.get(k) ?? { sold: 0, revenue: 0 };
          o.sold += qty; o.revenue += amt; otherItems.set(k, o);
        }
      }
    }

    // ── Bookings → service sales ────────────────────────────────
    const svcStats = new Map<string, { name: string; group: string; selects: number; starts: number; booked: number; revenue: number }>();
    const svc = (rawName: string) => {
      const hit = SERVICE_BY_NAME.get(norm(rawName));
      const name = hit?.name ?? rawName.trim();
      const key = norm(name);
      let s = svcStats.get(key);
      if (!s) { s = { name, group: hit?.group ?? 'Other', selects: 0, starts: 0, booked: 0, revenue: 0 }; svcStats.set(key, s); }
      return s;
    };
    let bookingsCur = 0, bookingsPrev = 0, bookingsOnline = 0, studioRev = 0;
    for (const r of bookingsRes.rows) {
      if (r.paid !== null && Number(r.paid) === 0) continue;
      const dt = toDate(r.created_at); if (!dt) continue;
      const day = localDay(dt);
      const price = Number(r.price) || 0;
      if (inPrev(day)) { revPrev += price; bookingsPrev++; continue; }
      if (!inCur(day)) continue;
      revCur += price; bookingsCur++; studioRev += price;
      if (r.stripe_session_id) bookingsOnline++;
      daily.get(day)!.studio += price;
      const names = String(r.service ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      const weights = names.map((n) => SERVICE_BY_NAME.get(norm(n))?.price ?? 1);
      const wSum = weights.reduce((a, b) => a + b, 0) || 1;
      names.forEach((n, i) => { const s = svc(n); s.booked++; s.revenue += price * (weights[i] / wSum); });
    }

    // ── Events ─────────────────────────────────────────────────
    const sessions = new Map<string, { types: Set<string>; productView: boolean; bookView: boolean; carted: Map<string, number>; checkedOut: boolean }>();
    const pages = new Map<string, { views: number; time: Map<string, number> }>();
    const refs = new Map<string, number>();
    const devices: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
    let checkoutStarts = 0, bookingStarts = 0;

    for (const e of eventsRes.rows) {
      const dt = toDate(e.ts); if (!dt) continue;
      const day = localDay(dt);
      if (!inCur(day)) continue;
      const sid = String(e.sid), type = String(e.type), path = String(e.path ?? ''), item = String(e.item ?? '');
      let s = sessions.get(sid);
      if (!s) {
        s = { types: new Set(), productView: false, bookView: false, carted: new Map(), checkedOut: false };
        sessions.set(sid, s);
        const dev = String(e.device ?? 'desktop'); devices[dev] = (devices[dev] ?? 0) + 1;
      }
      s.types.add(type);
      const prod = productBySlugPath(path);
      if (type === 'page_view') {
        daily.get(day)?.visitors.add(sid);
        const pg = pages.get(path) ?? { views: 0, time: new Map() }; pg.views++; pages.set(path, pg);
        if (prod) { prodStats.get(prod.id)!.views.add(sid); s.productView = true; }
        if (path.startsWith('/book')) s.bookView = true;
        if (e.ref) refs.set(String(e.ref), (refs.get(String(e.ref)) ?? 0) + 1);
      } else if (type === 'page_time') {
        const secs = Number(e.value) || 0;
        const pg = pages.get(path) ?? { views: 0, time: new Map() };
        pg.time.set(sid, (pg.time.get(sid) ?? 0) + secs); pages.set(path, pg);
        if (prod) { const t = prodStats.get(prod.id)!.time; t.set(sid, (t.get(sid) ?? 0) + secs); }
      } else if (type === 'add_to_cart') {
        const p = matchProduct(item);
        if (p) { const st = prodStats.get(p.id)!; st.carts++; st.cartSids.add(sid); }
        s.carted.set(item, (s.carted.get(item) ?? 0) + 1);
      } else if (type === 'checkout_start') {
        checkoutStarts++; s.checkedOut = true;
        for (const n of item.split(' | ')) { const p = matchProduct(n); if (p) prodStats.get(p.id)!.checkouts++; }
      } else if (type === 'service_select') {
        svc(item).selects++;
      } else if (type === 'booking_start') {
        bookingStarts++;
        for (const n of item.split(' | ')) if (n.trim()) svc(n).starts++;
      }
    }

    const prevVisitors = new Set<string>();
    for (const r of prevVisRes.rows) { const dt = toDate(r.ts); if (dt && inPrev(localDay(dt))) prevVisitors.add(String(r.sid)); }

    const abandoned = new Map<string, number>();
    let abandonedSessions = 0, cartSessions = 0;
    for (const s of sessions.values()) {
      if (s.carted.size) cartSessions++;
      if (s.carted.size && !s.checkedOut) {
        abandonedSessions++;
        for (const k of s.carted.keys()) abandoned.set(k, (abandoned.get(k) ?? 0) + 1);
      }
    }

    const avg = (m: Map<string, number>) => (m.size ? [...m.values()].reduce((a, b) => a + b, 0) / m.size : 0);
    const visitors = sessions.size;
    const sessionsWith = (f: (s: { types: Set<string>; productView: boolean; bookView: boolean }) => boolean) => [...sessions.values()].filter(f).length;

    const productRows = products.map((p) => {
      const s = prodStats.get(p.id)!;
      return {
        id: p.id, name: p.name, slug: p.slug, group: PRODUCT_GROUP[p.category] ?? 'Other', price: p.price,
        image: p.images?.[0] ?? null,
        views: s.views.size, avgTime: Math.round(avg(s.time)), carts: s.carts, checkouts: s.checkouts,
        sold: s.sold, revenue: Math.round(s.revenue * 100) / 100,
      };
    });
    const otherRows = [...otherItems.entries()].map(([name, o]) => ({
      id: null, name, slug: null, group: 'Other', price: 0, image: null, views: 0, avgTime: 0, carts: 0, checkouts: 0,
      sold: o.sold, revenue: Math.round(o.revenue * 100) / 100,
    }));

    const aov = (rev: number, n: number) => (n ? rev / n : 0);
    const cur = ordersCur + bookingsCur;
    const prev = ordersPrev + bookingsPrev;

    return NextResponse.json({
      range: { days, start, end: today },
      trackingSince: firstEvRes.rows[0]?.first ?? null,
      catalog: { products: PRODUCT_COUNT, services: SERVICE_COUNT },
      kpis: {
        revenue: revCur, revenuePrev: revPrev,
        shopRevenue: shopRev, studioRevenue: studioRev,
        orders: ordersCur, ordersPrev, bookings: bookingsCur, bookingsPrev,
        avgSale: aov(revCur, cur), avgSalePrev: aov(revPrev, prev),
        visitors, visitorsPrev: prevVisitors.size,
      },
      daily: [...daily.values()].map((d) => ({ date: d.date, shop: Math.round(d.shop * 100) / 100, studio: Math.round(d.studio * 100) / 100, visitors: d.visitors.size })),
      products: [...productRows, ...otherRows],
      services: [...svcStats.values()].map((s) => ({ ...s, revenue: Math.round(s.revenue * 100) / 100 }))
        .sort((a, b) => b.revenue - a.revenue || b.booked - a.booked || b.selects - a.selects),
      funnels: {
        shop: [
          { label: 'Visited the site', value: visitors },
          { label: 'Viewed a product', value: sessionsWith((s) => s.productView) },
          { label: 'Added to cart', value: cartSessions },
          { label: 'Started checkout', value: sessionsWith((s) => s.types.has('checkout_start')) },
          { label: 'Paid orders', value: ordersCur },
        ],
        studio: [
          { label: 'Visited the site', value: visitors },
          { label: 'Opened booking page', value: sessionsWith((s) => s.bookView) },
          { label: 'Picked a service', value: sessionsWith((s) => s.types.has('service_select')) },
          { label: 'Started booking checkout', value: sessionsWith((s) => s.types.has('booking_start')) },
          { label: 'Paid online bookings', value: bookingsOnline },
        ],
      },
      checkoutStarts, bookingStarts,
      abandoned: { sessions: abandonedSessions, cartSessions, items: [...abandoned.entries()].map(([item, count]) => ({ item, count })).sort((a, b) => b.count - a.count).slice(0, 10) },
      pages: [...pages.entries()].map(([path, p]) => ({ path, views: p.views, avgTime: Math.round(avg(p.time)) }))
        .sort((a, b) => b.views - a.views).slice(0, 12),
      referrers: [...refs.entries()].map(([host, visits]) => ({ host, visits })).sort((a, b) => b.visits - a.visits).slice(0, 8),
      devices,
      upcoming: [...upcomingRes.rows]
        .sort((a, b) => String(a.date).localeCompare(String(b.date)) || (parseTimeToMinutes(String(a.time)) ?? 0) - (parseTimeToMinutes(String(b.time)) ?? 0))
        .slice(0, 8)
        .map((r) => ({
        id: Number(r.id), name: String(r.name), service: String(r.service), date: String(r.date),
        time: String(r.time), duration: r.duration == null ? null : Number(r.duration), price: Number(r.price) || 0,
      })),
    });
  } catch (err) {
    console.error('[insights] GET error:', err);
    return NextResponse.json({ error: 'Could not load insights — database not reachable.' }, { status: 500 });
  }
}
