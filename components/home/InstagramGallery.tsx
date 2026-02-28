"use client";

import { Container } from "@/components/layout/Container";
import Script from "next/script";

export function InstagramGallery() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            See our latest treatments and products on Instagram
          </p>
          
            href="https://instagram.com/epoch_skin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay-600 hover:text-clay-700 font-medium"
          >
            @epoch_skin
          </a>
        </div>

        <div className="max-w-5xl mx-auto">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-0570fdc4-b52b-4299-94d1-2a6d6b1da02b" data-elfsight-app-lazy></div>
        </div>
      </Container>
    </section>
  );
}
