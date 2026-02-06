import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Expert waxing services including body waxing, facial waxing, and specialty treatments. Premium, gentle products for the most comfortable experience.",
};

export default function ServicesPage() {
  // Group services by category
  const bodyWaxing = services.filter(s => s.category === "body-waxing");
  const facialWaxing = services.filter(s => s.category === "facial-waxing");

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold text-sage-900 sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Experience the difference of expert waxing with our premium, gentle products. 
              We specialize in making you feel comfortable and confident with every visit.
            </p>
            <Button 
              asChild 
              size="lg"
              className="mt-8 bg-clay-500 hover:bg-clay-600"
            >
              <Link href="/book">Book Your Appointment</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Body Waxing section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-12">
            <h2 className="font-serif text-4xl font-bold text-sage-900">
              Body Waxing
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Professional body waxing services for smooth, long-lasting results.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bodyWaxing.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Facial Waxing section */}
      <section className="bg-sage-50/30 py-16 lg:py-24">
        <Container>
          <div className="mb-12">
            <h2 className="font-serif text-4xl font-bold text-sage-900">
              Facial Waxing
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Gentle, precise facial waxing to enhance your natural beauty.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facialWaxing.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Pre/Post care tips */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-4xl font-bold text-sage-900">
              Waxing Care Tips
            </h2>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Pre-care */}
              <div className="rounded-xl border border-sage-100 bg-white p-8">
                <h3 className="font-serif text-2xl font-semibold text-sage-900">
                  Before Your Appointment
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Ensure hair is at least 1/4 inch long for best results
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Exfoliate gently 24 hours before your appointment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Avoid caffeine and alcohol before your session
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Arrive with clean, dry skin (no lotions or oils)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Post-care */}
              <div className="rounded-xl border border-sage-100 bg-white p-8">
                <h3 className="font-serif text-2xl font-semibold text-sage-900">
                  After Your Appointment
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Avoid hot showers, saunas, and steam rooms for 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Skip the gym and avoid sweating for 24-48 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Wear loose, breathable clothing after your service
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
                    <span className="text-neutral-700">
                      Gently exfoliate 2-3 times per week to prevent ingrown hairs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-br from-clay-50 to-sand-50 py-16">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-sage-900 sm:text-4xl">
              Ready to Book?
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Schedule your appointment today and experience the Epoch Skin difference.
            </p>
            <Button 
              asChild 
              size="lg"
              className="mt-8 bg-clay-500 hover:bg-clay-600"
            >
              <Link href="/book">Book Your Service</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
