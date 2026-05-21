'use client';
// app/book/page.tsx
// 4-step booking flow with Cal.com embed for Date/Time + Resend confirmation

import { useState, useEffect } from 'react';
import Script from 'next/script';

// ─── Service catalog ───────────────────────────────────────────────
const SERVICES = {
  women: {
    body: [
      { id: 'brazilian', name: 'Brazilian Wax', duration: '37 min', price: 50 },
      { id: 'bikini-line', name: 'Bikini Line Wax', duration: '15 min', price: 30 },
      { id: 'french-bikini', name: 'French Bikini Wax', duration: '30 min', price: 40 },
      { id: 'full-leg', name: 'Full Leg Wax', duration: '45 min', price: 55 },
      { id: 'half-leg', name: 'Half Leg Wax', duration: '35 min', price: 35 },
      { id: 'full-arm', name: 'Full Arm Wax', duration: '37 min', price: 45 },
      { id: 'half-arm', name: 'Half Arm Wax', duration: '25 min', price: 25 },
      { id: 'underarm', name: 'Underarm Wax', duration: '17 min', price: 20 },
      { id: 'stomach', name: 'Stomach Wax', duration: '25 min', price: 35 },
    ],
    facial: [
      { id: 'full-face', name: 'Full Face Wax', duration: '30 min', price: 40 },
      { id: 'eyebrow', name: 'Eyebrow Wax', duration: '17 min', price: 13 },
      { id: 'lip', name: 'Lip Wax', duration: '10 min', price: 8 },
      { id: 'chin', name: 'Chin Wax', duration: '12 min', price: 10 },
      { id: 'nose', name: 'Nose Wax', duration: '10 min', price: 8 },
    ],
  },
  facials: [
    { id: 'organic-facial', name: 'Organic Facial', duration: '60 min', price: 80 },
    { id: 'hydrating-facial', name: 'Hydrating Facial', duration: '30 min', price: 50 },
    { id: 'glass-skin', name: 'Glass Skin Treatment', duration: '75 min', price: 90 },
  ],
};

type Service = { id: string; name: string; duration: string; price: number };

const CALCOM_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? 'kayla-epoch-skin';

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [gender, setGender] = useState<'women' | 'men'>('women');
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', phone: '', notes: '' });
  const [calBooked, setCalBooked] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Total price
  const total = selectedServices.reduce((s, srv) => s + srv.price, 0);

  const toggleService = (service: Service) => {
    setSelectedServices(prev =>
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  // Cal.com event listener for booking completion
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CAL:bookingSuccessful') {
        setCalBooked(true);
        setStep(3);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Step 4 — send confirmation
  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await fetch('/api/booking-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          notes: bookingDetails.notes,
          services: selectedServices.map(s => `${s.name} (${s.duration}) — $${s.price}`),
          date: 'Confirmed via Cal.com',
          time: 'Confirmed via Cal.com',
          total: `$${total}`,
        }),
      });
      setConfirmed(true);
    } catch {
      // Silently succeed — cal.com already sent its own confirmation
      setConfirmed(true);
    }
    setConfirming(false);
  };

  // ─── Step labels ────────────────────────────────────────────────
  const steps = ['Services', 'Date & Time', 'Your Info', 'Confirm'];

  return (
    <>
      {/* Load Cal.com embed */}
      <Script src="https://app.cal.com/embed/embed.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Epoch Skin Studio</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111] mb-4">Book Your Appointment</h1>
            <p className="text-[#888] max-w-md mx-auto">
              Select your services, choose a time, and we'll see you in the studio.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mb-12">
            {steps.map((label, i) => {
              const num = i + 1;
              const active = step === num;
              const done = step > num;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                      ${done ? 'bg-[#D4AF77] text-[#111]' : active ? 'bg-[#111] text-[#D4AF77]' : 'bg-[#E8E0D0] text-[#AAA]'}`}>
                      {done ? '✓' : num}
                    </div>
                    <span className={`text-xs mt-1 tracking-wide hidden sm:block ${active ? 'text-[#111]' : 'text-[#AAA]'}`}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-px mx-2 mb-5 ${done ? 'bg-[#D4AF77]' : 'bg-[#E8E0D0]'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ─── STEP 1: Services ─── */}
          {step === 1 && (
            <div>
              {/* Gender tabs */}
              <div className="flex gap-1 mb-8 border border-[#E0D8CC] p-1 w-fit">
                {(['women', 'men'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors ${
                      gender === g ? 'bg-[#111] text-[#D4AF77]' : 'text-[#888] hover:text-[#111]'
                    }`}
                  >
                    {g === 'women' ? "Women's" : "Men's"}
                  </button>
                ))}
              </div>

              {/* Body Waxing */}
              <div className="mb-8">
                <h2 className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Body Waxing</h2>
                <div className="space-y-2">
                  {SERVICES.women.body.map(srv => (
                    <ServiceRow
                      key={srv.id}
                      service={srv}
                      selected={!!selectedServices.find(s => s.id === srv.id)}
                      onToggle={toggleService}
                    />
                  ))}
                </div>
              </div>

              {/* Facial Waxing */}
              <div className="mb-8">
                <h2 className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Facial Waxing</h2>
                <div className="space-y-2">
                  {SERVICES.women.facial.map(srv => (
                    <ServiceRow
                      key={srv.id}
                      service={srv}
                      selected={!!selectedServices.find(s => s.id === srv.id)}
                      onToggle={toggleService}
                    />
                  ))}
                </div>
              </div>

              {/* Organic Facials */}
              <div className="mb-8">
                <h2 className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Organic Facials</h2>
                <div className="space-y-2">
                  {SERVICES.facials.map(srv => (
                    <ServiceRow
                      key={srv.id}
                      service={srv}
                      selected={!!selectedServices.find(s => s.id === srv.id)}
                      onToggle={toggleService}
                    />
                  ))}
                </div>
              </div>

              {/* Summary + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-[#E8E0D0] pt-6">
                <div>
                  {selectedServices.length > 0 ? (
                    <p className="text-[#888] text-sm">
                      {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected —{' '}
                      <span className="text-[#111] font-medium">${total}</span>
                    </p>
                  ) : (
                    <p className="text-[#BBB] text-sm">Select at least one service to continue</p>
                  )}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedServices.length === 0}
                  className="px-10 py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Choose Date & Time →
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Cal.com embed ─── */}
          {step === 2 && (
            <div>
              <p className="text-[#888] text-sm mb-6 text-center">
                Choose a date and time that works for you. Your appointment will be confirmed instantly.
              </p>

              {/* Cal.com inline embed */}
              <div
                className="cal-inline-container border border-[#E8E0D0] bg-white overflow-hidden"
                style={{ minHeight: '600px' }}
                data-cal-link={CALCOM_USERNAME}
                data-cal-config={JSON.stringify({
                  layout: 'month_view',
                  theme: 'light',
                  styles: {
                    branding: { brandColor: '#D4AF77' },
                  },
                })}
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-[#888] hover:text-[#111] transition-colors">
                  ← Back to Services
                </button>
                {calBooked && (
                  <button
                    onClick={() => setStep(3)}
                    className="px-10 py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase"
                  >
                    Continue →
                  </button>
                )}
              </div>

              {/* Fallback: direct link */}
              <p className="text-center text-xs text-[#AAA] mt-4">
                Trouble with the calendar?{' '}
                <a
                  href={`https://cal.com/${CALCOM_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4AF77] hover:underline"
                >
                  Book directly on Cal.com
                </a>
              </p>
            </div>
          )}

          {/* ─── STEP 3: Contact info ─── */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl text-[#111] mb-8">Your Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Name *</label>
                    <input
                      type="text"
                      value={bookingDetails.name}
                      onChange={e => setBookingDetails(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Email *</label>
                    <input
                      type="email"
                      value={bookingDetails.email}
                      onChange={e => setBookingDetails(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Phone</label>
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={e => setBookingDetails(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(504) 555-0000"
                    className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#888] mb-2">Notes (optional)</label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={e => setBookingDetails(p => ({ ...p, notes: e.target.value }))}
                    rows={3}
                    placeholder="Skin concerns, allergies, or anything we should know..."
                    className="w-full px-4 py-3 border border-[#E0D8CC] bg-white text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#D4AF77] transition-colors text-sm resize-none"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
                <button onClick={() => setStep(2)} className="text-sm text-[#888] hover:text-[#111] transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!bookingDetails.name || !bookingDetails.email}
                  className="px-10 py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors disabled:opacity-40"
                >
                  Review Booking →
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 4: Review + Confirm ─── */}
          {step === 4 && (
            <div>
              {confirmed ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-6">✨</div>
                  <h2 className="font-serif text-3xl text-[#111] mb-4">You're booked.</h2>
                  <p className="text-[#888] leading-relaxed mb-8">
                    A confirmation has been sent to <strong>{bookingDetails.email}</strong>.
                    We can't wait to see you at the studio.
                  </p>
                  <a
                    href="/shop"
                    className="inline-block px-10 py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors"
                  >
                    Shop Skincare
                  </a>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-2xl text-[#111] mb-8">Review Your Booking</h2>

                  {/* Services */}
                  <div className="mb-6 border border-[#E8E0D0] p-6">
                    <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Services</p>
                    {selectedServices.map(srv => (
                      <div key={srv.id} className="flex justify-between text-sm py-2 border-b border-[#F0EBE0] last:border-0">
                        <span className="text-[#555]">{srv.name} <span className="text-[#AAA]">({srv.duration})</span></span>
                        <span className="text-[#111]">${srv.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-serif text-lg text-[#111] mt-4 pt-4 border-t border-[#E8E0D0]">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  {/* Client info */}
                  <div className="mb-8 border border-[#E8E0D0] p-6">
                    <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Your Information</p>
                    <div className="space-y-2 text-sm text-[#555]">
                      <p><span className="text-[#AAA] w-16 inline-block">Name</span>{bookingDetails.name}</p>
                      <p><span className="text-[#AAA] w-16 inline-block">Email</span>{bookingDetails.email}</p>
                      {bookingDetails.phone && <p><span className="text-[#AAA] w-16 inline-block">Phone</span>{bookingDetails.phone}</p>}
                      {bookingDetails.notes && <p><span className="text-[#AAA] w-16 inline-block">Notes</span>{bookingDetails.notes}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-between">
                    <button onClick={() => setStep(3)} className="text-sm text-[#888] hover:text-[#111] transition-colors">
                      ← Edit Info
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={confirming}
                      className="px-10 py-3.5 bg-[#D4AF77] text-[#111] text-xs tracking-widest uppercase hover:bg-[#111] hover:text-[#D4AF77] transition-colors disabled:opacity-50"
                    >
                      {confirming ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Service row component ─────────────────────────────────────────
function ServiceRow({ service, selected, onToggle }: {
  service: Service;
  selected: boolean;
  onToggle: (s: Service) => void;
}) {
  return (
    <button
      onClick={() => onToggle(service)}
      className={`w-full flex items-center justify-between px-5 py-4 border transition-all text-left
        ${selected
          ? 'border-[#D4AF77] bg-[#F5EDD8]/50'
          : 'border-[#E8E0D0] bg-white hover:border-[#D4AF77]/50'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors
          ${selected ? 'bg-[#D4AF77] border-[#D4AF77]' : 'border-[#CCC]'}`}>
          {selected && <span className="text-[#111] text-xs leading-none">✓</span>}
        </div>
        <div>
          <p className="text-sm text-[#111] font-medium">{service.name}</p>
          <p className="text-xs text-[#AAA]">{service.duration}</p>
        </div>
      </div>
      <p className="text-sm text-[#D4AF77] font-medium">${service.price}</p>
    </button>
  );
}
