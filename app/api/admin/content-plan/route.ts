// app/api/admin/content-plan/route.ts
// Weekly content plan for /admin/insights → Content. One row per week, keyed by
// that week's Monday (YYYY-MM-DD). Saved in Turso so it follows Kayla across devices.

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { getTurso, ensureInsightsTables } from '@/lib/insights-db';

export const dynamic = 'force-dynamic';

const PILLARS = 6;   // 0 = empty, 1–5 = pillars (see components/admin/insights/content.ts)
const CHECKS = 8;

type Day = { pillar: number; note: string; checks: boolean[] };

function emptyPlan(): { days: Day[] } {
  return { days: Array.from({ length: 7 }, () => ({ pillar: 0, note: '', checks: Array(CHECKS).fill(false) })) };
}

function sanitize(input: unknown): { days: Day[] } | null {
  const days = (input as { days?: unknown })?.days;
  if (!Array.isArray(days) || days.length !== 7) return null;
  return {
    days: days.map((d) => {
      const day = d as Partial<Day>;
      const pillar = Number(day.pillar);
      return {
        pillar: Number.isInteger(pillar) && pillar >= 0 && pillar < PILLARS ? pillar : 0,
        note: typeof day.note === 'string' ? day.note.slice(0, 200) : '',
        checks: Array.from({ length: CHECKS }, (_, i) => Boolean(Array.isArray(day.checks) && day.checks[i])),
      };
    }),
  };
}

const validWeek = (w: string | null) => !!w && /^\d{4}-\d{2}-\d{2}$/.test(w);

async function authed() {
  const store = await cookies();
  return verifyAdminCookie(store.get(ADMIN_COOKIE_NAME)?.value);
}

export async function GET(req: Request) {
  if (!(await authed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const week = new URL(req.url).searchParams.get('week');
  if (!validWeek(week)) return NextResponse.json({ error: 'Bad week' }, { status: 400 });
  try {
    const db = getTurso();
    await ensureInsightsTables(db);
    const r = await db.execute({ sql: 'SELECT plan FROM content_plans WHERE week_start = ?', args: [week] });
    const parsed = r.rows[0] ? sanitize(JSON.parse(String(r.rows[0].plan))) : null;
    return NextResponse.json({ week, plan: parsed ?? emptyPlan(), saved: !!parsed });
  } catch (err) {
    console.error('[content-plan] GET error:', err);
    return NextResponse.json({ error: 'Could not load plan' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await authed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const week = typeof body.week === 'string' ? body.week : null;
    const plan = sanitize(body.plan);
    if (!validWeek(week) || !plan) return NextResponse.json({ error: 'Bad plan' }, { status: 400 });
    const db = getTurso();
    await ensureInsightsTables(db);
    await db.execute({
      sql: `INSERT INTO content_plans (week_start, plan, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(week_start) DO UPDATE SET plan = excluded.plan, updated_at = excluded.updated_at`,
      args: [week, JSON.stringify(plan)],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[content-plan] PUT error:', err);
    return NextResponse.json({ error: 'Could not save plan' }, { status: 500 });
  }
}
