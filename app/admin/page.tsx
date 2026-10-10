'use client';
// app/admin/page.tsx
// Admin home — login gate, a quick read on the last 30 days, upcoming
// appointments, and shortcuts to every section.
// Uses the same httpOnly session cookie as every /admin page
// (see lib/admin-auth.ts). /admin/sync has its own separate SYNC_SECRET,
// entered on that page directly, by design (higher-friction for a
// destructive/rare action).

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell, AdminPage, ADMIN_SECTIONS, adminBtn } from '@/components/admin/AdminShell';
import { useAdminSession } from '@/components/admin/useAdminSession';
import type { Insights } from '@/components/admin/insights/types';
import { money, num, longDate, time12 } from '@/components/admin/insights/format';
import { Stat } from '@/components/admin/insights/ui';

const DESCRIPTIONS: Record<string, string> = {
  '/admin/insights': 'Sales, visitors, Glow Map & content plan',
  '/admin/bookings': 'Appointments & in-person entries',
  '/admin/orders': 'Paid shop orders',
  '/admin/newsletter': 'Subscribers & issues',
  '/admin/contact': 'Contact form messages',
  '/admin/sync': 'Push catalog to Stripe & Square',
};

function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Chicago' }).format(new Date()));
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export default function AdminHomePage() {
  const { authed, checking, setAuthed } = useAdminSession();
  const [data, setData] = useState<Insights | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/admin/insights?days=30', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true));
  }, [authed]);

  if (checking) return <div className="min-h-screen bg-[#FAF7F2]" />;
  if (!authed) return <AdminLoginScreen title="Admin" onSuccess={() => setAuthed(true)} />;

  const k = data?.kpis;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());

  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] tracking-[0.26em] uppercase text-[#A87C30] mb-1.5">{longDate(today)}</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] leading-tight">{greeting()}, Kayla</h1>
        </div>

        <section aria-label="Last 30 days" className="mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680]">Last 30 days</h2>
            <Link href="/admin/insights" className="text-xs text-[#A87C30] hover:underline inline-flex items-center gap-1">
              All insights <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {k ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Stat label="Revenue" value={money(k.revenue)} cur={k.revenue} prev={k.revenuePrev} sub="vs prior 30d" />
              <Stat label="Bookings" value={num(k.bookings)} cur={k.bookings} prev={k.bookingsPrev} />
              <Stat label="Shop orders" value={num(k.orders)} cur={k.orders} prev={k.ordersPrev} />
              <Stat label="Visitors" value={num(k.visitors)} cur={k.visitorsPrev ? k.visitors : undefined} prev={k.visitorsPrev || undefined} />
            </div>
          ) : failed ? (
            <p className="text-sm text-[#8C8680] bg-white border border-[#E5DCCF] p-4">Couldn’t load numbers right now. Sections below still work.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[104px] bg-white border border-[#E5DCCF] animate-pulse" />)}
            </div>
          )}
        </section>

        <div className="grid gap-8 lg:gap-6 lg:grid-cols-[1.1fr_1fr]">
          <section aria-label="Upcoming appointments">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680]">Coming up</h2>
              <Link href="/admin/bookings?add=1" className="text-xs text-[#A87C30] hover:underline inline-flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add booking
              </Link>
            </div>
            <div className="bg-white border border-[#E5DCCF]">
              {!data && !failed ? (
                <div className="h-40 animate-pulse" />
              ) : !data?.upcoming.length ? (
                <div className="p-6 text-center">
                  <p className="font-serif text-lg text-[#1C1C1A] mb-1">Nothing on the books yet</p>
                  <p className="text-sm text-[#8C8680]">New appointments will show up here.</p>
                </div>
              ) : (
                <ul className="divide-y divide-[#F0EBE0]">
                  {data.upcoming.map((b) => (
                    <li key={b.id} className="flex gap-4 px-4 sm:px-5 py-3.5">
                      <div className="w-16 shrink-0">
                        <p className={`text-[10px] tracking-[0.14em] uppercase ${b.date === today ? 'text-[#A87C30] font-medium' : 'text-[#8C8680]'}`}>
                          {b.date === today ? 'Today' : longDate(b.date).split(',')[0]}
                        </p>
                        <p className="text-sm text-[#1C1C1A] tabular-nums whitespace-nowrap">{time12(b.time)}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#1C1C1A] font-medium truncate">{b.name}</p>
                        <p className="text-xs text-[#5A5550] truncate">{b.service}</p>
                        <p className="text-[11px] text-[#8C8680] truncate">
                          {b.date !== today && `${longDate(b.date)} · `}{b.duration ? `${b.duration} min · ` : ''}{money(b.price)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/admin/bookings" className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-[#E5DCCF] text-xs text-[#5A5550] hover:text-[#1C1C1A]">
                All bookings <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          <section aria-label="Sections">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680] mb-3">Go to</h2>
            <div className="grid grid-cols-2 gap-3">
              {ADMIN_SECTIONS.filter((s) => s.href !== '/admin').map(({ href, label, icon: Icon }) => {
                const hero = href === '/admin/insights';
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group border p-4 transition-colors min-w-0 ${
                      hero ? 'col-span-2 bg-[#3E4A3C] border-[#3E4A3C] hover:border-[#C4974A]' : 'bg-white border-[#E5DCCF] hover:border-[#C4974A]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-3 ${hero ? 'text-[#E9C47E]' : 'text-[#A87C30]'}`} strokeWidth={1.6} />
                    <p className={`font-serif text-lg leading-tight ${hero ? 'text-[#F2E6C8]' : 'text-[#1C1C1A]'}`}>{label}</p>
                    <p className={`text-xs mt-1 leading-snug ${hero ? 'text-[#F2E6C8]/70' : 'text-[#8C8680]'}`}>{DESCRIPTIONS[href]}</p>
                  </Link>
                );
              })}
            </div>
            <Link href="/book" className={`${adminBtn.secondary} w-full mt-3`}>Open the booking page</Link>
          </section>
        </div>
      </AdminPage>
    </AdminShell>
  );
}
