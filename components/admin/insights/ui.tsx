'use client';
// components/admin/insights/ui.tsx — shared building blocks for the Insights page.

import { useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { delta, shortDate, compactMoney, money, num } from './format';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-[#E5DCCF] p-4 sm:p-6 min-w-0 ${className}`}>{children}</div>;
}

export function CardTitle({ title, hint, right }: { title: string; hint?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="min-w-0">
        <h2 className="font-serif text-lg sm:text-xl text-[#1C1C1A] leading-tight">{title}</h2>
        {hint && <p className="text-xs text-[#8C8680] mt-1 leading-relaxed">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

export function Stat({ label, value, cur, prev, sub }: { label: string; value: string; cur?: number; prev?: number; sub?: React.ReactNode }) {
  const d = cur !== undefined && prev !== undefined ? delta(cur, prev) : null;
  const Icon = d?.dir === 'up' ? ArrowUpRight : d?.dir === 'down' ? ArrowDownRight : Minus;
  return (
    <div className="bg-white border border-[#E5DCCF] p-4 sm:p-5 min-w-0">
      <p className="text-[10px] tracking-[0.18em] uppercase text-[#8C8680] mb-2 truncate">{label}</p>
      <p className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] leading-none truncate">{value}</p>
      <div className="mt-2.5 flex items-center gap-2 text-[11px] min-h-[16px] flex-wrap">
        {d && (
          <span className={`inline-flex items-center gap-0.5 font-medium ${
            d.dir === 'up' ? 'text-[#2E7049]' : d.dir === 'down' ? 'text-[#A3452A]' : 'text-[#8C8680]'
          }`}>
            <Icon className="w-3 h-3" strokeWidth={2} aria-hidden />
            {d.label}
          </span>
        )}
        {sub && <span className="text-[#8C8680] truncate">{sub}</span>}
      </div>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#8C8680] py-6 text-center leading-relaxed">{children}</p>;
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5 text-[11px] text-[#5A5550]">
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: i.color }} aria-hidden />
          {i.label}
        </span>
      ))}
    </div>
  );
}

// ── Column chart (one axis, stacked series share it) ──────────────
type Series = { key: string; label: string; color: string };
type Row = { date: string } & Record<string, number | string>;

function bucket(rows: Row[], keys: string[]): { label: string; range: string; values: Record<string, number> }[] {
  const n = rows.length;
  const size = n > 120 ? 30 : n > 45 ? 7 : 1;
  const out: { label: string; range: string; values: Record<string, number> }[] = [];
  for (let i = 0; i < n; i += size) {
    const slice = rows.slice(i, i + size);
    const values: Record<string, number> = {};
    for (const k of keys) values[k] = slice.reduce((s, r) => s + (Number(r[k]) || 0), 0);
    const first = slice[0].date, last = slice[slice.length - 1].date;
    out.push({
      label: shortDate(first),
      range: size === 1 ? shortDate(first) : `${shortDate(first)} – ${shortDate(last)}`,
      values,
    });
  }
  return out;
}

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}

export function ColumnChart({ rows, series, format = 'money', height = 180 }: {
  rows: Row[]; series: Series[]; format?: 'money' | 'count'; height?: number;
}) {
  const data = useMemo(() => bucket(rows, series.map((s) => s.key)), [rows, series]);
  const totals = data.map((d) => series.reduce((s, x) => s + d.values[x.key], 0));
  const max = niceMax(Math.max(0, ...totals));
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const fmt = (v: number) => (format === 'money' ? money(v) : num(v));
  const tick = (v: number) => (format === 'money' ? compactMoney(v) : num(Math.round(v)));
  const pick = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const i = Math.floor(((clientX - r.left) / r.width) * data.length);
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };
  const labelEvery = Math.ceil(data.length / 6);

  return (
    <div className="relative select-none">
      <div className="flex gap-2">
        <div className="relative w-9 shrink-0 text-[10px] text-[#8C8680] tabular-nums" style={{ height }}>
          {[1, 0.5, 0].map((f) => (
            <span key={f} className="absolute right-0 -translate-y-1/2" style={{ top: `${(1 - f) * 100}%` }}>{tick(max * f)}</span>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div
            ref={ref}
            className="relative flex items-end touch-pan-y"
            style={{ height, gap: data.length > 40 ? 1 : 2 }}
            onPointerMove={(e) => pick(e.clientX)}
            onPointerDown={(e) => pick(e.clientX)}
            onPointerLeave={() => setHover(null)}
            role="img"
            aria-label={`Chart of ${series.map((s) => s.label).join(' and ')}`}
          >
            {[0, 0.5, 1].map((f) => (
              <div key={f} className="absolute left-0 right-0 border-t border-[#F0EBE0]" style={{ top: `${(1 - f) * 100}%` }} aria-hidden />
            ))}
            {data.map((d, i) => (
              <div key={i} className="relative flex-1 h-full flex flex-col justify-end items-center min-w-0">
                <div className="w-full flex flex-col-reverse items-stretch" style={{ maxWidth: 24, gap: 2 }}>
                  {series.map((s, si) => {
                    const v = d.values[s.key];
                    if (!v) return null;
                    const isTop = series.slice(si + 1).every((x) => !d.values[x.key]);
                    return (
                      <div
                        key={s.key}
                        style={{
                          height: Math.max(2, (v / max) * height - 2),
                          background: s.color,
                          opacity: hover === null || hover === i ? 1 : 0.45,
                          borderRadius: isTop ? '4px 4px 0 0' : 0,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-2 text-[10px] text-[#8C8680]" style={{ gap: data.length > 40 ? 1 : 2 }}>
            {data.map((d, i) => (
              <span key={i} className="flex-1 min-w-0 text-center whitespace-nowrap overflow-visible">
                {i % labelEvery === 0 ? d.label : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
      {hover !== null && data[hover] && (
        <div
          className="pointer-events-none absolute -top-2 z-10 bg-[#1C1C1A] text-white px-3 py-2 text-xs shadow-lg whitespace-nowrap"
          style={{
            left: `calc(2.75rem + (100% - 2.75rem) * ${(hover + 0.5) / data.length})`,
            transform: `translate(${(hover + 0.5) / data.length < 0.25 ? '-20%' : (hover + 0.5) / data.length > 0.75 ? '-80%' : '-50%'}, -100%)`,
          }}
        >
          <p className="text-[10px] text-white/60 mb-1">{data[hover].range}</p>
          {series.map((s) => (
            <p key={s.key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px]" style={{ background: s.color }} />
              {s.label}: <b className="font-medium">{fmt(data[hover].values[s.key])}</b>
            </p>
          ))}
          {series.length > 1 && <p className="mt-0.5 text-white/70">Total {fmt(totals[hover])}</p>}
        </div>
      )}
    </div>
  );
}

// ── Horizontal bars (rank lists & funnels) ──────────────────────
export function BarList({ rows, color = '#B8862F', format }: {
  rows: { label: string; value: number; note?: string }[]; color?: string; format?: (v: number) => string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label} className="min-w-0">
          <div className="flex items-baseline justify-between gap-3 text-sm mb-1.5">
            <span className="min-w-0">
              <span className="block text-[#1C1C1A] truncate">{r.label}</span>
              {r.note && <span className="block text-[11px] text-[#8C8680] truncate">{r.note}</span>}
            </span>
            <span className="text-[#5A5550] tabular-nums shrink-0">{format ? format(r.value) : num(r.value)}</span>
          </div>
          <div className="h-2 bg-[#F3EEE5] rounded-[4px] overflow-hidden">
            <div className="h-full rounded-[4px] transition-[width] duration-500" style={{ width: `${(r.value / max) * 100}%`, background: color, minWidth: r.value ? 4 : 0 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Funnel({ steps, color }: { steps: { label: string; value: number }[]; color: string }) {
  const top = Math.max(1, steps[0]?.value ?? 1);
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => {
        const prev = i ? steps[i - 1].value : null;
        return (
          <li key={s.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm mb-1.5">
              <span className="text-[#1C1C1A] min-w-0 truncate">{s.label}</span>
              <span className="tabular-nums text-[#1C1C1A] shrink-0">
                {num(s.value)}
                {prev !== null && <span className="text-[#8C8680] text-xs ml-1.5">{prev ? `${Math.round((s.value / prev) * 100)}%` : '—'}</span>}
              </span>
            </div>
            <div className="h-2.5 bg-[#F3EEE5] rounded-[4px] overflow-hidden">
              <div className="h-full rounded-[4px]" style={{ width: `${(s.value / top) * 100}%`, background: color, minWidth: s.value ? 4 : 0 }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Segmented<T extends string | number>({ value, onChange, options, label }: {
  value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex border border-[#E5DCCF] bg-white p-0.5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 text-xs tracking-wide transition-colors min-h-[32px] ${
            value === o.value ? 'bg-[#3E4A3C] text-[#F2E6C8]' : 'text-[#5A5550] hover:text-[#1C1C1A]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
