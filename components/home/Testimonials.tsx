"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { testimonials } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show 3 testimonials at a time on desktop, 1 on mobile
  const testimonialsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - testimonialsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-sage-900 sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Don't just take our word for it. Here's what our valued clients 
            have to say about their Epoch Skin experience.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {visibleTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-sage-100">
                <CardContent className="p-6">
                  {/* Star rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-clay-400 text-clay-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="mt-4 text-neutral-700 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author info */}
                  <div className="mt-6 border-t border-sage-100 pt-4">
                    <p className="font-semibold text-sage-900">
                      {testimonial.name}
                    </p>
                    {testimonial.service && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {testimonial.service}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation arrows */}
          {testimonials.length > testimonialsPerPage && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {[...Array(maxIndex + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === currentIndex
                        ? "w-6 bg-clay-500"
                        : "bg-sage-200 hover:bg-sage-300"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
