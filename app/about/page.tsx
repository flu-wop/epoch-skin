// app/about/page.tsx

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

const VALUES = [
  {
    icon: "✦",
    title: "Organic First",
    body: "Only certified organic extracts and botanicals — INCI-listed, batch-tested, transparently sourced. No greenwashing.",
  },
  {
    icon: "◈",
    title: "Cruelty-Free",
    body: "Never tested on animals. We vet every supplier and refuse any ingredient with an ethically compromised supply chain.",
  },
  {
    icon: "◇",
    title: "Visible Results",
    body: "Every formula and service is engineered for measurable skin improvement — not just a pleasant experience.",
  },
  {
    icon: "○",
    title: "Client-Centered",
    body: "Your comfort, safety, and confidence are the non-negotiable center of every decision we make.",
  },
];

const GLASS_STEPS = [
  { num: "01", label: "Cleanse", desc: "Sulfate-free, pH-balanced. Remove without stripping." },
  { num: "02", label: "Tone",    desc: "Prep the canvas. Restore balance, prime for absorption." },
  { num: "03", label: "Serum",   desc: "Snow mushroom and beta-glucan for deep, sustained hydration." },
  { num: "04", label: "Seal",    desc: "Barrier cream locks every layer in. Glass skin, achieved." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8F4EF]">

      {/* ── Hero Banner ── */}
      <section className="relative bg-[#18181A] py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #C9A96E 0%, transparent 65%)" }} />
        <div className="page-container relative text-center">
          <div className="gold-rule mx-auto mb-5" />
          <p className="eyebrow mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 max-w-2xl mx-auto leading-tight">
            Built on a Belief in
            <em className="not-italic text-[#D4AF77]"> Better.</em>
          </h1>
          <p className="text-[#9A9088] font-sans text-base leading-relaxed max-w-lg mx-auto">
            Founded in New Orleans by a licensed esthetician who couldn't find 
            organic waxing and skincare that actually worked — so she built it.
          </p>
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="section-y">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Portrait */}
            <div>
              <div className="relative aspect-[3/4] bg-[#EAE2D8] overflow-hidden">
                <Image
                  src="/images/team/kayla-ford.jpg"
                  alt="Kayla Ford, Founder & Licensed Esthetician, Epoch Skin"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/60 via-transparent to-transparent" />
                {/* Name badge */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="font-serif text-white text-xl mb-1">Kayla Ford</p>
                  <p className="text-[#C9A96E] text-[10px] tracking-[0.22em] uppercase font-sans">
                    Founder · Licensed Esthetician
                  </p>
                </div>
                {/* Gold corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#C9A96E]/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#C9A96E]/50" />
              </div>
              <p className="text-[#9A9088] text-xs font-sans mt-4 tracking-wide">
                LA State Board Licensed · 3+ Years Experience · Certified in Organic Facials & Waxing
              </p>
            </div>

            {/* Story */}
            <div className="pt-4">
              {/* Etymology card */}
              <div className="border border-[#E8E0D5] bg-white p-8 mb-10">
                <p className="eyebrow mb-2">ep · och</p>
                <p className="font-serif text-2xl text-[#18181A] mb-3 italic">/ˈepək/ · noun</p>
                <p className="text-[#9A9088] text-sm font-sans leading-relaxed mb-4">
                  A fixed point in time from which a new chapter begins.
                </p>
                <div className="border-l-2 border-[#C9A96E] pl-5">
                  <p className="text-[#6E6860] text-sm font-sans leading-relaxed italic">
                    "For us, Epoch is the moment your skin's story changes — when you choose formulas 
                    that nourish instead of strip, that honor your body's natural intelligence."
                  </p>
                </div>
              </div>

              <div className="gold-rule mb-6" />
              <h2 className="font-serif text-3xl text-[#18181A] mb-7">Our Story</h2>
              <div className="space-y-5 text-[#6E6860] font-sans text-sm leading-relaxed">
                <p>
                  Epoch Skin was born from firsthand frustration. Kayla experienced years of irritation 
                  and sensitivity from harsh waxing products and synthetic skincare — and couldn't find 
                  a studio in New Orleans that took clean formulation seriously.
                </p>
                <p>
                  So she built one. Kayla spent years studying certified organic formulation, K-Beauty 
                  glass-skin protocols, and gentle waxing techniques before launching Epoch Skin. 
                  Every product is small-batch formulated. Every service is performed by a Louisiana 
                  State Board licensed esthetician.
                </p>
                <p>
                  Today, Epoch Skin is more than a studio — it's a commitment. To transparency, to results, 
                  and to every client who walks through the door.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/book" className="btn-primary">Book a Service</Link>
                <Link href="/shop" className="btn-outline">Shop the Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-y bg-[#F2ECE4]">
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="gold-rule mx-auto mb-5" />
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="font-serif text-4xl text-[#18181A]">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card group">
                <span className="block text-[#C9A96E] text-xl mb-5 group-hover:scale-110
                                  transition-transform duration-300">{v.icon}</span>
                <h3 className="font-serif text-lg text-[#18181A] mb-3">{v.title}</h3>
                <p className="text-[#9A9088] text-sm font-sans leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glass Skin Philosophy ── */}
      <section className="section-y bg-[#F8F4EF]">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-[#EAE2D8] overflow-hidden order-2 md:order-1">
              <Image
                src="/images/blog/glass-skin.jpg"
                alt="Glass skin layering technique"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/30 to-transparent" />
              {/* Corner accent */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-[#C9A96E]/60" />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="gold-rule mb-5" />
              <p className="eyebrow mb-3">K-Beauty Method</p>
              <h2 className="font-serif text-4xl text-[#18181A] mb-8">
                The Glass-Skin
                <br /><em className="not-italic text-[#C9A96E]">Layering Protocol</em>
              </h2>

              <div className="space-y-6 mb-10">
                {GLASS_STEPS.map((step) => (
                  <div key={step.num} className="flex gap-5 items-start group">
                    <span className="font-serif text-[#E8D5A8] text-2xl leading-none flex-shrink-0
                                     group-hover:text-[#C9A96E] transition-colors duration-300">
                      {step.num}
                    </span>
                    <div>
                      <p className="text-[#18181A] text-sm font-sans font-medium tracking-wide mb-1">
                        {step.label}
                      </p>
                      <p className="text-[#9A9088] text-xs font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/shop" className="btn-primary">Shop the Routine</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparency Banner ── */}
      <section className="bg-[#18181A] py-20 px-6">
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="gold-rule mx-auto mb-5" />
          <p className="eyebrow mb-4">Full Transparency</p>
          <h2 className="font-serif text-4xl text-white mb-6">We List Every Ingredient</h2>
          <p className="text-[#6E6860] font-sans text-sm leading-relaxed mb-4">
            Every formula lists ingredients in INCI format. We mark which are certified organic, 
            provide pH ranges, storage guidance, and usage instructions.
          </p>
          <p className="text-[#3C3C3E] text-xs font-sans">
            These statements have not been evaluated by the FDA. Products are not intended to diagnose, 
            treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section className="section-y bg-[#F8F4EF]">
        <div className="page-container text-center">
          <div className="gold-rule mx-auto mb-5" />
          <p className="eyebrow mb-3">Follow Our Journey</p>
          <h2 className="font-serif text-4xl text-[#18181A] mb-3">@epoch_skin</h2>
          <p className="text-[#9A9088] font-sans text-sm mb-10">
            Behind the formulas, inside the studio, and real client skin.
          </p>

          {/* Placeholder grid — replace with Behold/Curator embed */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-10 max-w-3xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#EAE2D8] overflow-hidden group cursor-pointer">
                <div className="w-full h-full flex items-center justify-center
                                 group-hover:bg-[#18181A] transition-colors duration-400">
                  <span className="text-[#C9A96E]/30 text-3xl group-hover:opacity-60 transition-opacity">✦</span>
                </div>
              </div>
            ))}
          </div>
          {/*
            INSTAGRAM FEED: Sign up at behold.so, connect @epoch_skin, paste embed below.
            Example: <div id="behold-widget-YOURFEEDID"></div>
          */}

          <a
            href="https://instagram.com/epoch_skin"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-y-sm bg-[#EAE2D8] text-center">
        <div className="page-container">
          <div className="gold-rule mx-auto mb-5" />
          <p className="font-serif text-3xl md:text-4xl text-[#18181A] mb-8">
            Ready to begin your epoch?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">Book Appointment</Link>
            <Link href="/shop" className="btn-outline">Shop Skincare</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
