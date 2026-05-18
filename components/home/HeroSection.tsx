"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section ref={heroRef} className="relative h-[92vh] min-h-[640px] max-h-[960px] overflow-hidden bg-[#1A1A18]">

      {/* Parallax background image */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/images/hero/hero-skin.jpg"
          alt="Radiant organic skin"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/80 via-[#1A1A18]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 via-transparent to-transparent" />
      </div>

      {/* Gold grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url('/images/textures/grain.png')", backgroundRepeat: "repeat" }} />

      {/* Content */}
      <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-sans">
              New Orleans · Est. 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] text-white leading-[1.08] mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            A New Era of
            <br />
            <em className="text-[#D4AF77] not-italic">Radiant Skin.</em>
          </h1>

          {/* Subheading */}
          <p
            className="text-[#C4BFB8] text-lg leading-relaxed mb-10 max-w-md font-sans font-light"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            Certified organic skincare and expert waxing services, 
            rooted in K-Beauty glass-skin philosophy.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s",
            }}
          >
            <Link
              href="/book"
              className="inline-flex items-center px-10 py-4 bg-[#C9A84C] text-[#1A1A18]
                         text-[11px] tracking-[0.25em] uppercase font-sans font-medium
                         hover:bg-[#D4AF77] transition-all duration-400
                         hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            >
              Book Appointment
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center px-10 py-4 border border-white/40 text-white
                         text-[11px] tracking-[0.25em] uppercase font-sans
                         hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-400"
            >
              Shop Skincare
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-sans">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
