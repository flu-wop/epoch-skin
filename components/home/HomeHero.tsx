"use client";
// components/home/HomeHero.tsx

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function HomeHero() {
  const [ready, setReady]     = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef                = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] max-h-[960px] overflow-hidden bg-[#3E4A3C]">

      {/* Parallax background */}
      <div
        className="absolute inset-0 scale-[1.08]"
        style={{ transform: `translateY(${scrollY * 0.22}px) scale(1.08)` }}
      >
        <Image
          src="/background/botanical-lay.png"
          alt="Organic botanicals and Skincare"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3E4A3C]/85 via-[#3E4A3C]/55 to-[#3E4A3C]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3E4A3C]/65 via-transparent to-transparent" />

      {/* Hero content */}
      <div className="relative h-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12
                       flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-[600px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(14px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
            <span className="w-7 h-px bg-[#D4AA6A]" />
            <span className="text-[#D4AA6A] text-[10px] tracking-[0.32em] uppercase font-sans">
              New Orleans · Organic Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-white leading-[1.05] mb-4"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(24px)", transition: "opacity 1s ease 0.18s, transform 1s ease 0.18s" }}
          >
            A New Era of<br />
            <em className="not-italic text-[#D4AA6A]">Radiant Skin</em>
          </h1>

          {/* Sub */}
          <p className="text-[#D4AA6A]/85 font-sans text-base sm:text-lg tracking-[0.06em] mb-10"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "opacity 1s ease 0.32s, transform 1s ease 0.32s" }}>
            Organic · Luxurious · Transformative
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(14px)", transition: "opacity 1s ease 0.46s, transform 1s ease 0.46s" }}>
            <Link href="/book"
              className="px-9 py-4 bg-[#C4974A] text-white text-[10px] tracking-[0.26em]
                         uppercase font-sans font-medium hover:bg-[#D4AA6A]
                         transition-all duration-400 active:scale-[0.98]">
              Book Appointment
            </Link>
            <Link href="/shop"
              className="px-9 py-4 border border-white/30 text-white text-[10px] tracking-[0.26em]
                         uppercase font-sans hover:border-[#C4974A] hover:text-[#C4974A]
                         transition-all duration-400">
              Shop Skincare
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2"
        style={{ opacity: ready ? 0.4 : 0, transition: "opacity 1s ease 1.2s" }}>
        <span className="text-white text-[9px] tracking-[0.22em] uppercase font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
