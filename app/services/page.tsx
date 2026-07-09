// app/services/page.tsx
// Restyled to match Epoch luxury design system.
// Uses btn-gold, gold-rule, eyebrow, card-hover — no more clay/sage_legacy classes.

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Expert waxing and organic facial treatments in New Orleans. Book body waxing, facial waxing, or glass-skin treatment.",
  alternates: { canonical: "https://epoch-skin.com/services" },
};

const CATEGORIES = [
  {
    title: "Body Waxing",
    desc: "Full-body waxing with our organic hybrid wax — rosin-free, formulated with shea butter and squalane for minimal irritation.",
    services: ["Brazilian", "Bikini", "Full Legs", "Half Legs", "Full Arms", "Half Arms", "Underarm", "Stomach"],
    from: "From $20",
    href: "/book?category=body-wax",
  },
  {
    title: "Facial Waxing",
    desc: "Precision brow, lip, and chin waxing by Louisiana State Board licensed estheticians. Clean lines, no irritation.",
    services: ["Full Face", "Eyebrow", "Lip", "Chin", "Nose"],
    from: "From $8",
    href: "/book?category=facial-wax",
  },
  {
    title: "Organic Facials",
    desc: "The glass-skin layering protocol — certified organic actives, K-Beauty method, visible results in one session.",
    services: ["Organic Facial — $80 / 60 min", "Hydrating Facial — $50 / 30 min", "Glass Skin Treatment — $90 / 75 min"],
    from: "From $50",
    href: "/book?category=facials",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">

      {/* ── Hero ── */}
      <section className="py-20 md:py-28 text-center px-5">
        <div className="max-w-[1320px] mx-auto">
          <div className="gold-rule mx-auto mb-5" />
          <p className="eyebrow mb-3">New Orleans Studio</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1C1A] mb-5">
            Our Services
          </h1>
          <p className="text-[#5A5550] font-sans text-base leading-relaxed max-w-xl mx-auto">
            Expert waxing and organic facial treatments in New Orleans. 
            All services performed by licensed estheticians.
          </p>
        </div>
      </section>

      {/* ── Service category cards ── */}
      <section className="pb-20 md:pb-28 px-5">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {CATEGORIES.map((cat) => (
              <div key={cat.title}
                className="bg-white border border-[#E5DCCF] flex flex-col
                           hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(201,169,110,0.14)]
                           hover:border-[#C9A96E]/40 transition-all duration-500">
                {/* Card header */}
                <div className="px-7 pt-8 pb-6 border-b border-[#EDE6D8]">
                  <p className="eyebrow mb-2">{cat.from}</p>
                  <h2 className="font-serif text-2xl text-[#1C1C1A] mb-3">{cat.title}</h2>
                  <p className="text-[#8C8680] text-sm font-sans leading-relaxed">{cat.desc}</p>
                </div>

                {/* Services list */}
                <div className="px-7 py-6 flex-1">
                  <ul className="space-y-2.5">
                    {cat.services.map((svc) => (
                      <li key={svc} className="flex items-start gap-3 text-sm font-sans text-[#5A5550]">
                        <span className="text-[#C9A96E] mt-0.5 flex-shrink-0 text-xs">✦</span>
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7">
                  <Link href={cat.href}
                    className="block text-center py-3.5 bg-[#3E4A3C] text-[#C4974A]
                               text-[11px] tracking-[0.22em] uppercase font-sans font-medium
                               hover:bg-[#C4974A] hover:text-white transition-colors duration-300">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA strip ── */}
          <div className="bg-[#EDE6D8] px-8 py-12 text-center max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1A] mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-[#5A5550] font-sans text-sm leading-relaxed mb-8">
              Contact us and we'll help you choose the perfect treatment for your skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn-primary">Book Appointment</Link>
              <Link href="/contact" className="btn-outline-dark">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why organic waxing ── */}
      <section className="bg-white py-20 px-5">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-12">
            <div className="gold-rule mx-auto mb-5" />
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A]">
              Why Our Wax Is Different
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: "✦", title: "Rosin-Free Formula",   body: "Our organic hybrid wax beads contain zero rosin — the #1 cause of post-wax irritation and allergic reactions." },
              { icon: "◈", title: "Skin-Nourishing",      body: "Shea butter, rosehip oil, and squalane are blended into every wax bead to moisturize while removing." },
              { icon: "◇", title: "Licensed Estheticians",body: "Every service is performed by Louisiana State Board licensed estheticians trained in sensitive-skin protocols." },
            ].map((item) => (
              <div key={item.title}
                className="border border-[#E5DCCF] p-8
                           hover:border-[#C9A96E]/40 hover:bg-[#FAF7F2]
                           transition-all duration-400">
                <span className="block text-[#C9A96E] text-xl mb-5">{item.icon}</span>
                <h3 className="font-serif text-lg text-[#1C1C1A] mb-3">{item.title}</h3>
                <p className="text-[#8C8680] text-sm font-sans leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
