'use client';
// app/admin/bookings/page.tsx
// Admin dashboard for viewing all Epoch Skin bookings from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).
// The password is verified server-side only — never shipped to the client.

import { useState, useEffect } from 'react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell } from '@/components/admin/AdminShell';

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

export default function AdminBookingsPage() {
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [bookings, setBookings]     = useState<Booking[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [sortKey, setSortKey]       = useState<keyof Booking>('date');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('desc');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const filtered = bookings
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
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.price ?? 0), 0);

  const SortIcon = ({ col }: { col: keyof Booking }) => (
    <span className="ml-1 text-[#C9A96E] opacity-60">
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

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
      <div className="py-12 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-y-4 mb-10">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Admin</p>
              <h1 className="font-serif text-4xl text-[#1C1C1A]">Bookings</h1>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => { setForm(emptyForm); setSaveError(''); setShowAddModal(true); }}
                className="text-[11px] tracking-[0.18em] uppercase font-sans bg-[#3E4A3C] text-[#C4974A]
                           px-5 py-2.5 hover:bg-[#C4974A] hover:text-white transition-all duration-300"
              >
                + Add Booking
              </button>
              <a
                href="/api/calendar.ics"
                target="_blank"
                className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                           text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                           transition-colors duration-300"
              >
                Subscribe iCal
              </a>
              <button
                onClick={fetchBookings}
                className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                           text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                           transition-colors duration-300"
              >
                Refresh
              </button>
            </div>
          </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: filtered.length },
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
            { label: 'This Month', value: filtered.filter(b => b.date.startsWith(new Date().toISOString().slice(0,7))).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E5DCCF] p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8680] font-sans mb-2">{label}</p>
              <p className="font-serif text-3xl text-[#1C1C1A]">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-5">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search by name, email, service, or date..."
            className="w-full max-w-sm px-4 py-2.5 border border-[#E5DCCF] bg-white text-sm font-sans
                       focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50">
            <p className="text-red-600 text-sm font-sans">{error}</p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#8C8680] font-sans text-sm tracking-widest uppercase">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-2xl text-[#1C1C1A] mb-2">No bookings yet</p>
            <p className="text-[#8C8680] text-sm font-sans">Bookings will appear here once clients submit the form.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#E5DCCF] overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#E5DCCF]">
                  {([
                    ['date',    'Date'],
                    ['time',    'Time'],
                    ['name',    'Client'],
                    ['service', 'Service'],
                    ['price',   'Price'],
                    ['phone',   'Phone'],
                  ] as [keyof Booking, string][]).map(([key, label]) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase
                                 text-[#8C8680] cursor-pointer hover:text-[#C9A96E] transition-colors select-none"
                    >
                      {label}<SortIcon col={key} />
                    </th>
                  ))}
                  <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => {
                  const isUpcoming = new Date(b.date + 'T23:59:59') >= new Date();
                  return (
                    <tr
                      key={b.id}
                      className={`border-b border-[#F0EBE0] last:border-0 transition-colors
                        ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFAF6]'}
                        hover:bg-[#FEF9F2]`}
                    >
                      <td className="px-5 py-4 text-[#1C1C1A] whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          {new Date(b.date + 'T12:00:00').toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                          {isUpcoming && (
                            <span className="text-[9px] tracking-wide uppercase bg-[#EBF5EF] text-[#4A9B6F] px-1.5 py-0.5">
                              Upcoming
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#5A5550] whitespace-nowrap">{b.time}</td>
                      <td className="px-5 py-4">
                        <p className="text-[#1C1C1A] font-medium">{b.name}</p>
                        <a href={`mailto:${b.email}`} className="text-[#C9A96E] text-xs hover:underline">{b.email}</a>
                      </td>
                      <td className="px-5 py-4 text-[#1C1C1A]">{b.service}</td>
                      <td className="px-5 py-4 text-[#C9A96E] font-medium whitespace-nowrap">
                        {b.price != null ? `$${b.price}` : '—'}
                        {b.discount_code && (
                          <span className="block text-[#8C8680] text-[10px] font-normal font-sans mt-0.5">{b.discount_code}</span>
                        )}
                        {b.payment_method && b.payment_method !== 'stripe' && (
                          <span className="block text-[9px] tracking-wide uppercase bg-[#F0EBE0] text-[#5A5550] px-1.5 py-0.5 mt-1 w-fit">
                            {b.payment_method === 'square' ? 'In-Person · Square' : b.payment_method}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[#5A5550] whitespace-nowrap">
                        {b.phone
                          ? <a href={`tel:${b.phone}`} className="hover:text-[#C9A96E] transition-colors">{b.phone}</a>
                          : '—'}
                      </td>
                      <td className="px-5 py-4 text-[#8C8680] text-xs max-w-[200px]">
                        {b.notes ?? '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* iCal instructions */}
        <div className="mt-8 p-5 bg-[#F5F0E8] border border-[#E5DCCF]">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#C9A96E] font-sans mb-2">Live Calendar Feed</p>
          <p className="text-xs font-sans text-[#5A5550] mb-3">
            Subscribe to this URL in iCal, Google Calendar, or any calendar app to see all bookings in real time.
          </p>
          <code className="text-xs bg-white block p-3 border border-[#E5DCCF] text-[#1C1C1A] break-all">
            {typeof window !== 'undefined' ? window.location.origin : 'https://epoch-skin.com'}/api/calendar.ics
          </code>
          <p className="text-[10px] text-[#8C8680] font-sans mt-2">
            In iCal: File → New Calendar Subscription → paste URL above
          </p>
        </div>

        {/* Add Booking modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-5 z-50">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-7 border border-[#E5DCCF]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#1C1C1A]">Add In-Person Booking</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#8C8680] hover:text-[#1C1C1A] text-sm font-sans"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-[#8C8680] font-sans mb-5">
                Log a booking already paid in person (Square reader, cash, etc.). This won&apos;t charge anything — it just blocks the slot and adds it to the calendar feed.
              </p>
              <form onSubmit={handleAddBooking} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Client name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="col-span-2 px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input type="email" placeholder="Email (optional)" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input placeholder="Phone (optional)" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input required placeholder="Service (e.g. Body Massage 60min)" value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="col-span-2 px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input placeholder="Category (optional)" value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input type="number" min="0" step="0.01" placeholder="Price ($)" value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input required type="date" value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input required placeholder="Time (e.g. 2:30 PM)" value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <input type="number" min="0" placeholder="Duration (min)" value={form.duration}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E]" />
                  <select value={form.paymentMethod}
                    onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                    className="px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans bg-white focus:outline-none focus:border-[#C9A96E]">
                    <option value="square">Square (in-person)</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea placeholder="Notes (optional)" value={form.notes} rows={2}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="col-span-2 px-3 py-2.5 border border-[#E5DCCF] text-sm font-sans focus:outline-none focus:border-[#C9A96E] resize-none" />
                </div>
                {saveError && <p className="text-red-500 text-xs font-sans">{saveError}</p>}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.2em]
                             uppercase font-sans hover:bg-[#C4974A] hover:text-white transition-all
                             duration-300 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save Booking'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
      </div>
    </AdminShell>
  );
}
