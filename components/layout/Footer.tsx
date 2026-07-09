"use client";
// components/layout/Footer.tsx

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { useState } from "react";

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return <p className="text-[#C4974A] text-sm font-sans italic">You&apos;re in. Check your inbox. ✨</p>;
  }
  return (
    <form onSubmit={submit} className="flex gap-0">
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        required placeholder="your@email.com"
        className="flex-1 px-3.5 py-3 bg-[#3E4A3C] border border-[#526050] text-white
                   placeholder-[#7A9174] text-sm font-sans
                   focus:outline-none focus:border-[#C4974A] transition-colors min-w-0"
      />
      <button type="submit" disabled={status === "loading"}
        className="px-5 py-3 bg-[#C4974A] text-white text-[10px] tracking-[0.18em]
                   uppercase font-sans font-medium hover:bg-[#D4AA6A] disabled:opacity-50
                   transition-colors whitespace-nowrap flex-shrink-0">
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2E3A2C]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C4974A]/35 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-1">Epoch Skin</p>
            <p className="text-[#C4974A] text-[9px] tracking-[0.24em] uppercase font-sans mb-5">
              New Orleans · Est. 2026
            </p>
            <p className="text-[#7A9174] text-sm font-sans leading-relaxed mb-6">
              Certified Organic Skincare and expert waxing, rooted in K-Beauty glass-skin philosophy.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="https://instagram.com/epoch_skin" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-[#526050] flex items-center justify-center
                           text-[#7A9174] hover:text-[#C4974A] hover:border-[#C4974A]/40 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/people/Epoch-Skin/61586356767825/" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-[#526050] flex items-center justify-center
                           text-[#7A9174] hover:text-[#C4974A] hover:border-[#C4974A]/40 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@epoch_skin" target="_blank" rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 border border-[#526050] flex items-center justify-center
                           text-[#7A9174] hover:text-[#C4974A] hover:border-[#C4974A]/40 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.4a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href="https://x.com/epoch_skin" target="_blank" rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 border border-[#526050] flex items-center justify-center
                           text-[#7A9174] hover:text-[#C4974A] hover:border-[#C4974A]/40 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C4974A] font-sans mb-6">Explore</p>
            <ul className="space-y-3.5">
              {[
                ["Shop Skincare", "/shop"],
                ["Services", "/services"],
                ["Book Appointment", "/book"],
                ["About Us", "/about"],
                ["Journal", "/blog"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-[#7A9174] text-sm font-sans hover:text-[#C4974A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C4974A] font-sans mb-6">Contact</p>
            <ul className="space-y-4 text-sm font-sans">
              <li>
                <a href="tel:+15047774094"
                  className="inline-flex items-center px-4 py-2 border border-[#7A9174]/40
                             text-[#C4974A] text-[10px] tracking-[0.18em] uppercase font-sans
                             hover:bg-[#C4974A] hover:text-white hover:border-[#C4974A] transition-colors duration-300">
                  Call Now
                </a>
              </li>
              <li>
                <a href="mailto:kayla@epoch-skin.com"
                  className="text-[#7A9174] hover:text-[#C4974A] transition-colors">
                  kayla@epoch-skin.com
                </a>
              </li>
              <li className="text-[#7A9174] leading-relaxed pt-1">
                New Orleans, Louisiana
              </li>
              <li className="text-[#7A9174] text-xs pt-1">
                By appointment only
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C4974A] font-sans mb-6">Newsletter</p>
            <p className="text-[#7A9174] text-sm font-sans mb-4 leading-relaxed">
              Skincare tips, exclusive offers, and 20% off your first order.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#526050] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#526050] text-xs font-sans">© 2026 Epoch Skin. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms of Service", "/terms-of-service"],
              ["Shipping & Returns", "/shipping-returns"],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                className="text-[#526050] text-xs font-sans hover:text-[#C4974A] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
