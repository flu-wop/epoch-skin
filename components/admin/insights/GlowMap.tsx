'use client';
// components/admin/insights/GlowMap.tsx
// "Glow Map" — every product (or booked service) is a star, grouped into
// constellations by category, floating in deep space.
//   size     = revenue in the selected period
//   halo     = interest (product page visitors / times a service was picked)
//   color    = gold when it sold · silver when people looked but didn't buy · faint when quiet
// Depth: nebula + two starfields + constellations shift at different rates with the
// pointer (or phone tilt on Android), and each constellation drifts on its own.
// All motion stops under prefers-reduced-motion. A list view carries the same data.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { ProductRow, ServiceRow } from './types';
import { money, num, pct, secs } from './format';
import { Segmented } from './ui';

type Star = {
  key: string; name: string; group: string; revenue: number; interest: number; sold: number;
  lines: { label: string; value: string }[]; href?: string;
};

const GOLD = '#F0CD8A';
const SILVER = '#BFD0E2';
const FAINT = '#4F5C55';
const SPACE = '#05080A';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}

function prng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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

// Pointer / tilt parallax → CSS variables --px / --py (−1…1) on the scene root.
function useParallax() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const set = useCallback((x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      root.current?.style.setProperty('--px', x.toFixed(3));
      root.current?.style.setProperty('--py', y.toFixed(3));
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: unknown } | undefined;
    if (!DOE || typeof DOE.requestPermission === 'function') return; // iOS needs a permission prompt — skip
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      set(clamp(e.gamma / 25), clamp((e.beta - 40) / 25));
    };
    window.addEventListener('deviceorientation', onTilt);
    return () => { window.removeEventListener('deviceorientation', onTilt); cancelAnimationFrame(frame.current); };
  }, [set]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => set(0, 0);
  return { root, onPointerMove, onPointerLeave };
}

const depth = (d: number) => ({ ['--depth' as string]: d } as React.CSSProperties);

export function GlowMap({ products, services }: { products: ProductRow[]; services: ServiceRow[] }) {
  const [mode, setMode] = useState<'shop' | 'studio'>('shop');
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selected, setSelected] = useState<string | null>(null);
  const [ref, width] = useWidth<HTMLDivElement>();
  const parallax = useParallax();

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
  const narrow = W < 520;
  const cols = narrow ? 2 : groups.length > 4 ? 3 : Math.max(2, Math.min(3, groups.length));
  const cellW = W / cols;
  const cellH = narrow ? 210 : 240;
  const rows = Math.max(1, Math.ceil(groups.length / cols));
  const H = rows * cellH + 24;

  const placed = groups.map((g, gi) => {
    const col = gi % cols, row = Math.floor(gi / cols);
    // Offset alternate rows a little so the sky doesn't read as a grid.
    const cx = col * cellW + cellW / 2 + (narrow ? 0 : (row % 2 ? 1 : -1) * cellW * 0.06);
    const cy = row * cellH + cellH / 2 + 18 + (hash(g.name + 'y') - 0.5) * 16;
    const maxR = Math.min(cellW, cellH) / 2 - 28;
    const turn = hash(g.name) * Math.PI * 2;
    const pts = g.list.map((s, i) => {
      const r = g.list.length === 1 ? 0 : Math.min(maxR, 18 + (maxR - 14) * Math.sqrt((i + 0.6) / g.list.length));
      const a = turn + i * 2.39996 + (hash(s.key) - 0.5) * 0.5;
      return {
        s,
        x: Math.min(W - 30, Math.max(30, cx + Math.cos(a) * r)),
        y: cy + Math.sin(a) * r * 0.8,
        radius: 2.5 + 9 * Math.sqrt(s.revenue / maxRev),
        halo: s.interest / maxInt,
      };
    });
    const path = [...pts].sort((p, q) => Math.atan2(p.y - cy, p.x - cx) - Math.atan2(q.y - cy, q.x - cx));
    return { g, gi, col, row, cx, cy, pts, path };
  });

  // Starfields, generated a little larger than the sky so drift never shows an edge.
  const field = useMemo(() => {
    const rand = prng(0x9e3779b9);
    const far = Array.from({ length: Math.round((W * H) / 2600) }, () => ({
      x: -0.06 + rand() * 1.12, y: -0.06 + rand() * 1.12, r: 0.3 + rand() * 0.6, o: 0.15 + rand() * 0.4,
    }));
    const near = Array.from({ length: Math.round((W * H) / 14000) }, () => ({
      x: rand(), y: rand(), r: 0.7 + rand() * 0.9, o: 0.35 + rand() * 0.5, d: rand() * 5, warm: rand() > 0.7,
    }));
    return { far, near };
  }, [W, H]);

  const sel = stars.find((s) => s.key === selected) ?? null;
  const switchMode = (m: 'shop' | 'studio') => { setMode(m); setSelected(null); };

  return (
    <div
      ref={parallax.root}
      onPointerMove={view === 'map' ? parallax.onPointerMove : undefined}
      onPointerLeave={parallax.onPointerLeave}
      className="relative overflow-hidden isolate text-white"
      style={{ background: SPACE }}
    >
      {/* Nebula + vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="space-depth absolute -inset-[15%]" style={depth(-5)}>
          <div className="space-nebula absolute inset-0">
            <div className="absolute left-[8%] top-[10%] w-[55%] h-[45%] rounded-full blur-3xl opacity-[0.35]"
              style={{ background: 'radial-gradient(closest-side, #2F5A45, transparent)' }} />
            <div className="absolute right-[5%] top-[35%] w-[45%] h-[50%] rounded-full blur-3xl opacity-[0.22]"
              style={{ background: 'radial-gradient(closest-side, #8A6A34, transparent)' }} />
            <div className="absolute left-[30%] bottom-[0%] w-[50%] h-[40%] rounded-full blur-3xl opacity-[0.25]"
              style={{ background: 'radial-gradient(closest-side, #2A4660, transparent)' }} />
          </div>
        </div>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 45%, ${SPACE} 100%)` }} />
      </div>

      {/* Header */}
      <div className="relative flex flex-wrap items-end justify-between gap-4 px-4 sm:px-7 pt-6 sm:pt-7">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#F0CD8A]/80 mb-1">Glow Map</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F7EEDC] leading-tight">Your catalog, as a night sky</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Segmented tone="dark" label="Glow Map catalog" value={mode} onChange={switchMode}
            options={[{ value: 'shop', label: 'Shop' }, { value: 'studio', label: 'Studio' }]} />
          <Segmented tone="dark" label="Glow Map view" value={view} onChange={setView}
            options={[{ value: 'map', label: 'Map' }, { value: 'list', label: 'List' }]} />
        </div>
      </div>

      {view === 'map' ? (
        <>
          <div ref={ref} className="relative w-full mt-2">
            {stars.length === 0 ? (
              <div className="py-28 px-6 text-center">
                <p className="font-serif text-xl text-[#F7EEDC] mb-2">The sky is quiet</p>
                <p className="text-sm text-white/55 max-w-xs mx-auto">
                  {mode === 'studio' ? 'Services appear here once they’re booked or picked on the booking page.' : 'No products to show yet.'}
                </p>
              </div>
            ) : width > 0 && (
              <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block overflow-visible" onClick={() => setSelected(null)}>
                <defs>
                  <radialGradient id="halo-gold"><stop offset="0%" stopColor={GOLD} stopOpacity="0.6" /><stop offset="45%" stopColor={GOLD} stopOpacity="0.18" /><stop offset="100%" stopColor={GOLD} stopOpacity="0" /></radialGradient>
                  <radialGradient id="halo-silver"><stop offset="0%" stopColor={SILVER} stopOpacity="0.5" /><stop offset="45%" stopColor={SILVER} stopOpacity="0.14" /><stop offset="100%" stopColor={SILVER} stopOpacity="0" /></radialGradient>
                  <radialGradient id="core-gold" cx="40%" cy="38%"><stop offset="0%" stopColor="#FFF8E6" /><stop offset="55%" stopColor={GOLD} /><stop offset="100%" stopColor="#C9973F" /></radialGradient>
                  <radialGradient id="core-silver" cx="40%" cy="38%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="60%" stopColor={SILVER} /><stop offset="100%" stopColor="#8DA2B8" /></radialGradient>
                  <linearGradient id="shoot" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fff" stopOpacity="0.9" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></linearGradient>
                </defs>

                {/* Far starfield — slowest */}
                <g className="space-depth" style={depth(-4)} aria-hidden>
                  <g className="space-drift">
                    {field.far.map((b, i) => <circle key={i} cx={b.x * W} cy={b.y * H} r={b.r} fill="#fff" opacity={b.o} />)}
                  </g>
                </g>

                {/* Near starfield — twinkles */}
                <g className="space-depth" style={depth(-9)} aria-hidden>
                  {field.near.map((b, i) => (
                    <circle key={i} cx={b.x * W} cy={b.y * H} r={b.r} fill={b.warm ? '#FBE7C2' : '#fff'}
                      className="space-shimmer" style={{ ['--o' as string]: b.o, opacity: b.o, animationDelay: `${-b.d}s`, animationDuration: `${4 + b.d}s` } as React.CSSProperties} />
                  ))}
                </g>

                {/* Shooting stars */}
                <g aria-hidden>
                  <line x1={W * 0.78} y1={H * 0.06} x2={W * 0.78 + 70} y2={H * 0.06 - 38} stroke="url(#shoot)" strokeWidth="1.2" strokeLinecap="round"
                    className="space-shoot" style={{ animationDelay: '3s', opacity: 0 }} />
                  <line x1={W * 0.42} y1={H * 0.02} x2={W * 0.42 + 55} y2={H * 0.02 - 30} stroke="url(#shoot)" strokeWidth="1" strokeLinecap="round"
                    className="space-shoot" style={{ animationDelay: '9.5s', animationDuration: '17s', opacity: 0 }} />
                </g>

                {/* Constellations — nearest layer, each floating on its own rhythm */}
                {placed.map(({ g, gi, col, cx, cy, path, pts }) => (
                  <g key={g.name} className="space-depth" style={depth(-14 - (gi % 3) * 4)}>
                    <g className="space-float" style={{ animationDuration: `${8 + hash(g.name) * 6}s`, animationDelay: `${-hash(g.name + 'd') * 10}s` }}>
                      <text x={cx} y={cy - Math.min(cellW, cellH) / 2 + 14} textAnchor="middle" className="fill-[#F7EEDC]/55"
                        style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                        {g.name}
                      </text>
                      {path.length > 1 && (
                        <polyline points={path.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#F7EEDC" strokeOpacity="0.16" strokeWidth="0.8" />
                      )}

                      {pts.map((p, i) => {
                        const state = p.s.sold > 0 ? 'gold' : p.s.interest > 0 ? 'silver' : 'faint';
                        const isSel = selected === p.s.key;
                        const showLabel = isSel || (i === 0 && p.s.revenue > 0);
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
                            className="space-star cursor-pointer outline-none"
                            onClick={(e) => { e.stopPropagation(); setSelected(isSel ? null : p.s.key); }}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(isSel ? null : p.s.key); } }}
                          >
                            {state !== 'faint' && (
                              <circle cx={p.x} cy={p.y} r={p.radius * 2.4 + 12 + p.halo * 22} fill={`url(#halo-${state})`}
                                className="glow-twinkle" style={{ animationDelay: `${hash(p.s.key) * 4}s`, opacity: 0.4 + p.halo * 0.6 }} />
                            )}
                            <circle cx={p.x} cy={p.y} r={Math.max(p.radius + 10, 18)} fill="transparent" />
                            {isSel && (
                              <>
                                <circle cx={p.x} cy={p.y} r={p.radius + 7} fill="none" stroke="#F7EEDC" strokeWidth="1" className="space-pulse" />
                                <circle cx={p.x} cy={p.y} r={p.radius + 4} fill="none" stroke="#F7EEDC" strokeWidth="0.8" strokeOpacity="0.9" />
                              </>
                            )}
                            <circle
                              cx={p.x} cy={p.y} r={p.radius}
                              fill={state === 'faint' ? FAINT : `url(#core-${state})`}
                              className="space-star-core"
                            />
                            {showLabel && (
                              <text x={lx} y={p.y + p.radius + 16} textAnchor="middle"
                                style={{ fontSize: 11, paintOrder: 'stroke', stroke: SPACE, strokeWidth: 3, strokeLinejoin: 'round', strokeOpacity: 0.85 }}
                                className={isSel ? 'fill-white' : 'fill-white/80'}>
                                {label}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  </g>
                ))}
              </svg>
            )}
          </div>

          {/* Details — a glass panel at the bottom of the sky */}
          <div className="relative mx-3 sm:mx-6 mb-3 sm:mb-6 border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 sm:px-5 py-4 min-h-[88px]">
            {sel ? (
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#F0CD8A]/80">{sel.group}</p>
                    <p className="font-serif text-lg text-white leading-snug">{sel.name}</p>
                  </div>
                  {sel.href && (
                    <Link href={sel.href} target="_blank" className="text-[11px] text-[#F0CD8A] hover:underline shrink-0 mt-1">View page ↗</Link>
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
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />Selling</span>
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: SILVER, boxShadow: `0 0 8px ${SILVER}` }} />Looked at, not bought yet</span>
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: FAINT }} />Quiet</span>
                <span className="w-full text-white/45">Bigger star = more revenue · brighter glow = more interest · tap a star for details</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="relative px-3 sm:px-6 pt-4 pb-3 sm:pb-6">
          <StarList stars={stars} mode={mode} />
        </div>
      )}
    </div>
  );
}

function StarList({ stars, mode }: { stars: Star[]; mode: 'shop' | 'studio' }) {
  const sorted = [...stars].sort((a, b) => b.revenue - a.revenue || b.interest - a.interest);
  if (!sorted.length) return <p className="text-sm text-white/60 py-8 text-center">Nothing to list yet.</p>;
  return (
    <div className="border border-white/10 bg-white/[0.04] backdrop-blur-md divide-y divide-white/[0.08]">
      {sorted.map((s) => (
        <div key={s.key} className="flex items-center gap-3 px-4 py-3">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.sold ? GOLD : s.interest ? SILVER : FAINT }} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white truncate">{s.name}</p>
            <p className="text-[11px] text-white/50">
              {s.group} · {mode === 'shop' ? `${num(s.sold)} sold · ${num(s.interest)} visitors` : `${num(s.sold)} booked · ${num(s.interest)} picks`}
            </p>
          </div>
          <span className="text-sm tabular-nums text-white shrink-0">{money(s.revenue)}</span>
        </div>
      ))}
    </div>
  );
}
