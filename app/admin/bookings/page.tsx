'use client';
// app/admin/bookings/page.tsx
// Admin dashboard for viewing all Epoch Skin bookings from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).
// The password is verified server-side only — never shipped to the client.

import { useState, useEffect } from 'react';

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
  created_at: string;
}

export default function AdminBookingsPage() {
  const [password, setPassword]     = useState('');
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [bookings, setBookings]     = useState<Booking[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [sortKey, setSortKey]       = useState<keyof Booking>('date');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('desc');

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Incorrect password.');
      setPassword('');
      await fetchBookings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password.');
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
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3 text-center">Admin</p>
          <h1 className="font-serif text-3xl text-[#1C1C1A] mb-8 text-center">Bookings</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-[#E5DCCF] bg-white text-sm font-sans
                         focus:outline-none focus:border-[#C9A96E] transition-colors"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.2em]
                         uppercase font-sans hover:bg-[#C4974A] hover:text-white transition-all duration-300"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Admin</p>
            <h1 className="font-serif text-4xl text-[#1C1C1A]">Bookings</h1>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href="/admin/orders"
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300"
            >
              Orders
            </a>
            <a
              href="/admin/newsletter"
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300"
            >
              Newsletter
            </a>
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
            <button
              onClick={async () => { await fetch('/api/admin/login', { method: 'DELETE' }); setAuthed(false); }}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#8C8680] px-5 py-2.5 hover:border-red-300 hover:text-red-500
                         transition-colors duration-300"
            >
              Log Out
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

      </div>
    </div>
  );
}
