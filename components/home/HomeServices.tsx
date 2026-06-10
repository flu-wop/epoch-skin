// components/home/HomeServices.tsx
// Fixed: uses larger aspect ratio images, crisper display
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "Body Waxing",
    desc: "Full-body waxing with our organic hybrid wax — rosin-free, formulated with shea butter and squalane.",
    image: "/images/services/half-leg-wax.png",
    href: "/book?category=body-wax",
    from: "From $20",
  },
  {
    title: "Facial Waxing",
    desc: "Precision brow, lip, and chin waxing by licensed estheticians. Clean lines, zero irritation.",
    image: "/images/services/wax.png",
    href: "/book?category=facial-wax",
    from: "From $8",
  },
  {
    title: "Organic Facials",
    desc: "The glass-skin layering protocol — certified organic actives, K-Beauty method, visible results.",
    image: "/images/services/organic-facial.png",
    href: "/book?category=facials",
    from: "From $50",
  },
];

export function HomeServices() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Studio Services</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1A]">Expert Care, Every Visit</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <Link key={svc.title} href={svc.href}
              className="group relative block overflow-hidden bg-[#1C1C1A]
                         hover:shadow-[0_12px_48px_rgba(201,169,110,0.18)]
                         transition-all duration-500">
              {/* Shorter image — 3:4 ratio instead of 2:3 */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover object-center opacity-70
                             group-hover:opacity-55 group-hover:scale-[1.03]
                             transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] via-[#1C1C1A]/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[#C9A96E] text-[9px] tracking-[0.22em] uppercase font-sans mb-2">{svc.from}</p>
                <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#D4AF88] transition-colors duration-300">{svc.title}</h3>
                <p className="text-[#9A9088] text-sm font-sans leading-relaxed mb-5
                               opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-w-[260px]">
                  {svc.desc}
                </p>
                <div className="flex items-center gap-2 text-[#C9A96E] text-[9px] tracking-[0.2em] uppercase font-sans">
                  <span>Book Now</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
              <div className="absolute inset-0 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/25 transition-all duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/book" className="inline-flex items-center justify-center px-8 py-3.5
                     bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.22em] uppercase font-sans
                     hover:bg-[#C4974A] hover:text-white transition-all duration-400">
            Book a Service
          </Link>
        </div>
      </div>
    </section>
  );
}
