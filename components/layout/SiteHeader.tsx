"use client";
// components/layout/SiteHeader.tsx
// ── Uniform header for ALL pages ──
// Logo: h-10 (40px) desktop, h-9 (36px) mobile — matches Tatcha/Auteur scale
// Nav: small caps, gold hover underline
// Book Now: gold outline pill, right-aligned

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";

const NAV = [
  { label: "Shop",     href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Journal",  href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items }             = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-400 ${
      scrolled
        ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DCCF]"
        : "bg-[#FAF7F2] border-b border-[#EDE6D8]"
    }`}>
      {/* ── Main nav row ── */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo — h-10 = 40px, correct luxury scale */}
          <Link href="/" className="flex-shrink-0" aria-label="Epoch Skin">
            <Image
              src="/logos/header-logo.png"
              alt="Epoch Skin"
              width={200}
              height={52}
              className="h-10 w-auto"   /* 40px tall — clean, not tiny, not huge */
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
            {NAV.map(({ label, href }) => (
              <Link key={label} href={href}
                className="relative group text-[11px] tracking-[0.16em] uppercase
                           font-sans text-[#5A5550] hover:text-[#1C1C1A]
                           transition-colors duration-300">
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A96E]
                                  group-hover:w-full transition-all duration-400" />
              </Link>
            ))}
          </nav>

          {/* Right: Book Now + cart + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link href="/book"
              className="hidden md:inline-flex items-center px-5 py-2
                         border border-[#C9A96E] text-[#C9A96E]
                         text-[10px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#1C1C1A]
                         transition-all duration-400">
              Book Now
            </Link>

            <Link href="/cart" className="relative p-1 group" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 text-[#5A5550] group-hover:text-[#C9A96E] transition-colors" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center
                                  bg-[#C9A96E] text-[#1C1C1A] text-[9px] font-semibold rounded-full">
                  {count}
                </span>
              )}
            </Link>

            <button onClick={() => setOpen(!open)}
              className="md:hidden p-1 text-[#5A5550] hover:text-[#1C1C1A] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        open ? "max-h-[440px] border-t border-[#E5DCCF]" : "max-h-0"
      }`}>
        <nav className="max-w-[1320px] mx-auto px-5 py-7 space-y-5 bg-[#FAF7F2]">
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}
              className="block text-[12px] tracking-[0.18em] uppercase font-sans
                         text-[#5A5550] hover:text-[#C9A96E] transition-colors">
              {label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)}
            className="block text-center py-3.5 border border-[#C9A96E] text-[#C9A96E]
                       text-[10px] tracking-[0.22em] uppercase font-sans
                       hover:bg-[#C9A96E] hover:text-[#1C1C1A] transition-all mt-2">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
