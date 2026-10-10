'use client';
// components/admin/insights/GlowMap.tsx
// "Glow Map" — every product (or booked service) is a star, grouped into
// constellations by category.
//   size     = revenue in the selected period
//   halo     = interest (product page visitors / times a service was picked)
//   color    = gold when it sold · silver when people looked but didn't buy · faint when quiet
// Tap a star for its numbers. A list view carries the same data for scanning.

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { ProductRow, ServiceRow } from './types';
import { money, num, pct, secs } from './format';
import { Segmented } from './ui';

type Star = {
  key: string; name: string; group: string; revenue: number; interest: number; sold: number;
  lines: { label: string; value: string }[]; href?: string;
};

const GOLD = '#E9C47E';
const SILVER = '#B9C6D3';
const FAINT = '#56635A';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function GlowMap({ products, services }: { products: ProductRow[]; services: ServiceRow[] }) {
  const [mode, setMode] = useState<'shop' | 'studio'>('shop');
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selected, setSelected] = useState<string | null>(null);
  const [ref, width] = useWidth<HTMLDivElement>();

  const stars: Star[] = useMemo(() => {
    if (mode === 'shop') {
      return products.filter((p) => p.id).map((p) => ({
        key: 'p' + p.id, name: p.name, group: p.group, revenue: p.revenue, interest: p.views, sold: p.sold,
        href: p.slug ? `/shop/${p.slug}` : undefined,
        lines: [
          { label: 'Revenue', value: money(p.revenue) },
          { label: 'Units sold', value: num(p.sold) },
          { label: 'Page visitors', value: num(p.views) },
          { label: 'Added to cart', value: num(p.carts) },
          { label: 'Visitor → buyer', value: pct(p.sold, p.views) },
          { label: 'Avg time on page', value: secs(p.avgTime) },
        ],
      }));
    }
    return services.filter((s) => s.booked || s.selects).map((s) => ({
      key: 's' + s.name, name: s.name, group: s.group, revenue: s.revenue, interest: s.selects, sold: s.booked,
      lines: [
        { label: 'Revenue', value: money(s.revenue) },
        { label: 'Times booked', value: num(s.booked) },
        { label: 'Times picked online', value: num(s.selects) },
        { label: 'Picked → booked', value: pct(s.booked, s.selects) },
      ],
    }));
  }, [mode, products, services]);

  const groups = useMemo(() => {
    const m = new Map<string, Star[]>();
    for (const s of stars) m.set(s.group, [...(m.get(s.group) ?? []), s]);
    return [...m.entries()]
      .map(([name, list]) => ({ name, list: list.sort((a, b) => b.revenue - a.revenue || b.interest - a.interest), total: list.reduce((t, s) => t + s.revenue, 0) }))
      .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  }, [stars]);

  const maxRev = Math.max(1, ...stars.map((s) => s.revenue));
  const maxInt = Math.max(1, ...stars.map((s) => s.interest));

  // Layout
  const W = Math.max(width, 280);
  const cols = W < 520 ? 2 : groups.length > 4 ? 3 : Math.max(2, Math.min(3, groups.length));
  const cellW = W / cols;
  const cellH = W < 520 ? 200 : 230;
  const rows = Math.max(1, Math.ceil(groups.length / cols));
  const H = rows * cellH + 8;

  const placed = groups.map((g, gi) => {
    const col = gi % cols, row = Math.floor(gi / cols);
    const cx = col * cellW + cellW / 2;
    const cy = row * cellH + cellH / 2 + 12;
    const maxR = Math.min(cellW, cellH) / 2 - 26;
    const turn = hash(g.name) * Math.PI * 2;
    const pts = g.list.map((s, i) => {
      const r = g.list.length === 1 ? 0 : Math.min(maxR, 18 + (maxR - 14) * Math.sqrt((i + 0.6) / g.list.length));
      const a = turn + i * 2.39996 + (hash(s.key) - 0.5) * 0.5;
      return {
        s,
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r * 0.8,
        a,
        radius: 2.5 + 9 * Math.sqrt(s.revenue / maxRev),
        halo: s.interest / maxInt,
      };
    });
    const path = [...pts].sort((p, q) => Math.atan2(p.y - cy, p.x - cx) - Math.atan2(q.y - cy, q.x - cx));
    return { g, col, row, cx, cy, pts, path };
  });

  const bgStars = useMemo(() => {
    let a = 0x9e3779b9;
    const rand = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    return Array.from({ length: 80 }, () => ({ x: rand(), y: rand(), r: 0.4 + rand() * 0.9, o: 0.12 + rand() * 0.35 }));
  }, []);

  const sel = stars.find((s) => s.key === selected) ?? null;
  const switchMode = (m: 'shop' | 'studio') => { setMode(m); setSelected(null); };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 sm:px-0">
        <Segmented label="Glow Map catalog" value={mode} onChange={switchMode}
          options={[{ value: 'shop', label: 'Shop' }, { value: 'studio', label: 'Studio' }]} />
        <Segmented label="Glow Map view" value={view} onChange={setView}
          options={[{ value: 'map', label: 'Map' }, { value: 'list', label: 'List' }]} />
      </div>

      {view === 'map' ? (
        <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#2B3A2E_0%,#1A231C_55%,#121813_100%)]">
          <div ref={ref} className="relative w-full">
            {stars.length === 0 ? (
              <div className="py-24 px-6 text-center">
                <p className="font-serif text-xl text-[#F2E6C8] mb-2">The sky is quiet</p>
                <p className="text-sm text-white/55 max-w-xs mx-auto">
                  {mode === 'studio' ? 'Services appear here once they’re booked or picked on the booking page.' : 'No products to show yet.'}
                </p>
              </div>
            ) : width > 0 && (
              <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block" onClick={() => setSelected(null)}>
                <defs>
                  <radialGradient id="halo-gold"><stop offset="0%" stopColor={GOLD} stopOpacity="0.55" /><stop offset="100%" stopColor={GOLD} stopOpacity="0" /></radialGradient>
                  <radialGradient id="halo-silver"><stop offset="0%" stopColor={SILVER} stopOpacity="0.45" /><stop offset="100%" stopColor={SILVER} stopOpacity="0" /></radialGradient>
                </defs>
                {bgStars.map((b, i) => <circle key={i} cx={b.x * W} cy={b.y * H} r={b.r} fill="#fff" opacity={b.o} />)}

                {placed.map(({ g, cx, cy, row, path }) => (
                  <g key={g.name}>
                    <text x={cx} y={row * cellH + 22} textAnchor="middle" className="fill-[#F2E6C8]/70" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {g.name}
                    </text>
                    {path.length > 1 && (
                      <polyline points={path.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#F2E6C8" strokeOpacity="0.14" strokeWidth="1" />
                    )}
                    <circle cx={cx} cy={cy} r="1.2" fill="#F2E6C8" opacity="0.25" />
                  </g>
                ))}

                {placed.flatMap(({ pts, col }) =>
                  pts.map((p, i) => {
                    const state = p.s.sold > 0 ? 'gold' : p.s.interest > 0 ? 'silver' : 'faint';
                    const color = state === 'gold' ? GOLD : state === 'silver' ? SILVER : FAINT;
                    const isSel = selected === p.s.key;
                    const showLabel = isSel || (i === 0 && p.s.revenue > 0);
                    // Centered under the star, trimmed to fit its constellation's cell.
                    const left = col * cellW + 6, right = (col + 1) * cellW - 6;
                    const maxChars = Math.max(6, Math.floor((right - left) / 6.1));
                    const label = p.s.name.length > maxChars ? p.s.name.slice(0, maxChars - 1).trimEnd() + '…' : p.s.name;
                    const half = (label.length * 6.1) / 2;
                    const lx = Math.min(Math.max(p.x, left + half), right - half);
                    return (
                      <g
                        key={p.s.key}
                        role="button"
                        tabIndex={0}
                        aria-label={`${p.s.name}: ${p.s.lines.map((l) => `${l.label} ${l.value}`).join(', ')}`}
                        aria-pressed={isSel}
                        className="cursor-pointer outline-none focus-visible:[&>circle:last-of-type]:stroke-white"
                        onClick={(e) => { e.stopPropagation(); setSelected(isSel ? null : p.s.key); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(isSel ? null : p.s.key); } }}
                      >
                        {state !== 'faint' && (
                          <circle cx={p.x} cy={p.y} r={p.radius * 2 + 10 + p.halo * 18} fill={`url(#halo-${state})`}
                            className="glow-twinkle" style={{ animationDelay: `${hash(p.s.key) * 4}s`, opacity: 0.35 + p.halo * 0.65 }} />
                        )}
                        <circle cx={p.x} cy={p.y} r={Math.max(p.radius + 9, 16)} fill="transparent" />
                        {isSel && <circle cx={p.x} cy={p.y} r={p.radius + 5} fill="none" stroke="#F2E6C8" strokeWidth="1" strokeOpacity="0.8" />}
                        <circle cx={p.x} cy={p.y} r={p.radius} fill={color} stroke="#121813" strokeWidth="2" />
                        {showLabel && (
                          <text x={lx} y={p.y + p.radius + 15} textAnchor="middle"
                            style={{ fontSize: 11, paintOrder: 'stroke', stroke: '#141B15', strokeWidth: 3, strokeLinejoin: 'round' }}
                            className={isSel ? 'fill-white' : 'fill-white/80'}>
                            {label}
                          </text>
                        )}
                      </g>
                    );
                  }),
                )}
              </svg>
            )}
          </div>

          <div className="border-t border-white/10 px-4 sm:px-6 py-4 min-h-[92px]">
            {sel ? (
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#E9C47E]/80">{sel.group}</p>
                    <p className="font-serif text-lg text-white leading-snug">{sel.name}</p>
                  </div>
                  {sel.href && (
                    <Link href={sel.href} target="_blank" className="text-[11px] text-[#E9C47E] hover:underline shrink-0 mt-1">View page ↗</Link>
                  )}
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                  {sel.lines.map((l) => (
                    <div key={l.label} className="min-w-0">
                      <dt className="text-[10px] text-white/50 truncate">{l.label}</dt>
                      <dd className="text-sm text-white tabular-nums">{l.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD }} />Selling</span>
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: SILVER }} />Looked at, not bought yet</span>
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: FAINT }} />Quiet</span>
                <span className="w-full text-white/45">Bigger star = more revenue · brighter glow = more interest · tap a star for details</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <StarList stars={stars} mode={mode} />
      )}
    </div>
  );
}

function StarList({ stars, mode }: { stars: Star[]; mode: 'shop' | 'studio' }) {
  const sorted = [...stars].sort((a, b) => b.revenue - a.revenue || b.interest - a.interest);
  if (!sorted.length) return <p className="text-sm text-[#8C8680] py-8 text-center">Nothing to list yet.</p>;
  return (
    <div className="border border-[#E5DCCF] bg-white divide-y divide-[#F0EBE0]">
      {sorted.map((s) => (
        <div key={s.key} className="flex items-center gap-3 px-4 py-3">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.sold ? '#B8862F' : s.interest ? '#8A9AAB' : '#C9C3B8' }} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-[#1C1C1A] truncate">{s.name}</p>
            <p className="text-[11px] text-[#8C8680]">
              {s.group} · {mode === 'shop' ? `${num(s.sold)} sold · ${num(s.interest)} visitors` : `${num(s.sold)} booked · ${num(s.interest)} picks`}
            </p>
          </div>
          <span className="text-sm tabular-nums text-[#1C1C1A] shrink-0">{money(s.revenue)}</span>
        </div>
      ))}
    </div>
  );
}
