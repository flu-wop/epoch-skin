'use client';
// components/NewsletterForm.tsx
// Used in both footer and homepage — variant prop controls layout

import { useState } from 'react';

interface Props {
  variant?: 'footer' | 'section';
}

export default function NewsletterForm({ variant = 'section' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Unknown error');
      setStatus('success');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <p className={variant === 'footer'
        ? 'text-[#A89880] text-sm'
        : 'text-[#D4AF77] text-base font-serif italic'
      }>
        ✨ You're in — check your inbox for 15% off.
      </p>
    );
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-[#333] text-[#F5EDD8] placeholder-[#555] text-sm focus:outline-none focus:border-[#D4AF77] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-[#D4AF77] text-[#111] text-xs tracking-widest uppercase hover:bg-[#C9A460] transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
    );
  }

  // Section variant (homepage)
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
          className="flex-1 px-5 py-3.5 bg-white border border-[#E0D8CC] text-[#111] placeholder-[#BBB] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3.5 bg-[#3E4A3C] text-[#C4974A] text-xs tracking-widest uppercase hover:bg-[#C4974A] hover:text-white transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? 'Joining...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
      <p className="text-[#999] text-xs mt-3 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
