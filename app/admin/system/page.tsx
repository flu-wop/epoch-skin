'use client';
// app/admin/system/page.tsx
// "Is everything actually working?" Env vars, webhook and integration health,
// and usage. Reads /api/admin/health; refreshes itself every 60 seconds.

import { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell, AdminPage, AdminPageHeader } from '@/components/admin/AdminShell';
import { useAdminSession } from '@/components/admin/useAdminSession';
import { Card, CardTitle } from '@/components/admin/insights/ui';

type Status = 'ok' | 'warn' | 'error';
type Check = { status: Status; detail: string };
type Health = {
  envVars: (Check & { name: string; group: string })[];
  webhookHealth: Record<string, Check>;
  apiUsage: Check;
  checkedAt: string;
};

const COLOR: Record<Status, string> = { ok: '#2E7049', warn: '#B8862F', error: '#A3452A' };
const LABEL: Record<Status, string> = { ok: 'OK', warn: 'Check', error: 'Problem' };
const WEBHOOK_LABELS: Record<string, string> = {
  stripe: 'Stripe webhook', lastSale: 'Last paid order or booking', resend: 'Resend email', turso: 'Turso database',
};

function Pill({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase shrink-0" style={{ color: COLOR[status] }}>
      <span className="w-2 h-2 rounded-full" style={{ background: COLOR[status] }} aria-hidden />
      {LABEL[status]}
    </span>
  );
}

function Row({ label, check }: { label: string; check: Check }) {
  return (
    <li className="flex items-start justify-between gap-4 py-2.5 border-b border-[#F0EBE0] last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-[#1C1C1A]">{label}</p>
        <p className="text-xs text-[#8C8680] mt-0.5 leading-relaxed break-words">{check.detail}</p>
      </div>
      <Pill status={check.status} />
    </li>
  );
}

export default function AdminSystemPage() {
  const { authed, checking, setAuthed } = useAdminSession();
  const [data, setData] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/health', { cache: 'no-store' });
      if (res.status === 401) { setAuthed(false); return; }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Could not run the checks.');
      setData(json);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not run the checks.');
    } finally {
      setLoading(false);
    }
  }, [setAuthed]);

  useEffect(() => {
    if (!authed) return;
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, [authed, load]);

  if (checking) return <div className="min-h-screen bg-[#FAF7F2]" />;
  if (!authed) return <AdminLoginScreen title="System" onSuccess={() => setAuthed(true)} />;

  const all: Check[] = data ? [...data.envVars, ...Object.values(data.webhookHealth), data.apiUsage] : [];
  const problems = all.filter((c) => c.status === 'error').length;
  const warnings = all.filter((c) => c.status === 'warn').length;
  const groups = data ? [...new Set(data.envVars.map((v) => v.group))] : [];
  const missing = data ? data.envVars.filter((v) => v.status === 'error').length : 0;

  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <AdminPageHeader
          eyebrow="Admin"
          title="System"
          description={data ? `Last checked ${new Date(data.checkedAt).toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })}. Refreshes every minute.` : 'Is everything actually working?'}
          actions={
            <button onClick={load} disabled={loading} aria-label="Run checks again"
              className="w-9 h-9 flex items-center justify-center border border-[#E5DCCF] bg-white text-[#5A5550] hover:border-[#C4974A] disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          }
        />

        {error && (
          <div className="mb-4 p-4 border border-red-200 bg-red-50 text-sm text-red-700 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button onClick={load} className="underline shrink-0">Try again</button>
          </div>
        )}

        {!data && !error && (
          <div className="grid gap-4 lg:grid-cols-2" aria-busy>
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-48 bg-white border border-[#E5DCCF] animate-pulse" />)}
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-xl text-[#1C1C1A]">
                    {problems ? `${problems} problem${problems === 1 ? '' : 's'} to fix` : warnings ? 'Working, with a few things to look at' : 'Everything is working'}
                  </p>
                  <p className="text-xs text-[#8C8680] mt-1">
                    {missing ? `${missing} environment variable${missing === 1 ? ' is' : 's are'} missing in Vercel.` : 'All environment variables are set.'}
                  </p>
                </div>
                <Pill status={problems ? 'error' : warnings ? 'warn' : 'ok'} />
              </div>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2 items-start">
              <Card>
                <CardTitle title="Webhooks and integrations" hint="Stripe, email, and the database, checked live." />
                <ul>
                  {Object.entries(data.webhookHealth).map(([k, c]) => <Row key={k} label={WEBHOOK_LABELS[k] ?? k} check={c} />)}
                </ul>
              </Card>

              <Card>
                <CardTitle title="Usage, last 30 days" hint="Volume to watch before a plan limit gets hit." />
                <Row label="Activity" check={data.apiUsage} />
              </Card>
            </div>

            <Card>
              <CardTitle title="Environment variables" hint="Shows whether each one is set in Vercel. Values are never shown." />
              <div className="grid gap-x-8 lg:grid-cols-2">
                {groups.map((g) => (
                  <div key={g} className="mb-4 min-w-0">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#8C8680] mb-1">{g}</p>
                    <ul>
                      {data.envVars.filter((v) => v.group === g).map((v) => (
                        <li key={v.name} className="flex items-center justify-between gap-4 py-1.5 border-b border-[#F0EBE0] last:border-0">
                          <code className="text-xs text-[#1C1C1A] truncate">{v.name}</code>
                          <Pill status={v.status} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </AdminPage>
    </AdminShell>
  );
}
