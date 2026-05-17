// app/about/page.tsx
// Fixed: real image paths, Instagram section, team photo handling

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Epoch Skin',
  description: 'Meet Kayla Ford and the Epoch Skin team — licensed estheticians building New Orleans\' premier organic skincare and waxing studio.',
  alternates: { canonical: 'https://epoch-skin.com/about' },
  openGraph: {
    title: 'About Epoch Skin',
    description: 'Organic skincare rooted in K-Beauty. Founded by licensed esthetician Kayla Ford in New Orleans.',
    url: 'https://epoch-skin.com/about',
    siteName: 'Epoch Skin',
    images: [{ url: 'https://epoch-skin.com/og/og-about.jpg', width: 1200, height: 630 }],
  },
};

const VALUES = [
  { icon: '🌿', title: 'Organic First', body: 'We use only high-quality, certified organic ingredients in every formula — transparently listed, batch-tested.' },
  { icon: '🐰', title: 'Cruelty-Free', body: 'Never tested on animals. We source ethically from suppliers who share our values, always.' },
  { icon: '✨', title: 'Visible Results', body: 'Every product and service is designed to deliver real, lasting results you can see and feel.' },
  { icon: '🤝', title: 'Client-Centered', body: 'Your comfort, confidence, and satisfaction are at the heart of every decision we make.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <div className="bg-[#111] py-20 px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Our Story</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 max-w-2xl mx-auto leading-tight">
          A New Era of Organic Skincare
        </h1>
        <p className="text-[#A89880] max-w-lg mx-auto leading-relaxed">
          Founded in New Orleans by a licensed esthetician who believed clean beauty shouldn't compromise on results.
        </p>
      </div>

      {/* Brand story */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            {/* Founder photo — replace /images/team/kayla-ford.jpg with real photo */}
            <div className="relative aspect-[3/4] bg-[#F5EDD8] overflow-hidden">
              <Image
                src="/images/team/kayla-ford.jpg"
                alt="Kayla Ford, Founder & Licensed Esthetician at Epoch Skin"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                // Graceful fallback handled by bg color above
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="font-serif text-white text-lg">Kayla Ford</p>
                <p className="text-[#D4AF77] text-xs tracking-widest uppercase">Founder & Licensed Esthetician</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-[#AAA] tracking-wide">
              LA State Board Licensed · 3+ years experience · Certified in Organic Facials & Waxing
            </div>
          </div>

          <div className="pt-4">
            {/* Etymology */}
            <div className="mb-10 p-6 bg-white border border-[#E8E0D0]">
              <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">ep · och</p>
              <p className="font-serif text-2xl text-[#111] mb-2">/ˈepək/ · noun</p>
              <p className="text-[#888] text-sm leading-relaxed mb-4">
                A period marked by notable events. A fixed point from which a new chapter begins.
              </p>
              <p className="text-[#555] text-sm leading-relaxed border-l-2 border-[#D4AF77] pl-4">
                For us, Epoch represents the moment your skin's story changes — when you choose formulas that nourish instead of strip, that honor your body's natural intelligence.
              </p>
            </div>

            <h2 className="font-serif text-2xl text-[#111] mb-5">Our Story</h2>
            <div className="space-y-4 text-[#555] leading-relaxed text-sm">
              <p>
                Epoch Skin was born from firsthand frustration. Our founder experienced years of irritation and sensitivity from harsh waxing products and synthetic skincare — and couldn't find a studio that took clean formulation seriously.
              </p>
              <p>
                So she built one. Kayla spent years studying certified organic formulation, K-Beauty glass-skin protocols, and gentle waxing technique before launching Epoch Skin in New Orleans.
              </p>
              <p>
                Today, every product is small-batch formulated with certified organic ingredients. Every service is performed by Louisiana State Board licensed estheticians. And every client leaves feeling seen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">What We Stand For</p>
            <h2 className="font-serif text-3xl text-[#111]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {VALUES.map(v => (
              <div key={v.title} className="p-8 border border-[#E8E0D0] hover:border-[#D4AF77]/40 transition-colors">
                <div className="text-2xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-lg text-[#111] mb-3">{v.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glass skin */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">K-Beauty Method</p>
            <h2 className="font-serif text-3xl text-[#111] mb-6">Glass-Skin Layering</h2>
            <p className="text-[#555] leading-relaxed mb-5">
              The glass-skin philosophy is built on progressive hydration — layering water-based formulas from thinnest to richest so skin absorbs every drop.
            </p>
            <p className="text-[#555] leading-relaxed mb-8">
              Our three-step home routine pairs with our in-studio treatments for compounding results: cleanse, tone, serum, barrier cream. Simple. Consistent. Transformative.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 border border-[#111] text-[#111] text-xs tracking-widest uppercase hover:bg-[#111] hover:text-[#D4AF77] transition-colors"
            >
              Shop the Routine
            </Link>
          </div>
          {/* Glass skin image — replace /images/blog/glass-skin.jpg with real photo */}
          <div className="relative aspect-[4/3] bg-[#F5EDD8] overflow-hidden">
            <Image
              src="/images/blog/glass-skin.jpg"
              alt="Glass skin layering technique at Epoch Skin"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="bg-[#111] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-4">Full Transparency</p>
          <h2 className="font-serif text-3xl text-white mb-6">We List Every Ingredient</h2>
          <p className="text-[#A89880] leading-relaxed mb-8">
            Every formula lists ingredients in INCI format. We mark which are certified organic. We provide pH ranges, storage guidance, and usage instructions — because you deserve to know what you're putting on your skin.
          </p>
          <p className="text-[#666] text-xs">
            These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* Instagram follow section */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Follow Our Journey</p>
          <h2 className="font-serif text-3xl text-[#111] mb-4">@epoch_skin</h2>
          <p className="text-[#888] mb-8">Behind the formulas, inside the studio, and real client results.</p>

          {/* Instagram feed placeholder grid — replace with Behold/Curator embed when ready */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#F0E8DC] overflow-hidden">
                {/* Replace each with <Image> once real Instagram photos are available */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#D4AF77]/40 text-2xl">🌿</span>
                </div>
              </div>
            ))}
          </div>

          {/*
            TO ENABLE REAL INSTAGRAM FEED:
            Option A (free): Use Behold (behold.so) — paste embed code here
            Option B (free): Use Curator.io — generates script embed
            Option C: Use Instagram Basic Display API with a server component

            Example Behold embed (replace YOUR_FEED_ID):
            <div id="behold-widget-YOUR_FEED_ID"></div>
            <script src="https://w.behold.so/widget.js" type="module" />
          */}

          <a
            href="https://instagram.com/epoch_skin"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-10 py-3.5 border border-[#111] text-[#111] text-xs tracking-widest uppercase hover:bg-[#111] hover:text-[#D4AF77] transition-colors"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#F5EDD8] text-center">
        <p className="font-serif text-2xl text-[#111] mb-4">Ready to begin your epoch?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book" className="px-10 py-3.5 bg-[#111] text-[#D4AF77] text-xs tracking-widest uppercase hover:bg-[#D4AF77] hover:text-[#111] transition-colors">
            Book Appointment
          </Link>
          <Link href="/shop" className="px-10 py-3.5 border border-[#111] text-[#111] text-xs tracking-widest uppercase hover:border-[#D4AF77] hover:text-[#D4AF77] transition-colors">
            Shop Skincare
          </Link>
        </div>
      </section>
    </div>
  );
}
