// components/layout/Footer.tsx

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-[#111110]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="page-container py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-1">Epoch Skin</p>
            <p className="text-[#C9A96E] text-[9px] tracking-[0.24em] uppercase font-sans mb-5">
              New Orleans · Est. 2026
            </p>
            <p className="text-[#4A4A48] text-sm font-sans leading-relaxed mb-6">
              Certified organic skincare and expert waxing, rooted in K-Beauty glass-skin philosophy.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://instagram.com/epoch_skin", Icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com/EpochSkin", Icon: Facebook, label: "Facebook" },
                {
                  href: "https://tiktok.com/@epoch_skin", label: "TikTok",
                  svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.4a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>,
                },
              ].map(({ href, Icon, svg, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                   className="w-8 h-8 border border-[#2A2A2C] flex items-center justify-center
                              text-[#4A4A48] hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300">
                  {svg ?? (Icon && <Icon className="w-4 h-4" />)}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C9A96E] font-sans mb-6">Explore</p>
            <ul className="space-y-3.5">
              {[["Shop Skincare","/shop"],["Services","/services"],["Book Appointment","/book"],["About Us","/about"],["Journal","/blog"]].map(([l,h])=>(
                <li key={l}>
                  <Link href={h} className="text-[#4A4A48] text-sm font-sans hover:text-[#C9A96E] transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C9A96E] font-sans mb-6">Contact</p>
            <ul className="space-y-4 text-sm font-sans">
              <li><a href="tel:+15047774094" className="text-[#4A4A48] hover:text-[#C9A96E] transition-colors">(504) 777-4094</a></li>
              <li><a href="mailto:kayla@epoch-skin.com" className="text-[#4A4A48] hover:text-[#C9A96E] transition-colors">kayla@epoch-skin.com</a></li>
              <li className="text-[#4A4A48] leading-relaxed pt-1">New Orleans, Louisiana<br/>& Mobile, Alabama</li>
              <li className="text-[#333333] text-xs pt-1">Mon–Fri 10am–7pm<br/>Sat 9am–5pm<br/>Sun By appointment</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#C9A96E] font-sans mb-6">Newsletter</p>
            <p className="text-[#4A4A48] text-sm font-sans mb-5 leading-relaxed">
              Skincare tips, exclusive offers, and 15% off your first order.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1C1C1A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#333333] text-xs font-sans">© 2026 Epoch Skin. All rights reserved.</p>
          <div className="flex gap-6">
            {[["Privacy Policy","/privacy-policy"],["Terms of Service","/terms-of-service"],["Shipping & Returns","/shipping-returns"]].map(([l,h])=>(
              <Link key={l} href={h} className="text-[#333333] text-xs font-sans hover:text-[#C9A96E] transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
