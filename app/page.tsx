// app/page.tsx

import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ServiceCategoryCards } from "@/components/home/ServiceCategoryCards";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import FAQ from "@/components/home/FAQ";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />

      {/* ── Marquee / brand statement ── */}
      <div className="bg-[#18181A] py-5 overflow-hidden">
        <div className="flex items-center gap-12 animate-[shimmer_18s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-[10px] tracking-[0.28em] uppercase font-sans text-[#4A4A48] flex-shrink-0">
              <span>Certified Organic</span>
              <span className="text-[#C9A96E] text-base">✦</span>
              <span>Cruelty-Free</span>
              <span className="text-[#C9A96E] text-base">✦</span>
              <span>Glass-Skin Protocol</span>
              <span className="text-[#C9A96E] text-base">✦</span>
              <span>New Orleans Studio</span>
              <span className="text-[#C9A96E] text-base">✦</span>
            </span>
          ))}
        </div>
      </div>

      <ServiceCategoryCards />
      <FeaturedProducts />

      {/* ── Philosophy strip ── */}
      <section className="bg-[#F2ECE4] section-y-sm">
        <div className="page-container">
          <div className="grid md:grid-cols-3 gap-px bg-[#E8E0D5]">
            {[
              { num: "14", label: "Organic Formulas", sub: "Cold-process, batch-tested" },
              { num: "3+", label: "Years of Expertise", sub: "LA State Board licensed" },
              { num: "0",  label: "Synthetic Fragrances", sub: "Ever. In any formula." },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#F2ECE4] px-10 py-12 text-center group hover:bg-white transition-colors duration-400">
                <p className="font-serif text-5xl text-[#C9A96E] mb-3 group-hover:text-[#18181A] transition-colors duration-400">
                  {stat.num}
                </p>
                <p className="text-[#18181A] text-sm font-sans tracking-wide mb-1">{stat.label}</p>
                <p className="text-[#9A9088] text-xs font-sans">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Newsletter />
    </>
  );
}
