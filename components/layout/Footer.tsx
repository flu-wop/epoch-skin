import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export function Footer() {
  return (
    <footer className="bg-sage-900 text-white py-12">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Epoch Skin</h3>
            <p className="text-sage-200">
              Premium waxing studio and curated organic skincare products. 
              Natural, luxurious, and effective treatments for your skin.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-clay-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-clay-300 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-clay-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-clay-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-clay-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="tel:5047774094" 
                  className="hover:text-clay-300 transition-colors"
                >
                  (504) 777-4094
                </a>
              </li>
              <li>
                <a 
                  href="mailto:kayla@epochskin.com" 
                  className="hover:text-clay-300 transition-colors"
                >
                  kayla@epochskin.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-sage-700 text-center text-sm text-sage-400">
          <p>© 2026 Epoch Skin. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-clay-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-clay-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping-returns" className="hover:text-clay-300 transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
