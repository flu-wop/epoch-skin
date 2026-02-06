import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function InstagramGallery() {
  // Placeholder images - will be replaced with real Instagram feed or images
  const images = [
    { id: 1, alt: "Skincare product flatlay" },
    { id: 2, alt: "Clean waxing studio" },
    { id: 3, alt: "Natural skincare ingredients" },
    { id: 4, alt: "Client receiving treatment" },
    { id: 5, alt: "Product collection" },
    { id: 6, alt: "Botanical skincare" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <Instagram className="h-8 w-8 text-sage-700" />
            <h2 className="font-serif text-4xl font-bold text-sage-900 sm:text-5xl">
              Follow Us
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Join our community on Instagram for skincare tips, behind-the-scenes 
            content, and exclusive offers.
          </p>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-medium text-clay-600 transition-colors hover:text-clay-700"
          >
            @epochskin
          </a>
        </div>

        {/* Instagram grid */}
        <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
          {images.map((image) => (
            <Link
              key={image.id}
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-sage-100 to-sand-100"
            >
              {/* Placeholder - will be replaced with actual images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-sage-200/30 backdrop-blur-sm transition-transform group-hover:scale-110"></div>
              </div>
              
              {/* Hover overlay with Instagram icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-sage-900/0 transition-all group-hover:bg-sage-900/40">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-clay-400 via-clay-500 to-clay-600 px-8 py-3 font-medium text-white transition-transform hover:scale-105"
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
        </div>
      </Container>
    </section>
  );
}
