// app/success/page.tsx
// Post-Stripe checkout success page

import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmed | Epoch Skin',
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Decorative */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#F5EDD8] flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>

        <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Order Confirmed</p>
        <h1 className="font-serif text-4xl text-[#111] mb-5 leading-tight">
          Thank you for your order.
        </h1>
        <p className="text-[#666] leading-relaxed mb-10">
          A confirmation has been sent to your email. Your organic skincare is on its way — 
          allow 5–7 business days for standard shipping.
        </p>

        <div className="space-y-3">
          <Link
            href="/shop"
            className="block w-full py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/book"
            className="block w-full py-3.5 border border-[#E0D8CC] text-[#111] text-xs tracking-widest uppercase hover:border-[#D4AF77] transition-colors"
          >
            Book a Studio Appointment
          </Link>
        </div>

        <p className="text-[#AAA] text-xs mt-8">
          Questions? Email{' '}
          <a href="mailto:kayla@epoch-skin.com" className="text-[#D4AF77] hover:underline">
            kayla@epoch-skin.com
          </a>
        </p>
      </div>
    </div>
  );
}
