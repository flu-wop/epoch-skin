import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Container } from "./Container";
import { 
  SITE_NAME, 
  CONTACT_EMAIL, 
  CONTACT_PHONE, 
  STUDIO_ADDRESS,
  SOCIAL_LINKS,
  NAV_LINKS 
} from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-sage-50">
      <Container>
        {/* Main footer content */}
        <div className="grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-sage-900">
              {SITE_NAME}
            </h3>
            <p className="text-sm text-neutral-600">
              Premium waxing studio and curated skincare products. Natural, 
              luxurious, and effective treatments for your skin.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 transition-colors hover:bg-sage-100"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-sage-700" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 transition-colors hover:bg-sage-100"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-sage-700" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-sage-900">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-600 transition-colors hover:text-sage-700"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                className="text-sm text-neutral-600 transition-colors hover:text-sage-700"
              >
                Book Appointment
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-sage-900">
              Contact
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-neutral-600">
              <p>
                {STUDIO_ADDRESS.street}<br />
                {STUDIO_ADDRESS.city}, {STUDIO_ADDRESS.state} {STUDIO_ADDRESS.zip}
              </p>
              <a 
                href={`tel:${CONTACT_PHONE}`}
                className="transition-colors hover:text-sage-700"
              >
                {CONTACT_PHONE}
              </a>
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors hover:text-sage-700"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Newsletter signup - placeholder for now */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-sage-900">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-600">
              Subscribe for skincare tips, exclusive offers, and updates.
            </p>
            {/* Newsletter form will be added in later phase */}
            <div className="text-sm text-neutral-500">
              Coming soon
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-neutral-600 md:flex-row">
          <p>© {currentYear} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link 
              href="/privacy" 
              className="transition-colors hover:text-sage-700"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="transition-colors hover:text-sage-700"
            >
              Terms of Service
            </Link>
            <Link 
              href="/shipping-returns" 
              className="transition-colors hover:text-sage-700"
            >
              Shipping & Returns
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
