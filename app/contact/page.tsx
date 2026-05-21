// app/contact/page.tsx
// Fully wired contact page with Resend API

import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Epoch Skin',
  description: 'Get in touch with Epoch Skin — New Orleans premier Organic Skincare and waxing studio.',
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
              <p className="text-sm text-[#555]">By appointment only</p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Location</p>
              <p className="text-sm text-[#555] leading-relaxed">
                New Orleans, Louisiana
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Follow</p>
              <div className="flex gap-3">
                <a href="https://instagram.com/epoch_skin" target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="w-9 h-9 border border-[#E5DCCF] flex items-center justify-center text-[#8C8680]
                             hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@epoch_skin" target="_blank" rel="noreferrer" aria-label="TikTok"
                  className="w-9 h-9 border border-[#E5DCCF] flex items-center justify-center text-[#8C8680]
                             hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.4a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/EpochSkin" target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="w-9 h-9 border border-[#E5DCCF] flex items-center justify-center text-[#8C8680]
                             hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
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
