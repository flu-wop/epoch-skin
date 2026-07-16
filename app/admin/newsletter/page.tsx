'use client';
// app/admin/newsletter/page.tsx
// Admin dashboard for viewing newsletter subscribers from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).

import { useState, useEffect } from 'react';

interface Subscriber {
  id: number;
  email: string;
  source: string | null;
  created_at: string;
}

export default function AdminNewsletterPage() {
  const [password, setPassword]     = useState('');
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('desc');

  const fetchSubscribers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load subscribers');
      setSubscribers(data.subscribers ?? []);
      setAuthed(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
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
      await fetchSubscribers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password.');
    }
  };

  const filtered = subscribers
    .filter(s => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return s.email.toLowerCase().includes(q) || (s.source ?? '').toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const cmp = a.created_at.localeCompare(b.created_at);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const downloadCSV = () => {
    const rows = [
      ['Email', 'Source', 'Subscribed At'],
      ...filtered.map(s => [s.email, s.source ?? '', s.created_at]),
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'epoch-skin-newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <h1 className="font-serif text-3xl text-[#1C1C1A] mb-8 text-center">Newsletter</h1>
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
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Admin</p>
            <h1 className="font-serif text-4xl text-[#1C1C1A]">Newsletter</h1>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href="/admin"
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300"
            >
              Admin Home
            </a>
            <button
              onClick={downloadCSV}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300"
            >
              Export CSV
            </button>
            <button
              onClick={fetchSubscribers}
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
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Total Subscribers', value: filtered.length },
            { label: 'This Month', value: filtered.filter(s => s.created_at.startsWith(new Date().toISOString().slice(0,7))).length },
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
            placeholder="Search by email or source..."
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
            <p className="font-serif text-2xl text-[#1C1C1A] mb-2">No subscribers yet</p>
            <p className="text-[#8C8680] text-sm font-sans">Subscribers will appear here once people sign up for the newsletter.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#E5DCCF] overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#E5DCCF]">
                  <th
                    onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                    className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase
                               text-[#8C8680] cursor-pointer hover:text-[#C9A96E] transition-colors select-none"
                  >
                    Subscribed<span className="ml-1 text-[#C9A96E] opacity-60">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">Email</th>
                  <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`border-b border-[#F0EBE0] last:border-0 transition-colors
                      ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFAF6]'}
                      hover:bg-[#FEF9F2]`}
                  >
                    <td className="px-5 py-4 text-[#1C1C1A] whitespace-nowrap">
                      {new Date(s.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${s.email}`} className="text-[#C9A96E] text-xs hover:underline">{s.email}</a>
                    </td>
                    <td className="px-5 py-4 text-[#5A5550]">{s.source ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
