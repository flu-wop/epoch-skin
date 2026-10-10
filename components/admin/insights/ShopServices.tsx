'use client';
// components/admin/insights/ShopServices.tsx — products, services, funnels, traffic.

import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { Insights, ProductRow } from './types';
import { money, num, pct, secs, SHOP, STUDIO } from './format';
import { BarList, Card, CardTitle, Empty, Funnel, Segmented } from './ui';

type SortKey = 'revenue' | 'views' | 'carts' | 'avgTime';
const SORTS: { value: SortKey; label: string }[] = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'views', label: 'Visitors' },
  { value: 'carts', label: 'Carts' },
  { value: 'avgTime', label: 'Time' },
];

function ProductTable({ rows }: { rows: ProductRow[] }) {
  const [sort, setSort] = useState<SortKey>('revenue');
  const sorted = [...rows].sort((a, b) => b[sort] - a[sort] || b.revenue - a.revenue);
  return (
    <>
      <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar -mx-1 px-1">
        <span className="text-[11px] text-[#8C8680] shrink-0 inline-flex items-center gap-1"><ArrowDown className="w-3 h-3" />Sort</span>
        <Segmented label="Sort products by" value={sort} onChange={setSort} options={SORTS} />
      </div>

      {/* Mobile: cards */}
      <ul className="sm:hidden divide-y divide-[#F0EBE0] -mx-4 border-y border-[#F0EBE0]">
        {sorted.map((p) => (
          <li key={p.name} className="px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-[#1C1C1A] min-w-0 truncate">{p.name}</p>
              <p className="text-sm tabular-nums text-[#1C1C1A] shrink-0">{money(p.revenue)}</p>
            </div>
            <p className="text-[11px] text-[#8C8680] mt-0.5">
              {num(p.sold)} sold · {num(p.views)} visitors · {num(p.carts)} carts · {secs(p.avgTime)} avg · {pct(p.sold, p.views)} buy
            </p>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5DCCF] text-[10px] tracking-[0.16em] uppercase text-[#8C8680]">
              <th className="text-left font-normal py-2.5 pr-3">Product</th>
              <th className="text-right font-normal py-2.5 px-3">Revenue</th>
              <th className="text-right font-normal py-2.5 px-3">Sold</th>
              <th className="text-right font-normal py-2.5 px-3">Visitors</th>
              <th className="text-right font-normal py-2.5 px-3">Carts</th>
              <th className="text-right font-normal py-2.5 px-3">Avg time</th>
              <th className="text-right font-normal py-2.5 pl-3">Visitor → buyer</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.name} className="border-b border-[#F0EBE0] last:border-0">
                <td className="py-3 pr-3 text-[#1C1C1A]">{p.name}<span className="block text-[11px] text-[#8C8680]">{p.group}</span></td>
                <td className="py-3 px-3 text-right tabular-nums">{money(p.revenue)}</td>
                <td className="py-3 px-3 text-right tabular-nums">{num(p.sold)}</td>
                <td className="py-3 px-3 text-right tabular-nums">{num(p.views)}</td>
                <td className="py-3 px-3 text-right tabular-nums">{num(p.carts)}</td>
                <td className="py-3 px-3 text-right tabular-nums">{secs(p.avgTime)}</td>
                <td className="py-3 pl-3 text-right tabular-nums">{pct(p.sold, p.views)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home', '/shop': 'Shop', '/services': 'Services', '/book': 'Book', '/about': 'About',
  '/contact': 'Contact', '/blog': 'Journal', '/news': 'News', '/cart': 'Cart',
};
function pageName(path: string, products: ProductRow[]) {
  if (PAGE_NAMES[path]) return PAGE_NAMES[path];
  const slug = path.match(/^\/shop\/(.+)/)?.[1];
  if (slug) return products.find((p) => p.slug?.toLowerCase() === decodeURIComponent(slug).toLowerCase())?.name ?? path;
  return path;
}

export function ShopServices({ data }: { data: Insights }) {
  const svcRows = data.services.slice(0, 12);
  const devTotal = Object.values(data.devices).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardTitle title="Products" hint="Visitors and carts are tracked on the site; sales come from paid Stripe orders." />
        <ProductTable rows={data.products} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle title="Shop journey" hint="Unique visitors at each step. % = share of the step above." />
          <Funnel steps={data.funnels.shop} color={SHOP} />
        </Card>
        <Card>
          <CardTitle title="Booking journey" hint="Online bookings only — in-person entries aren’t counted here." />
          <Funnel steps={data.funnels.studio} color={STUDIO} />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle title="Left in the cart" hint={`Added to cart, then left without starting checkout. ${data.abandoned.cartSessions ? `${pct(data.abandoned.sessions, data.abandoned.cartSessions)} of carts.` : ''}`} />
          {data.abandoned.items.length ? (
            <BarList rows={data.abandoned.items.map((a) => ({ label: a.item, value: a.count }))} color={SHOP} />
          ) : <Empty>No abandoned carts in this period.</Empty>}
        </Card>
        <Card>
          <CardTitle title="Services" hint="Revenue from paid bookings, plus how often each was picked online." />
          {svcRows.length ? (
            <BarList
              rows={svcRows.map((s) => ({ label: s.name, value: s.revenue, note: `${num(s.booked)} booked · ${num(s.selects)} picks` }))}
              color={STUDIO}
              format={(v) => money(v)}
            />
          ) : <Empty>No service activity in this period.</Empty>}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle title="Most visited pages" />
          {data.pages.length ? (
            <ul className="divide-y divide-[#F0EBE0]">
              {data.pages.slice(0, 8).map((p) => (
                <li key={p.path} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                  <span className="truncate text-[#1C1C1A]">{pageName(p.path, data.products)}</span>
                  <span className="shrink-0 text-xs text-[#8C8680] tabular-nums">{num(p.views)} · {secs(p.avgTime)}</span>
                </li>
              ))}
            </ul>
          ) : <Empty>No visits recorded yet.</Empty>}
        </Card>
        <Card>
          <CardTitle title="Where visitors come from" hint="Other sites that sent people here." />
          {data.referrers.length ? (
            <BarList rows={data.referrers.map((r) => ({ label: r.host, value: r.visits }))} color="#5F6F5A" />
          ) : <Empty>Mostly direct visits so far.</Empty>}
        </Card>
        <Card>
          <CardTitle title="Devices" />
          {devTotal ? (
            <BarList rows={['mobile', 'desktop', 'tablet'].map((d) => ({ label: d[0].toUpperCase() + d.slice(1), value: data.devices[d] ?? 0, note: pct(data.devices[d] ?? 0, devTotal) }))} color="#5F6F5A" />
          ) : <Empty>No visits recorded yet.</Empty>}
        </Card>
      </div>
    </div>
  );
}
