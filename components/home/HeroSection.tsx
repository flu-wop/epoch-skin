import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sage-50 via-sand-50 to-rose-50 py-24 sm:py-32 md:py-40 lg:py-48">
      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Location badge */}
          <p className="text-sm uppercase tracking-widest text-sage-700 mb-4 font-medium">
            New Orleans
          </p>
          
          {/* Heading with gradient */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Premium Waxing Studio
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay-600 to-rose-500">
              & Organic Skincare
            </span>
          </h1>

          {/* Enhanced subheading */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl mx-auto" style={{ letterSpacing: '0.01em', lineHeight: '1.7' }}>
            Experience expert waxing services and curated Organic skincare in New Orleans. Natural, luxurious, and effective treatments for your skin.
          </p>

          {/* CTA Button with better copy */}
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-clay-500 hover:bg-rose-500 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Link href="/book">Book Your Appointment</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Licensed Estheticians</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Organic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Premium Experience</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
