'use client';
// components/ContactForm.tsx
// Wired contact form with validation, Resend API, and smooth UX

import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Organic Facial',
  'Glass Skin Treatment',
  'Brazilian Wax',
  'Body Waxing',
  'Facial Waxing',
  'Product Inquiry',
  'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? 'Unknown error');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-8 border border-[#D4AF77]/30 rounded-sm bg-[#F5EDD8]/30">
        <div className="text-3xl mb-4">✨</div>
        <h3 className="font-serif text-2xl text-[#111] mb-3">Thank you.</h3>
        <p className="text-[#666] leading-relaxed">
          We've received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
          />
        </div>
      </div>

      {/* Phone + Service row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(504) 555-0000"
            className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Service Interest</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm appearance-none cursor-pointer"
          >
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us what you're looking for..."
          className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto px-10 py-3.5 bg-[#3E4A3C] text-[#C4974A] text-xs tracking-widest uppercase hover:bg-[#C4974A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
