"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <Container>
        <div className="flex h-20 md:h-24 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="bg-white px-3 py-2 rounded-md">
              <Image
                src="/logos/horizontal-logo.png"
                alt="Epoch Skin"
                width={260}
                height={65}
                className="h-16 md:h-20 w-auto"
                priority
                style={{ background: "white" }}
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-neutral-700 hover:text-clay-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <Button
              asChild
              className="hidden sm:inline-flex bg-clay-500 hover:bg-clay-600 text-sm md:text-base"
              size="default"
            >
              <Link href="/book">Book Now</Link>
            </Button>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-sage-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6 text-sage-900" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-clay-500 text-white text-xs font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-sage-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-sage-900" />
              ) : (
                <Menu className="h-6 w-6 text-sage-900" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-base font-medium text-neutral-700 hover:bg-sage-50 hover:text-clay-600 rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-3 px-4 bg-clay-500 text-white text-center font-semibold rounded-lg hover:bg-clay-600 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}