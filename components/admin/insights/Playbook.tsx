'use client';
// components/admin/insights/Playbook.tsx — Kayla's content rules, hashtags, brand card.

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PILLARS, HASHTAGS, BRAND_COLORS } from './content';
import { Card, CardTitle } from './ui';

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
    } catch { /* clipboard blocked */ }
  };
  return { copied, copy };
}

export function Playbook({ catalog }: { catalog?: { products: number; services: number } }) {
  const { copied, copy } = useCopy();
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardTitle title="Content pillars" hint="Aim for 4–6 posts a week. Offers no more than 1 in 5." />
        <ul className="divide-y divide-[#F0EBE0]">
          {PILLARS.filter((p) => p.id > 0).map((p) => (
            <li key={p.id} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
              <span className="text-[#1C1C1A]">{p.label}</span>
              <span className="text-[#8C8680] text-xs text-right">{p.tip}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-[#5A5550] leading-relaxed bg-[#FAF7F2] px-3 py-2.5">
          Captions: sentence case, serif, lower third · CapCut music library only · Export 1080p / 30fps
        </p>
      </Card>

      <Card>
        <CardTitle title="Hashtag blocks" hint="Tap a block to copy it." />
        <div className="space-y-4">
          {HASHTAGS.map((h) => {
            const text = h.tags.join(' ');
            return (
              <button
                key={h.label}
                onClick={() => copy(h.label, text)}
                className="block w-full text-left border border-[#E5DCCF] hover:border-[#C4974A] p-3 transition-colors group"
              >
                <span className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#8C8680]">{h.label}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#A87C30]">
                    {copied === h.label ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {h.tags.map((t) => <span key={t} className="text-xs bg-[#F5F0E8] text-[#5A5550] px-2 py-0.5">{t}</span>)}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <CardTitle title="Brand card" hint="Playfair Display headlines · Inter body · clean, warm, luminous. Tap a color to copy its code." />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BRAND_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => copy(c.hex, c.hex)}
              className="text-left border border-[#E5DCCF] p-3 pt-10 text-xs transition-transform active:scale-[0.98]"
              style={{ background: c.hex, color: c.ink }}
            >
              <span className="block font-medium">{c.name}</span>
              <span className="block opacity-80 tabular-nums">{copied === c.hex ? 'Copied ✓' : c.hex}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#5A5550]">
          <span>kayla@epoch-skin.com</span>
          <span>@epoch_skin</span>
          <span>epoch-skin.com</span>
          {catalog && <span className="text-[#8C8680]">{catalog.products} products · {catalog.services} bookable services (live from the site)</span>}
        </div>
      </Card>
    </div>
  );
}
