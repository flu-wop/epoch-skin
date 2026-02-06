"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/hooks/useCart";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-serif text-2xl font-semibold tracking-tight text-sage-900 transition-colors hover:text-sage-700"
          >
            Epoch Skin
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-sage-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Book Now button - hidden on mobile to save space */}
            <Button 
              asChild 
              className="hidden bg-clay-500 hover:bg-clay-600 sm:inline-flex"
            >
              <Link href="/book">Book Now</Link>
            </Button>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 transition-colors hover:bg-sage-50"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5 text-neutral-700" />
              {/* Cart count badge */}
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-clay-500 text-xs font-medium text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-neutral-700 transition-colors hover:bg-sage-50 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <nav className="flex flex-col space-y-4 pb-4 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-700 transition-colors hover:text-sage-600"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-clay-500 hover:bg-clay-600">
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                Book Now
              </Link>
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
