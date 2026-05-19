// app/about/page.tsx
// Fixed: circular founder photo, removed Esthetician Team, blank Instagram placeholders

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About | Epoch Skin",
  description: "Meet Kayla Ford — licensed esthetician and founder of Epoch Skin, New Orleans premier Organic Skincare and waxing studio.",
  alternates: { canonical: "https://epoch-skin.com/about" },
  openGraph: {
    title: "About | Epoch Skin",
    url: "https://epoch-skin.com/about",
    images: [{ url: "https://epoch-skin.com/og/og-about.jpg", width: 1200, height: 630 }],
  },
};

const PHILOSOPHY = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8">
        <circle cx="16" cy="16" r="6" />
        <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.34 6.34l2.83 2.83M22.83 22.83l2.83 2.83M6.34 25.66l2.83-2.83M22.83 9.17l2.83-2.83" />
      </svg>
    ),
    title: "Glass Skin",
    body: "Our layering protocol maximizes absorption at every step, building hydration depth organically for a luminous finish.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8">
        <circle cx="16" cy="11" r="5.5" />
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" strokeDasharray="3 3" />
        <path d="M9 28c0-3.866 3.134-7 7-7s7 3.134 7 7" />
      </svg>
    ),
    title: "Organic Actives",
    body: "Natural botanical treatments certified to maintain skin's own balanced ecosystem — gently and effectively.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8">
        <rect x="7" y="7" width="18" height="22" rx="0.5" />
        <path d="M11 7V5a5 5 0 0 1 10 0v2" />
        <path d="M12 17l3 3 5-5" />
      </svg>
    ),
    title: "Licensed Expertise",
    body: "Louisiana State Board certified — continuously trained in Organic Skincare and gentle waxing protocols.",
  },
];

const STEPS = [
  { num: "01", label: "Cleanse",   desc: "Sulfate-free, pH-balanced. Remove without stripping the barrier." },
  { num: "02", label: "Tone",      desc: "Restore balance. Prime every layer for maximum absorption." },
  { num: "03", label: "Serum",     desc: "Snow mushroom and beta-glucan for deep, sustained hydration." },
  { num: "04", label: "Seal",      desc: "Barrier cream locks every layer in. Glass skin, achieved." },
];

const VALUES = [
  { icon: "✦", title: "Organic First",   body: "Certified organic extracts, INCI-listed, batch-tested, transparently sourced." },
  { icon: "◈", title: "Cruelty-Free",    body: "Never tested on animals. Every supplier vetted for ethical sourcing." },
  { icon: "◇", title: "Visible Results", body: "Engineered for measurable skin improvement — not just a pleasant experience." },
  { icon: "○", title: "Client-Centered", body: "Your comfort, safety, and confidence at the center of every decision." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">

      {/* ── FOUNDER PORTRAIT — circular ── */}
      <section className="pt-16 md:pt-20 text-center px-5">
        <ScrollReveal className="inline-block mb-8">
          <div className="relative mx-auto" style={{ width: 176, height: 176 }}>
            {/* Gold ring */}
            <div className="absolute -inset-1.5 rounded-full border border-[#C9A96E]/35" />
            {/* Circle image */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#EDE6D8]
                             shadow-[0_8px_40px_rgba(201,169,110,0.22)]">
              <Image
                src="/images/team/founder-kayla.png"
                alt="Kayla Ford, Founder & Licensed Esthetician, Epoch Skin"
                fill
                className="object-cover object-top"
                sizes="176px"
                priority
              />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1C1C1A]">Our Epoch</h1>
        </ScrollReveal>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-white mt-12 py-16 px-5">
        <div className="max-w-[780px] mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Our Story</p>
            <h2 className="font-serif text-4xl text-[#1C1C1A]">Our Story</h2>
          </ScrollReveal>
          <ScrollReveal delay={100} className="space-y-5 text-[#5A5550] font-sans text-sm leading-relaxed">
            <p>Kayla Ford founded Epoch Skin after experiencing firsthand the damage that harsh, synthetic products inflict — and the frustration of finding no Organic-first studio in New Orleans that took clean formulation seriously enough to deliver real results.</p>
            <p>From formulating in her kitchen to opening Epoch Skin, the journey is guided by a single belief: the beauty community deserves better — Skincare rooted in transparency, certification, and the science of genuinely healthy skin.</p>
            <p>Today, every product is small-batch formulated with certified Organic ingredients. Every service is performed by a Louisiana State Board licensed esthetician. And every client leaves feeling seen, cared for, and radiant.</p>
          </ScrollReveal>
          <ScrollReveal className="text-center mt-10" delay={150}>
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-3.5
                       border border-[#1C1C1A] text-[#1C1C1A] text-[11px] tracking-[0.22em] uppercase font-sans
                       hover:bg-[#1C1C1A] hover:text-[#C9A96E] transition-all duration-400">
              Book a Service
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ETYMOLOGY ── */}
      <section className="py-12 px-5 bg-[#FAF7F2]">
        <div className="max-w-[620px] mx-auto">
          <ScrollReveal className="border border-[#E5DCCF] bg-white p-8">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">ep · och</p>
            <p className="font-serif text-2xl text-[#1C1C1A] mb-3 italic">/ˈepək/ · noun</p>
            <p className="text-[#5A5550] text-sm font-sans leading-relaxed mb-4">A fixed point in time from which a new chapter begins.</p>
            <div className="border-l-2 border-[#C9A96E] pl-5">
              <p className="text-[#2E2E2C] text-sm font-sans leading-relaxed italic">
                &ldquo;For us, Epoch is the moment your skin&apos;s story changes — when you choose formulas that nourish instead of strip, that honor your body&apos;s natural intelligence.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GLASS SKIN PHILOSOPHY ── */}
      <section className="py-16 md:py-20 px-5 bg-[#FAF7F2]">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Our</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1A]">Glass Skin Philosophy</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {PHILOSOPHY.map((card, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-[#5F6F5A] text-white p-8 text-center hover:bg-[#4A5745] transition-colors duration-400 group h-full">
                  <div className="text-[#C9A96E] mb-5 flex justify-center group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                  <h3 className="font-serif text-xl mb-3">{card.title}</h3>
                  <p className="text-[#C4D0C2] text-xs font-sans leading-relaxed">{card.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STEP RITUAL ── */}
      <section className="py-16 md:py-20 px-5 bg-white">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="relative aspect-[4/3] bg-[#EDE6D8] overflow-hidden">
              <Image src="/images/services/organic-facial.png" alt="Glass skin layering technique"
                fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-[#C9A96E]/50" />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="w-10 h-px bg-[#C9A96E] mb-5" />
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">K-Beauty Method</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] mb-8">The 4-Step Ritual</h2>
              <div className="space-y-6">
                {STEPS.map(step => (
                  <div key={step.num} className="flex gap-5 items-start group">
                    <span className="font-serif text-2xl text-[#E8D5A8] flex-shrink-0 leading-none group-hover:text-[#C9A96E] transition-colors duration-300">{step.num}</span>
                    <div>
                      <p className="text-[#1C1C1A] text-sm font-sans font-medium tracking-wide mb-1">{step.label}</p>
                      <p className="text-[#8C8680] text-xs font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/shop" className="inline-flex items-center justify-center mt-10 px-8 py-3.5
                         bg-[#1C1C1A] text-[#C9A96E] text-[11px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#1C1C1A] transition-all duration-400">
                Shop the Ritual
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ── VALUES ── */}
      <section className="py-16 md:py-20 px-5 bg-white">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
            <h2 className="font-serif text-4xl text-[#1C1C1A]">Our Values</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <div className="border border-[#E5DCCF] p-8 bg-white h-full hover:border-[#C9A96E]/50 hover:bg-[#FAF7F2] transition-all duration-400">
                  <span className="block text-[#C9A96E] text-xl mb-5">{v.icon}</span>
                  <h3 className="font-serif text-lg text-[#1C1C1A] mb-3">{v.title}</h3>
                  <p className="text-[#8C8680] text-sm font-sans leading-relaxed">{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSPARENCY ── */}
      <section className="bg-[#1C1C1A] py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-4">Full Transparency</p>
          <h2 className="font-serif text-4xl text-white mb-6">We List Every Ingredient</h2>
          <p className="text-[#6E6860] font-sans text-sm leading-relaxed mb-4">Every formula lists ingredients in INCI format — we mark which are certified Organic, provide pH ranges, storage guidance, and usage instructions.</p>
          <p className="text-[#3A3A38] text-xs font-sans">These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </section>

      {/* ── FOLLOW OUR JOURNEY — blank placeholders ── */}
      <section className="py-16 md:py-20 px-5 bg-[#FAF7F2] text-center">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal className="mb-10">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Follow Our Journey</p>
            <h2 className="font-serif text-4xl text-[#1C1C1A] mb-2">@epoch_skin</h2>
            <p className="text-[#8C8680] font-sans text-sm">Behind the formulas, inside the studio, and real client skin.</p>
          </ScrollReveal>

          {/* Blank placeholder grid — will be replaced with Behold embed */}
          <div className="grid grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-[#EDE6D8] flex items-center justify-center">
                <span className="text-[#C9A96E]/30 text-3xl">✦</span>
              </div>
            ))}
          </div>

          <a href="https://instagram.com/epoch_skin" target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5
                       border border-[#1C1C1A] text-[#1C1C1A] text-[11px] tracking-[0.22em] uppercase font-sans
                       hover:bg-[#1C1C1A] hover:text-[#C9A96E] transition-all duration-400">
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-5 bg-[#EDE6D8] text-center">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-6" />
            <p className="font-serif text-3xl md:text-4xl text-[#1C1C1A] mb-8">Ready to begin your epoch?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="inline-flex items-center justify-center px-10 py-3.5
                         bg-[#1C1C1A] text-[#C9A96E] text-[11px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#1C1C1A] transition-all duration-400">
                Book Appointment
              </Link>
              <Link href="/shop" className="inline-flex items-center justify-center px-10 py-3.5
                         border border-[#1C1C1A] text-[#1C1C1A] text-[11px] tracking-[0.22em] uppercase font-sans
                         hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-400">
                Shop Skincare
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
