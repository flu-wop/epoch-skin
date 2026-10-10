'use client';
// app/admin/contact/page.tsx
// Admin dashboard for viewing contact form submissions from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).

import { useState, useEffect } from 'react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { RefreshCw, Download } from 'lucide-react';
import { AdminShell, AdminPage, AdminPageHeader, adminBtn } from '@/components/admin/AdminShell';

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
    return <AdminLoginScreen title="Contact" onSuccess={fetchSubmissions} />;
  }

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <div className="max-w-4xl">
        <AdminPageHeader
          title="Messages"
          actions={
            <>
              <button onClick={fetchSubmissions} disabled={loading} className={adminBtn.secondary}>
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </>
          }
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
          {[
            { label: 'Total Submissions', value: filtered.length },
            { label: 'This Month', value: filtered.filter(s => s.created_at.startsWith(new Date().toISOString().slice(0,7))).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E5DCCF] px-3 py-3 sm:p-5 min-w-0">
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#8C8680] mb-1.5 truncate">{label}</p>
              <p className="font-serif text-xl sm:text-3xl text-[#1C1C1A] leading-none">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-4">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search by name, email, service, or message..."
            className="w-full sm:max-w-sm h-10 px-3 border border-[#E5DCCF] bg-white text-sm font-sans
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
          <div className="text-center py-14 px-5 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-xl sm:text-2xl text-[#1C1C1A] mb-2">No submissions yet</p>
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
                    className="w-full text-left px-4 sm:px-5 py-4 flex items-start justify-between gap-3 font-sans"
                  >
                    <div className="min-w-0">
                      <p className="text-[#1C1C1A] font-medium truncate">{s.name}</p>
                      <p className="text-[#8C8680] text-xs truncate">{s.email}</p>
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
                    <div className="px-4 sm:px-5 pb-5 border-t border-[#F0EBE0] pt-4 font-sans text-sm">
                      <p className="text-[#1C1C1A] whitespace-pre-wrap break-words mb-4">{s.message}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#5A5550]">
                        {s.phone && <a href={`tel:${s.phone}`} className="hover:text-[#A87C30]">{s.phone}</a>}
                        <a href={`mailto:${s.email}`} className="text-[#A87C30] hover:underline">Reply by email</a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        </div>
      </AdminPage>
    </AdminShell>
  );
}
