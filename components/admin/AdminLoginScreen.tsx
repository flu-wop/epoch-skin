'use client';
// components/admin/AdminLoginScreen.tsx
// Shared login form — was copy-pasted into 6 admin pages (page, orders,
// bookings, contact, newsletter, +) with only the title text differing.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see
// lib/admin-auth.ts). The password is verified server-side only.

import { useState } from 'react';

export function AdminLoginScreen({ title, onSuccess }: { title: string; onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

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
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3 text-center">Epoch Skin</p>
        <h1 className="font-serif text-3xl text-[#1C1C1A] mb-8 text-center">{title}</h1>
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
