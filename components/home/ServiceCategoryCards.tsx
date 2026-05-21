// components/home/ServiceCategoryCards.tsx
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "Body Waxing",
    description: "Full-body waxing with our organic hybrid wax — rosin-free, formulated with shea butter and squalane.",
    image: "/images/services/half-leg-wax.png",
    imageAlt: "Body waxing service",
    href: "/book?category=body-wax",
    label: "From $20",
  },
  {
    title: "Facial Waxing",
    description: "Precision brow, lip, and chin waxing by licensed estheticians. Clean lines, no irritation.",
    image: "/images/services/wax.png",
    imageAlt: "Facial waxing treatment",
    href: "/book?category=facial-wax",
    label: "From $8",
  },
  {
    title: "Organic Facials",
    description: "The glass-skin layering protocol — certified organic actives, K-Beauty method, visible results.",
    image: "/images/services/organic-facial.png",
    imageAlt: "Organic facial treatment",
    href: "/book?category=facials",
    label: "From $50",
  },
];

export function ServiceCategoryCards() {
  return (
    <section className="py-24 md:py-32 bg-[#F0EBE3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-8 h-px bg-[#C9A84C] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] font-sans mb-4">
            Studio Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18]">
            Expert Care, Every Visit
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <Link
              key={svc.title}
              href={svc.href}
              className="group relative block overflow-hidden bg-[#1A1A18]"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-50
                             group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase font-sans mb-3 block">
                  {svc.label}
                </span>
                <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#D4AF77] transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="text-[#8A8580] text-sm font-sans leading-relaxed mb-6 opacity-0
                               group-hover:opacity-100 transition-opacity duration-400 max-w-[280px]">
                  {svc.description}
                </p>
                <div className="flex items-center gap-3 text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase font-sans">
                  <span>Book Now</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30
                               transition-all duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
