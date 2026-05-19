// app/contact/page.tsx
// Fully wired contact page with Resend API

import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Epoch Skin',
  description: 'Get in touch with Epoch Skin — New Orleans premier organic skincare and waxing studio.',
  alternates: { canonical: 'https://epoch-skin.com/contact' },
  openGraph: {
    title: 'Contact | Epoch Skin',
    url: 'https://epoch-skin.com/contact',
    siteName: 'Epoch Skin',
    images: [{ url: 'https://epoch-skin.com/og/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Reach Out</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#111] mb-5">Contact Us</h1>
          <p className="text-[#888] max-w-md leading-relaxed">
            Have a question about our products or services? We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Sidebar info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Call or Text</p>
              <a href="tel:5047774094" className="font-serif text-xl text-[#111] hover:text-[#D4AF77] transition-colors">
                (504) 777-4094
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Email</p>
              <a href="mailto:kayla@epoch-skin.com" className="text-[#555] hover:text-[#D4AF77] transition-colors text-sm">
                kayla@epoch-skin.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Hours</p>
              <div className="space-y-1 text-sm text-[#555]">
                <p>Monday – Friday: 10am – 7pm</p>
                <p>Saturday: 9am – 5pm</p>
                <p>Sunday: By appointment</p>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Location</p>
              <p className="text-sm text-[#555] leading-relaxed">
                New Orleans, Louisiana
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Follow</p>
              <div className="flex gap-4">
                {[
                  { label: 'IG', href: 'https://instagram.com/epoch_skin' },
                  { label: 'TK', href: 'https://tiktok.com/@epoch_skin' },
                  { label: 'FB', href: 'https://facebook.com/EpochSkin' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 border border-[#E0D8CC] flex items-center justify-center text-xs text-[#888] hover:border-[#D4AF77] hover:text-[#D4AF77] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E0D0]">
              <a
                href="/book"
                className="block w-full py-3.5 text-center bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors"
              >
                Book an Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
