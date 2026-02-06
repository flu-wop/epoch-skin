import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { getFeaturedServices } from "@/data/services";
import { formatPrice, formatDuration } from "@/lib/utils";
import { Clock, DollarSign } from "lucide-react";

export function ServicesOverview() {
  const services = getFeaturedServices();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-sage-900 sm:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Expert waxing treatments tailored to your needs. We use premium, 
            gentle products for the most comfortable experience.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Service image placeholder - will add real images later */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-sage-100 to-sand-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-sage-200/50 backdrop-blur-sm"></div>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-sage-900/0 transition-all group-hover:bg-sage-900/10"></div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-sage-900">
                  {service.name}
                </h3>
                
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                  {service.description}
                </p>

                {/* Price and duration */}
                <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-sage-600" />
                    <span className="font-medium">{formatPrice(service.price)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-sage-600" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                </div>

                {/* Book button */}
                <Button 
                  asChild 
                  className="mt-4 w-full bg-clay-500 hover:bg-clay-600"
                  size="sm"
                >
                  <Link href={`/book?service=${service.slug}`}>
                    Book Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all services link */}
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
