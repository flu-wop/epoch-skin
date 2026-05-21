"use client";
// components/home/HeroSection.tsx

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const [ready, setReady]   = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Small delay so CSS transitions feel intentional
    const t = setTimeout(() => setReady(true), 80);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const parallax = scrollY * 0.28;

  return (
    <section className="relative h-[91vh] min-h-[580px] max-h-[1020px] overflow-hidden bg-[#18181A]">

      {/* Parallax image */}
      <div
        className="absolute inset-0 scale-[1.08]"
        style={{ transform: `translateY(${parallax}px) scale(1.08)` }}
      >
        <Image
          src="/images/hero/hero-skin.jpg"
          alt="Radiant glowing skin"
          fill
          className="object-cover object-center"
          priority
          quality={92}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#18181A]/85 via-[#18181A]/45 to-[#18181A]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/70 via-transparent to-transparent" />

      {/* Warm gold vignette edge */}
      <div className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 120px rgba(201,169,110,0.06)" }} />

      {/* Content */}
      <div className="relative h-full page-container flex flex-col justify-center pb-12">
        <div className="max-w-[600px]">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-7"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.9s ease 0s, transform 0.9s ease 0s",
            }}
          >
            <span className="w-7 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.32em] uppercase font-sans">
              New Orleans · Organic Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[3.2rem] sm:text-[4rem] lg:text-[5rem] text-white leading-[1.06] mb-5"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 1s ease 0.18s, transform 1s ease 0.18s",
            }}
          >
            A New Era of<br />
            <em className="not-italic text-[#D4AF77]">Radiant Skin.</em>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-[#C8C0B8] text-base sm:text-lg font-sans font-light leading-relaxed
                       tracking-[0.06em] mb-3"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 1s ease 0.32s, transform 1s ease 0.32s",
            }}
          >
            Organic · Luxurious · Transformative
          </p>

          <p
            className="text-[#9A9088] text-sm font-sans font-light leading-relaxed max-w-[420px] mb-10"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 1s ease 0.42s, transform 1s ease 0.42s",
            }}
          >
            Certified organic formulas and expert waxing services rooted in 
            K-Beauty glass-skin philosophy. By licensed estheticians, for real results.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1s ease 0.56s, transform 1s ease 0.56s",
            }}
          >
            <Link
              href="/book"
              className="px-9 py-4 bg-[#C9A96E] text-[#18181A]
                         text-[10px] tracking-[0.25em] uppercase font-sans font-medium
                         hover:bg-[#D4AF77] active:scale-[0.98]
                         transition-all duration-400
                         hover:shadow-[0_0_32px_rgba(212,175,119,0.35)]"
            >
              Book Appointment
            </Link>
            <Link href="/shop" className="btn-ghost text-[10px]">
              Shop Skincare
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: ready ? 0.45 : 0, transition: "opacity 1s ease 1.2s" }}
      >
        <span className="text-white text-[9px] tracking-[0.25em] uppercase font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
