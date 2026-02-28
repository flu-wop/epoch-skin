import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

const serviceCategories = [
  {
    title: "Body Waxing",
    description: "Full body waxing services for smooth, long-lasting results",
    image: "/images/services/bikini-wax.png",
    imageAlt: "Professional body waxing service at Epoch Skin studio - smooth, hair-free results",
    href: "/book?category=body-wax",
  },
  {
    title: "Facial Waxing",
    description: "Precision facial waxing for eyebrows, lip, and chin",
    image: "/images/services/wax.png",
    imageAlt: "Precision facial waxing treatment - eyebrow, lip, and chin hair removal by licensed esthetician",
    href: "/book?category=facial-wax",
  },
  {
    title: "Organic Facials",
    description: "Luxurious organic facial treatments for radiant skin",
    image: "/images/services/organic-facial.png",
    imageAlt: "Luxurious Organic facial treatment using glass skin layering technique at Epoch Skin",
    href: "/book?category=facials",
  },
];

export function ServiceCategoryCards() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium waxing and organic facial services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-sand-100 to-neutral-100">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-clay-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <span className="inline-flex items-center text-clay-600 font-medium group-hover:text-clay-700">
                  Book Now
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}