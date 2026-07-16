'use client';
// app/admin/contact/page.tsx
// Admin dashboard for viewing contact form submissions from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).

import { useState, useEffect } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  created_at: string;
}

export default function AdminContactPage() {
  const [password, setPassword]     = useState('');
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [expanded, setExpanded]     = useState<number | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load submissions');
      setSubmissions(data.submissions ?? []);
      setAuthed(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
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
      await fetchSubmissions();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password.');
    }
  };

  const filtered = submissions.filter(s => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q) ||
      (s.service ?? '').toLowerCase().includes(q)
    );
  });

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
          <h1 className="font-serif text-3xl text-[#1C1C1A] mb-8 text-center">Contact</h1>
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
            <h1 className="font-serif text-4xl text-[#1C1C1A]">Contact Submissions</h1>
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
              onClick={fetchSubmissions}
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
            { label: 'Total Submissions', value: filtered.length },
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
            placeholder="Search by name, email, service, or message..."
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

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#8C8680] font-sans text-sm tracking-widest uppercase">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-2xl text-[#1C1C1A] mb-2">No submissions yet</p>
            <p className="text-[#8C8680] text-sm font-sans">Contact form messages will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((s) => {
              const isOpen = expanded === s.id;
              return (
                <div key={s.id} className="bg-white border border-[#E5DCCF]">
                  <button
                    onClick={() => setExpanded(isOpen ? null : s.id)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans"
                  >
                    <div className="min-w-0">
                      <p className="text-[#1C1C1A] font-medium truncate">
                        {s.name} <span className="text-[#8C8680] font-normal">— {s.email}</span>
                      </p>
                      <p className="text-[#8C8680] text-xs truncate mt-0.5">
                        {s.service ? `${s.service} · ` : ''}{s.message}
                      </p>
                    </div>
                    <span className="text-[#8C8680] text-xs whitespace-nowrap">
                      {new Date(s.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-[#F0EBE0] pt-4 font-sans text-sm">
                      <p className="text-[#1C1C1A] whitespace-pre-wrap mb-4">{s.message}</p>
                      <div className="flex gap-4 text-xs text-[#5A5550]">
                        {s.phone && <a href={`tel:${s.phone}`} className="hover:text-[#C9A96E]">{s.phone}</a>}
                        <a href={`mailto:${s.email}`} className="text-[#C9A96E] hover:underline">Reply by email</a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
