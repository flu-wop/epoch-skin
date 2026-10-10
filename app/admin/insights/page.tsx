'use client';
// app/admin/insights/page.tsx
// Studio insights: sales from orders/bookings, browsing from site_events,
// the Glow Map, the weekly content planner, and the content playbook.

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell, AdminPage, AdminPageHeader } from '@/components/admin/AdminShell';
import { useAdminSession } from '@/components/admin/useAdminSession';
import type { Insights } from '@/components/admin/insights/types';
import { Overview } from '@/components/admin/insights/Overview';
import { GlowMap } from '@/components/admin/insights/GlowMap';
import { ShopServices } from '@/components/admin/insights/ShopServices';
import { ContentPlanner } from '@/components/admin/insights/ContentPlanner';
import { Playbook } from '@/components/admin/insights/Playbook';
import { Card, CardTitle, Segmented } from '@/components/admin/insights/ui';
import { longDate } from '@/components/admin/insights/format';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'glow', label: 'Glow Map' },
  { id: 'shop', label: 'Shop & Services' },
  { id: 'content', label: 'Content' },
  { id: 'playbook', label: 'Playbook' },
] as const;
type Tab = (typeof TABS)[number]['id'];

const RANGES = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 90, label: '90d' },
  { value: 365, label: '1y' },
];

function InsightsInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { authed, checking, setAuthed } = useAdminSession();
  const tabParam = params.get('tab') as Tab | null;
  const tab: Tab = TABS.some((t) => t.id === tabParam) ? (tabParam as Tab) : 'overview';
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/insights?days=${days}`, { cache: 'no-store' });
      if (res.status === 401) { setAuthed(false); return; }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Could not load insights.');
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load insights.');
    } finally {
      setLoading(false);
    }
  }, [days, setAuthed]);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  if (checking) return <div className="min-h-screen bg-[#FAF7F2]" />;
  if (!authed) return <AdminLoginScreen title="Insights" onSuccess={() => setAuthed(true)} />;

  const setTab = (t: Tab) => router.replace(t === 'overview' ? '/admin/insights' : `/admin/insights?tab=${t}`, { scroll: false });
  const needsData = tab === 'overview' || tab === 'glow' || tab === 'shop';

  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <AdminPageHeader
          eyebrow="Studio"
          title="Insights"
          description={data ? `${longDate(data.range.start)} – ${longDate(data.range.end)}` : 'How the shop, studio, and content are doing'}
          actions={needsData ? (
            <div className="flex items-center gap-2">
              <Segmented label="Date range" value={days} onChange={setDays} options={RANGES} />
              <button onClick={load} disabled={loading} aria-label="Refresh"
                className="w-9 h-9 flex items-center justify-center border border-[#E5DCCF] bg-white text-[#5A5550] hover:border-[#C4974A] disabled:opacity-50">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          ) : undefined}
        />

        <div className="-mx-4 sm:mx-0 mb-6 border-b border-[#E5DCCF]">
          <div role="tablist" aria-label="Insights sections" className="flex gap-5 sm:gap-7 overflow-x-auto no-scrollbar px-4 sm:px-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative pb-3 pt-1 text-sm whitespace-nowrap shrink-0 transition-colors ${
                  tab === t.id ? 'text-[#1C1C1A]' : 'text-[#8C8680] hover:text-[#1C1C1A]'
                }`}
              >
                {t.label}
                {tab === t.id && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#C4974A]" />}
              </button>
            ))}
          </div>
        </div>

        {needsData && data?.trackingSince === null && !loading && (
          <p className="mb-4 text-xs text-[#5A5550] bg-[#F5F0E8] border border-[#E5DCCF] px-4 py-3 leading-relaxed">
            Visitor tracking is live. Sales history is complete; visitor, cart, and time-on-page numbers start counting from today.
          </p>
        )}
        {needsData && data?.trackingSince && data.trackingSince.slice(0, 10) > data.range.start && (
          <p className="mb-4 text-xs text-[#5A5550] bg-[#F5F0E8] border border-[#E5DCCF] px-4 py-3 leading-relaxed">
            Visitor numbers start {longDate(data.trackingSince)}, when tracking went live. Sales cover the full range.
          </p>
        )}

        {needsData && error && (
          <div className="mb-4 p-4 border border-red-200 bg-red-50 text-sm text-red-700 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button onClick={load} className="underline shrink-0">Try again</button>
          </div>
        )}

        {needsData && !data && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" aria-busy>
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-white border border-[#E5DCCF] animate-pulse" />)}
            <div className="col-span-2 lg:col-span-4 h-64 bg-white border border-[#E5DCCF] animate-pulse" />
          </div>
        )}

        <div className={loading && data ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
          {tab === 'overview' && data && <Overview data={data} />}
          {tab === 'glow' && data && (
            <Card className="pb-0 sm:pb-6">
              <CardTitle title="Glow Map" hint="Your catalog as a night sky, one constellation per category." />
              <div className="-mx-4 sm:mx-0">
                <GlowMap products={data.products} services={data.services} />
              </div>
            </Card>
          )}
          {tab === 'shop' && data && <ShopServices data={data} />}
          {tab === 'content' && <ContentPlanner />}
          {tab === 'playbook' && <Playbook catalog={data?.catalog} />}
        </div>
      </AdminPage>
    </AdminShell>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <InsightsInner />
    </Suspense>
  );
}
