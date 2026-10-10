'use client';
// components/admin/insights/Overview.tsx

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import type { Insights } from './types';
import { money, num, pct, SHOP, STUDIO } from './format';
import { Card, CardTitle, ColumnChart, Legend, Stat, Empty } from './ui';

function highlights(d: Insights): { text: string; href?: string }[] {
  const out: { text: string; href?: string }[] = [];
  const prods = d.products.filter((p) => p.id);
  const top = [...prods].sort((a, b) => b.revenue - a.revenue)[0];
  if (top && top.revenue > 0) out.push({ text: `${top.name} is your top seller — ${money(top.revenue)} from ${num(top.sold)} sold.` });
  const looked = [...prods].filter((p) => p.views >= 5 && p.sold === 0).sort((a, b) => b.views - a.views)[0];
  if (looked) out.push({ text: `${looked.name} had ${num(looked.views)} visitors but no sales — worth a Before / After or a Tip post.` });
  const svc = d.services.find((s) => s.revenue > 0);
  if (svc) out.push({ text: `${svc.name} leads the studio at ${money(svc.revenue)} across ${num(svc.booked)} bookings.` });
  if (d.abandoned.sessions > 0) {
    const item = d.abandoned.items[0]?.item;
    out.push({ text: `${num(d.abandoned.sessions)} cart${d.abandoned.sessions === 1 ? ' was' : 's were'} left before checkout${item ? ` — most often with ${item}` : ''}.` });
  }
  const picked = d.services.filter((s) => s.selects >= 3 && s.booked === 0).sort((a, b) => b.selects - a.selects)[0];
  if (picked) out.push({ text: `${picked.name} was picked ${num(picked.selects)} times on the booking page but never booked.` });
  return out.slice(0, 4);
}

export function Overview({ data }: { data: Insights }) {
  const k = data.kpis;
  const totalSales = k.orders + k.bookings;
  const notes = highlights(data);
  const hasVisits = data.daily.some((d) => d.visitors > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="col-span-2 lg:col-span-1">
          <Stat label="Revenue" value={money(k.revenue)} cur={k.revenue} prev={k.revenuePrev}
            sub={`${money(k.shopRevenue)} shop · ${money(k.studioRevenue)} studio`} />
        </div>
        <Stat label="Bookings" value={num(k.bookings)} cur={k.bookings} prev={k.bookingsPrev} />
        <Stat label="Shop orders" value={num(k.orders)} cur={k.orders} prev={k.ordersPrev} />
        <Stat label="Average sale" value={money(k.avgSale)} cur={k.avgSale} prev={k.avgSalePrev} />
        <Stat label="Visitors" value={num(k.visitors)} cur={k.visitorsPrev ? k.visitors : undefined} prev={k.visitorsPrev || undefined}
          sub={k.visitors ? `${pct(totalSales, k.visitors)} bought` : undefined} />
      </div>

      <Card>
        <CardTitle title="Revenue" hint="Paid shop orders and studio bookings, by the day they were paid."
          right={<Legend items={[{ label: 'Shop', color: SHOP }, { label: 'Studio', color: STUDIO }]} />} />
        {k.revenue > 0 ? (
          <ColumnChart rows={data.daily} series={[{ key: 'shop', label: 'Shop', color: SHOP }, { key: 'studio', label: 'Studio', color: STUDIO }]} />
        ) : (
          <Empty>No paid orders or bookings in this period.</Empty>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle title="Visitors" hint="People browsing the site each day." />
          {hasVisits ? (
            <ColumnChart rows={data.daily} series={[{ key: 'visitors', label: 'Visitors', color: '#5F6F5A' }]} format="count" height={140} />
          ) : (
            <Empty>Visitor tracking just went live. Browsing numbers will start filling in as people visit the site.</Empty>
          )}
        </Card>

        <Card>
          <CardTitle title="What stands out" />
          {notes.length ? (
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n.text} className="flex gap-3 text-sm text-[#1C1C1A] leading-relaxed">
                  <Sparkles className="w-4 h-4 text-[#B8862F] shrink-0 mt-0.5" aria-hidden />
                  <span>{n.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Highlights show up here once there’s activity in this period.</Empty>
          )}
          <Link href="/admin/insights?tab=glow" className="mt-5 inline-block text-[11px] tracking-[0.18em] uppercase text-[#A87C30] hover:underline">
            See it on the Glow Map →
          </Link>
        </Card>
      </div>
    </div>
  );
}
