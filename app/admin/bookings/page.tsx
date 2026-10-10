'use client';
// app/admin/bookings/page.tsx
// Admin dashboard for viewing all Epoch Skin bookings from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).
// The password is verified server-side only — never shipped to the client.
// Mobile: bookings render as cards; the sortable table is shown from sm up.

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, RefreshCw, Search, CalendarPlus, X, Phone, Mail } from 'lucide-react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell, AdminPage, AdminPageHeader, adminBtn } from '@/components/admin/AdminShell';
import { Segmented } from '@/components/admin/insights/ui';
import { money, time12 } from '@/components/admin/insights/format';
import { parseTimeToMinutes, TIME_SLOTS } from '@/lib/availability-shared';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  category: string | null;
  price: number | null;
  date: string;
  time: string;
  duration: number | null;
  notes: string | null;
  discount_code: string | null;
  payment_method: string | null;
  created_at: string;
}

const emptyForm = {
  name: '', email: '', phone: '', service: '', category: '',
  price: '', date: '', time: '', duration: '60', notes: '',
  paymentMethod: 'square',
};

const inputCls = 'w-full h-11 px-3 border border-[#E5DCCF] bg-white text-sm focus:outline-none focus:border-[#C4974A]';
const labelCls = 'block text-[10px] tracking-[0.16em] uppercase text-[#8C8680] mb-1';

type View = 'upcoming' | 'past' | 'all';

function todayLocal() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
}
const fmtDate = (d: string) =>
  new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

function BookingsInner() {
  const params = useSearchParams();
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [bookings, setBookings]     = useState<Booking[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [view, setView]             = useState<View>('upcoming');
  const [sortKey, setSortKey]       = useState<keyof Booking>('date');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm]             = useState(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [saveError, setSaveError]   = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load bookings');
      setBookings(data.bookings ?? []);
      setAuthed(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  // On mount: an existing session cookie (up to 8h) means no re-login needed.
  useEffect(() => {
    fetchBookings();
    if (params.get('add') === '1') setShowAddModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showAddModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowAddModal(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [showAddModal]);

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save booking.');
      setForm(emptyForm);
      setShowAddModal(false);
      await fetchBookings();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleSort = (key: keyof Booking) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const changeView = (v: View) => {
    setView(v);
    setSortKey('date');
    setSortDir(v === 'upcoming' ? 'asc' : 'desc');
  };

  const today = todayLocal();
  const filtered = bookings
    .filter(b => (view === 'upcoming' ? b.date >= today : view === 'past' ? b.date < today : true))
    .filter(b => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.date.includes(q)
      );
    })
    .sort((a, b) => {
      let cmp: number;
      if (sortKey === 'date') {
        cmp = a.date.localeCompare(b.date) || (parseTimeToMinutes(a.time) ?? 0) - (parseTimeToMinutes(b.time) ?? 0);
      } else if (sortKey === 'price') {
        cmp = (a.price ?? 0) - (b.price ?? 0);
      } else {
        cmp = String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''));
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.price ?? 0), 0);
  const thisMonth = bookings.filter(b => b.date.startsWith(today.slice(0, 7))).length;

  const SortIcon = ({ col }: { col: keyof Booking }) => (
    <span className="ml-1 text-[#C4974A] opacity-70">
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  const PayTag = ({ b }: { b: Booking }) =>
    b.payment_method && b.payment_method !== 'stripe' ? (
      <span className="inline-block text-[9px] tracking-wide uppercase bg-[#F0EBE0] text-[#5A5550] px-1.5 py-0.5">
        {b.payment_method === 'square' ? 'In-person · Square' : b.payment_method}
      </span>
    ) : null;

  // ── Checking for existing session ───────────────────────────────
  if (checkingSession) {
    return <div className="min-h-screen bg-[#FAF7F2]" />;
  }

  // ── Login screen ────────────────────────────────────────────────
  if (!authed) {
    return <AdminLoginScreen title="Bookings" onSuccess={fetchBookings} />;
  }

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <AdminPageHeader
          title="Bookings"
          actions={
            <>
              <button onClick={() => { setForm(emptyForm); setSaveError(''); setShowAddModal(true); }} className={adminBtn.primary}>
                <Plus className="w-3.5 h-3.5" /> Add booking
              </button>
              <a href="/api/calendar.ics" target="_blank" className={adminBtn.secondary}>
                <CalendarPlus className="w-3.5 h-3.5" /> iCal
              </a>
              <button onClick={fetchBookings} disabled={loading} className={`${adminBtn.secondary} px-3`} aria-label="Refresh">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </>
          }
        />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          {[
            { label: view === 'upcoming' ? 'Upcoming' : view === 'past' ? 'Past' : 'Bookings', value: String(filtered.length) },
            { label: 'Revenue', value: money(totalRevenue) },
            { label: 'This month', value: String(thisMonth) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E5DCCF] px-3 py-3 sm:p-5 min-w-0">
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#8C8680] mb-1.5 truncate">{label}</p>
              <p className="font-serif text-xl sm:text-3xl text-[#1C1C1A] leading-none truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <Segmented label="Show bookings" value={view} onChange={changeView}
            options={[{ value: 'upcoming', label: 'Upcoming' }, { value: 'past', label: 'Past' }, { value: 'all', label: 'All' }]} />
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8680]" aria-hidden />
            <input
              type="search"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search name, email, service, date"
              aria-label="Search bookings"
              className="w-full h-10 pl-9 pr-3 border border-[#E5DCCF] bg-white text-sm focus:outline-none focus:border-[#C4974A]"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {loading && bookings.length === 0 ? (
          <div className="h-64 bg-white border border-[#E5DCCF] animate-pulse" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-14 px-5 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-xl sm:text-2xl text-[#1C1C1A] mb-2">
              {filter ? 'No matches' : view === 'upcoming' ? 'No upcoming bookings' : 'No bookings yet'}
            </p>
            <p className="text-[#8C8680] text-sm">
              {filter ? 'Try a different search.' : 'Bookings appear here once clients book online or you add one.'}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <ul className="sm:hidden bg-white border border-[#E5DCCF] divide-y divide-[#F0EBE0]">
              {filtered.map((b) => (
                <li key={b.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`text-[11px] ${b.date === today ? 'text-[#A87C30] font-medium' : 'text-[#8C8680]'}`}>
                        {b.date === today ? 'Today' : fmtDate(b.date)} · {time12(b.time)}{b.duration ? ` · ${b.duration} min` : ''}
                      </p>
                      <p className="text-sm font-medium text-[#1C1C1A] mt-0.5">{b.name}</p>
                      <p className="text-sm text-[#5A5550]">{b.service}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-[#1C1C1A] tabular-nums">{b.price != null ? money(b.price, true) : '—'}</p>
                      {b.discount_code && <p className="text-[10px] text-[#8C8680]">{b.discount_code}</p>}
                    </div>
                  </div>
                  {b.notes && <p className="text-xs text-[#8C8680] mt-1.5 line-clamp-2">{b.notes}</p>}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
                    {b.phone && (
                      <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-xs text-[#A87C30]"><Phone className="w-3 h-3" />{b.phone}</a>
                    )}
                    {b.email && (
                      <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1 text-xs text-[#A87C30] min-w-0 truncate"><Mail className="w-3 h-3 shrink-0" />{b.email}</a>
                    )}
                    <PayTag b={b} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Table (sm and up) */}
            <div className="hidden sm:block bg-white border border-[#E5DCCF] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5DCCF]">
                    {([
                      ['date',    'Date'],
                      ['name',    'Client'],
                      ['service', 'Service'],
                      ['price',   'Price'],
                      ['phone',   'Phone'],
                    ] as [keyof Booking, string][]).map(([key, label]) => (
                      <th key={key} className="text-left px-4 lg:px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#8C8680]">
                        <button onClick={() => handleSort(key)} className="uppercase tracking-[0.2em] hover:text-[#A87C30] transition-colors">
                          {label}<SortIcon col={key} />
                        </button>
                      </th>
                    ))}
                    <th className="text-left px-4 lg:px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#8C8680]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-[#F0EBE0] last:border-0 hover:bg-[#FEF9F2] transition-colors align-top">
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] whitespace-nowrap">
                        {fmtDate(b.date)}
                        <span className="block text-xs text-[#8C8680]">
                          {time12(b.time)}{b.duration ? ` · ${b.duration} min` : ''}
                          {b.date === today && <span className="ml-1.5 text-[9px] tracking-wide uppercase bg-[#EBF5EF] text-[#2E7049] px-1.5 py-0.5">Today</span>}
                        </span>
                      </td>
                      <td className="px-4 lg:px-5 py-4">
                        <p className="text-[#1C1C1A] font-medium">{b.name}</p>
                        <a href={`mailto:${b.email}`} className="text-[#A87C30] text-xs hover:underline break-all">{b.email}</a>
                      </td>
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] min-w-[160px]">{b.service}</td>
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] whitespace-nowrap tabular-nums">
                        {b.price != null ? money(b.price, true) : '—'}
                        {b.discount_code && <span className="block text-[#8C8680] text-[10px] mt-0.5">{b.discount_code}</span>}
                        <span className="block mt-1"><PayTag b={b} /></span>
                      </td>
                      <td className="px-4 lg:px-5 py-4 text-[#5A5550] whitespace-nowrap">
                        {b.phone ? <a href={`tel:${b.phone}`} className="hover:text-[#A87C30] transition-colors">{b.phone}</a> : '—'}
                      </td>
                      <td className="px-4 lg:px-5 py-4 text-[#8C8680] text-xs max-w-[220px]">{b.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* iCal instructions */}
        <div className="mt-8 p-4 sm:p-5 bg-[#F5F0E8] border border-[#E5DCCF]">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#A87C30] mb-2">Live calendar feed</p>
          <p className="text-xs text-[#5A5550] mb-3">
            Subscribe to this URL in iCal, Google Calendar, or any calendar app to see all bookings in real time.
          </p>
          <code className="text-xs bg-white block p-3 border border-[#E5DCCF] text-[#1C1C1A] break-all">
            {typeof window !== 'undefined' ? window.location.origin : 'https://epoch-skin.com'}/api/calendar.ics
          </code>
          <p className="text-[10px] text-[#8C8680] mt-2">
            In iCal: File → New Calendar Subscription → paste URL above
          </p>
        </div>
      </AdminPage>

      {/* Add Booking — bottom sheet on phones, dialog on larger screens */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center sm:px-5 z-50" onClick={() => setShowAddModal(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-booking-title"
            className="bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-7 border border-[#E5DCCF] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 id="add-booking-title" className="font-serif text-xl sm:text-2xl text-[#1C1C1A]">Add in-person booking</h2>
              <button onClick={() => setShowAddModal(false)} aria-label="Close" className="w-9 h-9 -mr-2 flex items-center justify-center text-[#8C8680] hover:text-[#1C1C1A]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8C8680] mb-5 leading-relaxed">
              Log a booking already paid in person (Square reader, cash, etc.). This won&apos;t charge anything — it just blocks the slot and adds it to the calendar feed.
            </p>
            <form onSubmit={handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="ab-name">Client name</label>
                  <input id="ab-name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-email">Email <span className="normal-case tracking-normal">(optional)</span></label>
                  <input id="ab-email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-phone">Phone <span className="normal-case tracking-normal">(optional)</span></label>
                  <input id="ab-phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="ab-service">Service</label>
                  <input id="ab-service" required placeholder="e.g. 60 Min Full Body Massage" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-date">Date</label>
                  <input id="ab-date" required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-time">Time</label>
                  <select id="ab-time" required value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={inputCls}>
                    <option value="" disabled>Choose a time</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-price">Price ($)</label>
                  <input id="ab-price" type="number" inputMode="decimal" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-duration">Duration (min)</label>
                  <input id="ab-duration" type="number" inputMode="numeric" min="0" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-category">Category <span className="normal-case tracking-normal">(optional)</span></label>
                  <input id="ab-category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ab-pay">Paid with</label>
                  <select id="ab-pay" value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))} className={inputCls}>
                    <option value="square">Square (in-person)</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="ab-notes">Notes <span className="normal-case tracking-normal">(optional)</span></label>
                  <textarea id="ab-notes" value={form.notes} rows={2} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-[#E5DCCF] text-sm focus:outline-none focus:border-[#C4974A] resize-none" />
                </div>
              </div>
              {saveError && <p className="text-red-600 text-xs">{saveError}</p>}
              <button type="submit" disabled={saving} className={`${adminBtn.primary} w-full h-12`}>
                {saving ? 'Saving…' : 'Save booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <BookingsInner />
    </Suspense>
  );
}
