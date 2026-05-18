"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";

const NAV = [
  { name: "Shop", href: "/shop" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Journal", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F8F5F0]/95 backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.15)]"
          : "bg-[#F8F5F0]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Epoch Skin"
              width={160}
              height={54}
              className="h-12 w-auto"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-[13px] tracking-[0.12em] uppercase text-[#4A4A48]
                           hover:text-[#1A1A18] transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A84C]
                                 group-hover:w-full transition-all duration-400" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/book"
              className="hidden md:inline-flex items-center px-6 py-2.5
                         border border-[#C9A84C] text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase
                         hover:bg-[#C9A84C] hover:text-[#1A1A18] transition-all duration-400"
            >
              Book Now
            </Link>

            <Link href="/cart" className="relative p-1 group">
              <ShoppingBag className="h-5 w-5 text-[#4A4A48] group-hover:text-[#C9A84C] transition-colors" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C9A84C] text-[#1A1A18]
                                 text-[10px] font-semibold rounded-full h-4 w-4
                                 flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1 text-[#4A4A48] hover:text-[#1A1A18] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 border-t border-[#E8E0D5]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 space-y-5 bg-[#F8F5F0]">
          {NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-[13px] tracking-[0.15em] uppercase text-[#4A4A48]
                         hover:text-[#C9A84C] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="block text-center py-3 border border-[#C9A84C] text-[#C9A84C]
                       text-[11px] tracking-[0.2em] uppercase
                       hover:bg-[#C9A84C] hover:text-[#1A1A18] transition-all"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
