import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50 py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-tight">
            Premium Waxing Studio
            <br />
            <span className="text-clay-600">& Organic Skincare</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed px-4 sm:px-0">
            Experience expert waxing services and curated organic skincare in New Orleans. 
            Natural, luxurious, and effective treatments for your skin.
          </p>

          {/* CTA Buttons */}
<div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
  <Button
    asChild
    size="lg"
    className="bg-clay-500 hover:bg-clay-600 w-full sm:w-auto text-base"
  >
    <Link href="/book">Book Your Appointment</Link>
  </Button>
</div>

          {/* Trust indicators */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-neutral-600 px-4 sm:px-0">
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