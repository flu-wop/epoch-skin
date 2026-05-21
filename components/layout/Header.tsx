"use client";
// components/layout/Header.tsx

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

export function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items }             = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F8F4EF]/96 backdrop-blur-md border-b border-[#E8E0D5]"
          : "bg-[#F8F4EF] border-b border-transparent"
      }`}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 -ml-1">
            <Image
              src="/logo.png"
              alt="Epoch Skin"
              width={160}
              height={54}
              className="h-11 w-auto"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative group text-[11px] tracking-[0.18em] uppercase text-[#6E6860]
                           hover:text-[#18181A] transition-colors duration-300"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A96E]
                                 group-hover:w-full transition-all duration-400" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/book"
              className="hidden md:inline-flex items-center px-5 py-2
                         border border-[#C9A96E] text-[#C9A96E]
                         text-[10px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#18181A]
                         transition-all duration-400"
            >
              Book Now
            </Link>

            <Link href="/cart" className="relative p-1 group" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 text-[#6E6860] group-hover:text-[#C9A96E] transition-colors duration-300" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center
                                 bg-[#C9A96E] text-[#18181A] text-[9px] font-semibold rounded-full leading-none">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1 text-[#6E6860] hover:text-[#18181A] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        open ? "max-h-[420px] border-t border-[#E8E0D5]" : "max-h-0"
      }`}>
        <div className="page-container py-7 space-y-5 bg-[#F8F4EF]">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-[12px] tracking-[0.2em] uppercase text-[#6E6860]
                         hover:text-[#C9A96E] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="block text-center py-3.5 border border-[#C9A96E]
                       text-[#C9A96E] text-[10px] tracking-[0.22em] uppercase
                       hover:bg-[#C9A96E] hover:text-[#18181A] transition-all"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
