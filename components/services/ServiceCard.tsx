import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
      {/* Service image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-clay-100 to-sand-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-clay-200/50 flex items-center justify-center">
              <span className="text-clay-600 text-sm font-medium">Image</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-clay-900/0 transition-all group-hover:bg-clay-900/5"></div>
        
        {service.popular && (
          <div className="absolute top-3 right-3 rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-white">
            Popular
          </div>
        )}
      </div>

      <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-sage-900 group-hover:text-clay-600 transition-colors">
            {service.name}
          </h3>
          
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-600 line-clamp-3">
            {service.description}
          </p>

          {/* Price and Duration */}
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-clay-600">
              ${service.price}
            </span>
            <span className="text-sm sm:text-base text-neutral-500">{service.duration}</span>
          </div>
        </div>

        {/* Book button - Larger on mobile */}
        <Button
          asChild
          className="mt-4 sm:mt-6 w-full bg-clay-500 hover:bg-clay-600 min-h-[44px] text-base"
          size="default"
        >
          <Link href="/book">Book Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
