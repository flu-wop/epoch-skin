'use client';
// app/admin/page.tsx
// Central admin landing page — login gate + links to Bookings, Orders, Sync.
// Uses the same httpOnly session cookie as /admin/bookings and /admin/orders
// (see lib/admin-auth.ts). /admin/sync has its own separate SYNC_SECRET,
// entered on that page directly, by design (higher-friction for a
// destructive/rare action).

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminHomePage() {
  const [password, setPassword]     = useState('');
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError]           = useState('');

  const checkSession = async () => {
    try {
      const res = await fetch('/api/bookings');
      setAuthed(res.status !== 401);
    } catch {
      setAuthed(false);
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    checkSession();
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
      setAuthed(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password.');
    }
  };

  if (checkingSession) {
    return <div className="min-h-screen bg-[#FAF7F2]" />;
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3 text-center">Epoch Skin</p>
          <h1 className="font-serif text-3xl text-[#1C1C1A] mb-8 text-center">Admin</h1>
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

  const links = [
    { href: '/admin/bookings', label: 'Bookings', desc: 'View and search all paid appointment bookings.' },
    { href: '/admin/orders',   label: 'Orders',   desc: 'View and search all paid shop orders.' },
    { href: '/admin/newsletter', label: 'Newsletter', desc: 'View and export newsletter subscribers.' },
    { href: '/admin/sync',     label: 'Stripe Sync', desc: 'Push the product catalog to Stripe (needs sync secret).' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2 text-center">Epoch Skin</p>
        <h1 className="font-serif text-4xl text-[#1C1C1A] mb-10 text-center">Admin</h1>
        <div className="grid gap-4">
          {links.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="block bg-white border border-[#E5DCCF] p-6 hover:border-[#C9A96E] transition-colors duration-300"
            >
              <p className="font-serif text-xl text-[#1C1C1A] mb-1">{label}</p>
              <p className="text-[#8C8680] text-sm font-sans">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
