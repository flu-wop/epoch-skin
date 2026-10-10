'use client';
// components/admin/insights/ContentPlanner.tsx
// Weekly content plan. Each planned post carries its own clip checklist.
// Saves to Turso (/api/admin/content-plan) so it's the same on every device.

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { PILLARS, OFFER_ID, CLIP_CHECKLIST, DAYS, POST_TARGET } from './content';
import { Card } from './ui';

type Day = { pillar: number; note: string; checks: boolean[] };
type Plan = { days: Day[] };

const blank = (): Plan => ({ days: DAYS.map(() => ({ pillar: 0, note: '', checks: CLIP_CHECKLIST.map(() => false) })) });

function todayLocal(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
}
function mondayOf(day: string): string {
  const d = new Date(day + 'T12:00:00Z');
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
function shift(day: string, n: number) {
  const d = new Date(day + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
const md = (day: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(day + 'T12:00:00Z'));

export function ContentPlanner() {
  const today = todayLocal();
  const [week, setWeek] = useState(() => mondayOf(today));
  const [plan, setPlan] = useState<Plan>(blank);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<{ week: string; plan: Plan } | null>(null);

  const flush = useCallback(async () => {
    const p = pending.current; if (!p) return;
    pending.current = null;
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/content-plan', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p),
      });
      setStatus(res.ok ? 'saved' : 'error');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setOpen(null);
    fetch(`/api/admin/content-plan?week=${week}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (!cancelled) { setPlan(d.plan); setStatus('idle'); } })
      .catch(() => { if (!cancelled) { setPlan(blank()); setStatus('error'); } });
    return () => { cancelled = true; };
  }, [week]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); void flush(); }, [flush]);

  const update = (i: number, patch: Partial<Day>) => {
    setPlan((prev) => {
      const next = { days: prev.days.map((d, j) => (j === i ? { ...d, ...patch } : d)) };
      pending.current = { week, plan: next };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 700);
      return next;
    });
    setStatus('saving');
  };

  const changeWeek = (n: number) => {
    if (timer.current) clearTimeout(timer.current);
    void flush();
    setWeek((w) => shift(w, n * 7));
  };

  const planned = plan.days.filter((d) => d.pillar > 0);
  const offers = planned.filter((d) => d.pillar === OFFER_ID).length;
  const ready = planned.filter((d) => d.checks.every(Boolean)).length;
  const warnOffers = planned.length > 0 && offers / planned.length > 0.2;
  const warnMany = planned.length > POST_TARGET.max;
  const isThisWeek = week === mondayOf(today);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-3 mb-5">
          <button onClick={() => changeWeek(-1)} aria-label="Previous week"
            className="w-10 h-10 flex items-center justify-center border border-[#E5DCCF] text-[#5A5550] hover:border-[#C4974A] hover:text-[#1C1C1A] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center min-w-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">{isThisWeek ? 'This week' : 'Week of'}</p>
            <p className="font-serif text-lg sm:text-xl text-[#1C1C1A] whitespace-nowrap">{md(week)} – {md(shift(week, 6))}</p>
          </div>
          <button onClick={() => changeWeek(1)} aria-label="Next week"
            className="w-10 h-10 flex items-center justify-center border border-[#E5DCCF] text-[#5A5550] hover:border-[#C4974A] hover:text-[#1C1C1A] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {[
            { label: 'Planned', value: `${planned.length}`, sub: `of ${POST_TARGET.min}–${POST_TARGET.max}` },
            { label: 'Ready', value: `${ready}`, sub: `of ${planned.length || 0}` },
            { label: 'Offers', value: `${offers}`, sub: '1 in 5 max' },
          ].map((s) => (
            <div key={s.label} className="bg-[#FAF7F2] px-3 py-2.5 min-w-0">
              <p className="text-[10px] tracking-[0.14em] uppercase text-[#8C8680] truncate">{s.label}</p>
              <p className="font-serif text-xl text-[#1C1C1A] leading-tight">{s.value} <span className="font-sans text-[11px] text-[#8C8680]">{s.sub}</span></p>
            </div>
          ))}
        </div>

        <div className="h-2 bg-[#F3EEE5] rounded-[4px] overflow-hidden" aria-hidden>
          <div className="h-full rounded-[4px] bg-[#B8862F] transition-[width] duration-500" style={{ width: `${Math.min(100, (planned.length / POST_TARGET.max) * 100)}%` }} />
        </div>

        {(warnOffers || warnMany) && (
          <p className="mt-3 flex items-start gap-2 text-xs text-[#8A4B22] bg-[#FBF1E6] px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />
            {warnOffers ? 'Offers are over 1 in 5 this week. Swap one for a Before / After or a Tip.' : 'Over 6 posts this week — quality over volume.'}
          </p>
        )}

        <p className={`text-[11px] text-[#8C8680] ${status === 'idle' ? 'sr-only' : 'mt-3'}`} aria-live="polite">
          {status === 'loading' ? 'Loading…' : status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓ — synced across your devices' : status === 'error' ? 'Couldn’t reach the database — changes not saved.' : ''}
        </p>
      </Card>

      <div className="bg-white border border-[#E5DCCF] divide-y divide-[#F0EBE0]">
        {plan.days.map((d, i) => {
          const date = shift(week, i);
          const isToday = date === today;
          const done = d.checks.filter(Boolean).length;
          const expanded = open === i && d.pillar > 0;
          return (
            <div key={i} className={isToday ? 'bg-[#FDFAF4]' : ''}>
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3">
                <div className="w-11 shrink-0">
                  <p className={`text-sm font-medium ${isToday ? 'text-[#A87C30]' : 'text-[#1C1C1A]'}`}>{DAYS[i]}</p>
                  <p className="text-[10px] text-[#8C8680]">{isToday ? 'Today' : md(date)}</p>
                </div>
                <label className="sr-only" htmlFor={`pillar-${i}`}>{DAYS[i]} post type</label>
                <select
                  id={`pillar-${i}`}
                  value={d.pillar}
                  onChange={(e) => update(i, { pillar: Number(e.target.value) })}
                  className={`flex-1 min-w-0 h-10 px-3 border text-sm bg-white focus:outline-none focus:border-[#C4974A] ${
                    d.pillar === OFFER_ID ? 'border-[#E3C9A0]' : 'border-[#E5DCCF]'
                  } ${d.pillar ? 'text-[#1C1C1A]' : 'text-[#8C8680]'}`}
                >
                  {PILLARS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                {d.pillar > 0 ? (
                  <button
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-label={`${DAYS[i]} clip checklist, ${done} of ${CLIP_CHECKLIST.length} done`}
                    className={`h-10 px-2.5 flex items-center gap-1.5 border text-xs shrink-0 transition-colors ${
                      done === CLIP_CHECKLIST.length ? 'border-[#2E8253]/40 text-[#2E7049] bg-[#EEF6F0]' : 'border-[#E5DCCF] text-[#5A5550]'
                    }`}
                  >
                    {done === CLIP_CHECKLIST.length ? <Check className="w-3.5 h-3.5" /> : <span className="tabular-nums">{done}/{CLIP_CHECKLIST.length}</span>}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                ) : <span className="w-[62px] shrink-0" aria-hidden />}
              </div>

              {expanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pl-[76px]">
                  <label className="block text-[10px] tracking-[0.16em] uppercase text-[#8C8680] mb-1.5" htmlFor={`note-${i}`}>Idea / hook</label>
                  <input
                    id={`note-${i}`}
                    value={d.note}
                    maxLength={200}
                    onChange={(e) => update(i, { note: e.target.value })}
                    placeholder={PILLARS[d.pillar]?.tip ? `e.g. ${PILLARS[d.pillar].tip.toLowerCase()}` : 'What’s the clip?'}
                    className="w-full h-10 px-3 border border-[#E5DCCF] text-sm mb-3 focus:outline-none focus:border-[#C4974A]"
                  />
                  <ul className="space-y-0.5">
                    {CLIP_CHECKLIST.map((c, ci) => (
                      <li key={c}>
                        <label className="flex items-start gap-3 py-1.5 text-sm text-[#1C1C1A] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={d.checks[ci]}
                            onChange={(e) => update(i, { checks: d.checks.map((v, k) => (k === ci ? e.target.checked : v)) })}
                            className="mt-0.5 w-4 h-4 accent-[#3E4A3C] shrink-0"
                          />
                          <span className={d.checks[ci] ? 'text-[#8C8680] line-through decoration-[#C9C3B8]' : ''}>{c}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!expanded && d.pillar > 0 && d.note && (
                <p className="px-4 sm:px-5 -mt-1.5 pb-3 pl-[72px] sm:pl-[76px] text-xs text-[#8C8680] truncate">{d.note}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
