'use client';
// app/book/success/page.tsx
// Shown after successful Stripe payment for a booking.
// The actual booking save + email happens via webhook.

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const params    = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#F5EDD8] flex items-center justify-center mx-auto mb-8 text-2xl">
          ✨
        </div>
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Confirmed</p>
        <h1 className="font-serif text-4xl text-[#1C1C1A] mb-4">You&apos;re booked.</h1>
        <p className="text-[#5A5550] font-sans text-sm leading-relaxed mb-2">
          Payment received. A confirmation email with your calendar invite is on its way.
        </p>
        <p className="text-[#5A5550] font-sans text-sm mb-10">
          Need to reschedule? Call or text{' '}
          <a href="tel:5047774094" className="font-semibold text-[#1C1C1A] hover:text-[#C9A96E] transition-colors">
            (504) 777-4094
          </a>
          .
        </p>

        {sessionId && (
          <p className="text-[#C0BAB4] text-[10px] font-sans mb-8 tracking-wide">
            Ref: {sessionId.slice(-8).toUpperCase()}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="px-8 py-3.5 bg-[#C9A96E] text-[#1C1C1A] text-[11px] tracking-[0.22em]
                       uppercase font-sans font-medium hover:bg-[#D4AF88] transition-all duration-300"
          >
            Book Another Service
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 border border-[#E5DCCF] text-[#5A5550] text-[11px] tracking-[0.22em]
                       uppercase font-sans hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
          >
            Shop Skincare →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
