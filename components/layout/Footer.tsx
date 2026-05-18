// components/layout/Footer.tsx

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-[#111110] text-white">
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl text-white mb-1">Epoch Skin</p>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase font-sans mb-5">
              New Orleans · Est. 2026
            </p>
            <p className="text-[#5A5A58] text-sm font-sans leading-relaxed">
              Certified organic skincare and expert waxing. Rooted in K-Beauty, formulated with intention.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { href: "https://instagram.com/epoch_skin", Icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com/EpochSkin", Icon: Facebook, label: "Facebook" },
                {
                  href: "https://tiktok.com/@epoch_skin",
                  label: "TikTok",
                  svg: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.4a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ),
                },
              ].map(({ href, Icon, svg, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-[#2C2C2A] flex items-center justify-center
                             text-[#5A5A58] hover:text-[#C9A84C] hover:border-[#C9A84C]/40
                             transition-all duration-300"
                >
                  {svg ?? (Icon && <Icon className="w-4 h-4" />)}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-sans mb-6">Explore</p>
            <ul className="space-y-3">
              {[
                ["Shop Skincare", "/shop"],
                ["Services", "/services"],
                ["Book Appointment", "/book"],
                ["About Us", "/about"],
                ["Journal", "/blog"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#5A5A58] text-sm font-sans hover:text-[#C9A84C] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-sans mb-6">Contact</p>
            <ul className="space-y-4 text-sm font-sans">
              <li>
                <a href="tel:+15047774094" className="text-[#5A5A58] hover:text-[#C9A84C] transition-colors">
                  (504) 777-4094
                </a>
              </li>
              <li>
                <a href="mailto:kayla@epoch-skin.com" className="text-[#5A5A58] hover:text-[#C9A84C] transition-colors">
                  kayla@epoch-skin.com
                </a>
              </li>
              <li className="text-[#5A5A58] leading-relaxed pt-2">
                New Orleans, Louisiana<br />
                & Mobile, Alabama
              </li>
              <li className="text-[#3A3A38] text-xs pt-2">
                Mon–Fri: 10am – 7pm<br />
                Sat: 9am – 5pm<br />
                Sun: By appointment
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-sans mb-6">Newsletter</p>
            <p className="text-[#5A5A58] text-sm font-sans mb-5 leading-relaxed">
              Skincare tips, exclusive offers, and early access to new formulas.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E1E1C] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#3A3A38] text-xs font-sans">© 2026 Epoch Skin. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms of Service", "/terms-of-service"],
              ["Shipping & Returns", "/shipping-returns"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[#3A3A38] text-xs font-sans hover:text-[#C9A84C] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
