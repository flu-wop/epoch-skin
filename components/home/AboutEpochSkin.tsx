import { Container } from "@/components/layout/Container";
import Image from "next/image";

export default function AboutEpochSkin() {
  return (
    <section className="py-16 md:py-20 bg-sand-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading with Favicon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/logos/favicon.png"
              alt="Epoch Skin"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900">
              About Epoch Skin
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Epoch Skin is a premium waxing studio and curated Organic Skincare line founded in 2026 by Kayla. 
            We believe Skincare is more than routine—it's a transformative journey. Every service and product is 
            carefully crafted with certified Organic Ingredients to honor your skin's natural beauty while delivering 
            visible, long-lasting results.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our philosophy combines expert waxing techniques with clean, Organic formulations that are effective, 
            luxurious, and gentle on your skin. Experience the difference that premium care and natural ingredients can make.
          </p>
        </div>
      </Container>
    </section>
  );
}
