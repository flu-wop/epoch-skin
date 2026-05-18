// app/about/page.tsx
// Matches reference mockup 3 exactly:
// - Large circular founder portrait at top center
// - "Our Epoch" heading, "Our Story" section
// - Sage green "Glass Skin Philosophy" cards with icons
// - "Spotlights" team section with circular photos
// - "Follow Our Journey" Instagram grid

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Epoch Skin",
  description: "Meet Kayla Ford — licensed esthetician and founder of Epoch Skin, New Orleans' premier organic skincare and waxing studio.",
  alternates: { canonical: "https://epoch-skin.com/about" },
  openGraph: {
    title: "About | Epoch Skin",
    url: "https://epoch-skin.com/about",
    images: [{ url: "https://epoch-skin.com/og/og-about.jpg", width: 1200, height: 630 }],
  },
};

const PHILOSOPHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="6" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
      </svg>
    ),
    title: "Glass Skin",
    body: "Our layering protocol maximizes absorption at each step to build luminous, dewy glass skin.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="12" r="5" />
        <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <circle cx="16" cy="12" r="9" strokeDasharray="2 3" />
      </svg>
    ),
    title: "Glass Skin",
    body: "Natural botanical treatments certified to maintain skin's own balanced ecosystem.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 8h16v20H8z" />
        <path d="M11 8V6a5 5 0 0 1 10 0v2" />
        <path d="M13 17l2 2 4-4" />
      </svg>
    ),
    title: "Esthetician Team",
    body: "Louisiana State Board certified estheticians trained in organic skincare and gentle waxing.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F0EB] min-h-screen">

      {/* ── FOUNDER PORTRAIT — circular, top center ── matches mockup 3 ── */}
      <section className="pt-16 pb-0 text-center px-5">
        {/* Circular portrait */}
        <div className="relative w-44 h-44 mx-auto mb-8">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white
                           shadow-[0_8px_40px_rgba(201,169,110,0.20)] bg-[#EAE2D8]">
            <Image
              src="/images/team/kayla-ford.jpg"
              alt="Kayla Ford, Founder of Epoch Skin"
              fill
              className="object-cover object-top"
              sizes="176px"
              priority
            />
          </div>
          {/* Gold ring accent */}
          <div className="absolute -inset-1.5 rounded-full border border-[#C9A96E]/30" />
        </div>

        {/* "Our Epoch" heading */}
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A18] mb-0">Our Epoch</h1>
      </section>

      {/* ── OUR STORY ── matches mockup 3 layout ── */}
      <section className="bg-white mt-0 py-14 px-5">
        <div className="max-w-[780px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-3">OAN</p>
          <h2 className="font-serif text-4xl text-[#1A1A18] mb-7">Our Story</h2>

          <div className="text-[#6E6860] font-sans text-sm leading-relaxed space-y-4 text-left max-w-2xl mx-auto">
            <p>
              Kayla Ford founded Epoch Skin after experiencing firsthand the damage that harsh, synthetic 
              products can cause — and the frustration of finding no organic-first studio in New Orleans 
              that took clean formulation seriously enough to actually deliver results.
            </p>
            <p>
              From formulating in her garage to opening Epoch Skin, the journey is guided by a belief 
              that the beauty community deserves better — skincare rooted in transparency, certification, 
              and the science of truly healthy skin.
            </p>
            <p>
              Our studio serves New Orleans and Mobile, AL. New clients can book online or call to get 
              the conversation started with our estheticians.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/book"
              className="inline-flex items-center px-8 py-3 border border-[#1A1A18] text-[#1A1A18]
                         text-[11px] tracking-[0.2em] uppercase font-sans
                         hover:bg-[#1A1A18] hover:text-[#C9A96E] transition-all duration-400">
              About Page
            </Link>
          </div>
        </div>
      </section>

      {/* ── GLASS SKIN PHILOSOPHY ── sage green cards with icons ── matches mockup 3 ── */}
      <section className="py-16 px-5">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-2">OUR</p>
            <h2 className="font-serif text-4xl text-[#1A1A18]">Glass Skin Philosophy</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {PHILOSOPHY_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-[#5C6B5A] text-white p-8 text-center group
                           hover:bg-[#4A5E48] transition-colors duration-400"
              >
                <div className="text-[#C9A96E] mb-5 flex justify-center">
                  {card.icon}
                </div>
                <h3 className="font-serif text-xl mb-3">{card.title}</h3>
                <p className="text-[#C4CFC3] text-xs font-sans leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHTS — team section ── matches mockup 3 ── */}
      <section className="py-14 px-5 bg-white">
        <div className="max-w-[780px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-2">ON</p>
            <h2 className="font-serif text-4xl text-[#1A1A18]">Spotlights</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { name: "Kayla Ford", role: "Founder & Lead Esthetician", img: "/images/team/kayla-ford.jpg" },
              { name: "Esthetician Team", role: "Licensed Professionals", img: "/images/team/team-2.jpg" },
            ].map((member) => (
              <div key={member.name} className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#EAE2D8]">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-serif text-[#1A1A18] text-lg leading-tight">{member.name}</p>
                  <p className="text-[#9A9088] text-xs font-sans mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOLLOW OUR JOURNEY — Instagram grid ── matches mockup 3 ── */}
      <section className="py-16 px-5">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-2">PTD</p>
          <h2 className="font-serif text-4xl text-[#1A1A18] mb-10">Follow Our Journey</h2>

          {/* Instagram placeholder grid — 3 large tiles matching mockup */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              "/images/team/kayla-ford.jpg",
              "/images/blog/glass-skin.jpg",
              "/images/studio/studio-1.jpg",
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-[#EAE2D8] group cursor-pointer relative">
                <Image
                  src={src}
                  alt={`Epoch Skin Instagram ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
          {/*
            INSTAGRAM: Replace grid above with Behold embed:
            <div id="behold-widget-YOURFEEDID" />
            <script src="https://w.behold.so/widget.js" type="module" />
          */}

          <a
            href="https://instagram.com/epoch_skin"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-8 py-3.5 border border-[#1A1A18] text-[#1A1A18]
                       text-[11px] tracking-[0.2em] uppercase font-sans
                       hover:bg-[#1A1A18] hover:text-[#C9A96E] transition-all duration-400"
          >
            @epoch_skin
          </a>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl text-[#1A1A18]">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "✦", title: "Organic First", body: "Certified organic extracts, INCI-listed, batch-tested, transparently sourced." },
              { icon: "◈", title: "Cruelty-Free", body: "Never tested on animals. Ethically sourced from verified suppliers." },
              { icon: "◇", title: "Visible Results", body: "Every formula engineered for measurable skin improvement." },
              { icon: "○", title: "Client-Centered", body: "Your comfort and confidence are at the heart of every decision." },
            ].map((v) => (
              <div key={v.title}
                className="border border-[#E0D8CE] p-7 bg-white hover:border-[#C9A96E]/50
                           hover:bg-[#FDFAF6] transition-all duration-400">
                <span className="block text-[#C9A96E] text-xl mb-4">{v.icon}</span>
                <h3 className="font-serif text-lg text-[#1A1A18] mb-2">{v.title}</h3>
                <p className="text-[#9A9088] text-xs font-sans leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-5 bg-[#EAE2D8] text-center">
        <div className="max-w-lg mx-auto">
          <p className="font-serif text-3xl text-[#1A1A18] mb-8">Ready to begin your epoch?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book"
              className="px-10 py-3.5 bg-[#1A1A18] text-[#C9A96E] text-[11px] tracking-[0.22em]
                         uppercase font-sans hover:bg-[#C9A96E] hover:text-[#1A1A18] transition-all duration-400">
              Book Appointment
            </Link>
            <Link href="/shop"
              className="px-10 py-3.5 border border-[#1A1A18] text-[#1A1A18] text-[11px] tracking-[0.22em]
                         uppercase font-sans hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-400">
              Shop Skincare
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
