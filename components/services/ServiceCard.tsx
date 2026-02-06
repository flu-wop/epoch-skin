import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/lib/types";
import { formatPrice, formatDuration } from "@/lib/utils";
import { Clock, DollarSign } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Service image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-sage-100 to-sand-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-sage-200/40 backdrop-blur-sm"></div>
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-sage-900/0 transition-all group-hover:bg-sage-900/10"></div>
      </div>

      <CardContent className="p-6">
        {/* Category badge */}
        <div className="mb-3">
          <span className="inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
            {service.category.split("-").map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(" ")}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-semibold text-sage-900">
          {service.name}
        </h3>
        
        <p className="mt-3 text-neutral-600 leading-relaxed">
          {service.description}
        </p>

        {/* Benefits list */}
        {service.benefits.length > 0 && (
          <ul className="mt-4 space-y-2">
            {service.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay-500"></div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price and duration */}
        <div className="mt-6 flex items-center gap-6 border-t border-sage-100 pt-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-sage-600" />
            <div>
              <p className="text-xs text-neutral-500">Price</p>
              <p className="font-serif text-xl font-semibold text-sage-900">
                {formatPrice(service.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sage-600" />
            <div>
              <p className="text-xs text-neutral-500">Duration</p>
              <p className="font-medium text-sage-900">
                {formatDuration(service.duration)}
              </p>
            </div>
          </div>
        </div>

        {/* Book button */}
        <Button 
          asChild 
          className="mt-6 w-full bg-clay-500 hover:bg-clay-600"
        >
          <Link href={`/book?service=${service.slug}`}>
            Book This Service
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
