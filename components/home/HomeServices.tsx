// components/home/HomeServices.tsx
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "Body Waxing",
    desc: "Full-body waxing with our Organic hybrid wax — rosin-free, formulated with shea butter and squalane.",
    image: "/images/services/half-leg-wax.png",
    href: "/book?category=body-wax",
    from: "From $20",
  },
  {
    title: "Facial Waxing",
    desc: "Precision brow, lip, and chin waxing by licensed estheticians. Clean lines, zero irritation.",
    image: "/images/services/eyebrow-wax.png",
    href: "/book?category=facial-wax",
    from: "From $8",
  },
  {
    title: "Organic Facials",
    desc: "The glass-skin layering protocol — certified Organic actives, K-Beauty method, visible results.",
    image: "/images/services/organic-facial.png",
    href: "/book?category=facials",
    from: "From $50",
  },
];

export function HomeServices() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F2EA]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <div className="w-10 h-px bg-[#C4974A] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C4974A] font-sans mb-3">Studio Services</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1A]">Expert Care, Every Visit</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <Link key={svc.title} href={svc.href}
              className="group relative block overflow-hidden bg-[#3E4A3C]
                         hover:shadow-[0_12px_48px_rgba(196,151,74,0.18)]
                         transition-all duration-500">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E4A3C] via-[#3E4A3C]/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[#C4974A] text-[9px] tracking-[0.22em] uppercase font-sans mb-2">{svc.from}</p>
                <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#D4AA6A] transition-colors duration-300">{svc.title}</h3>
                <p className="text-[#9BAD8C] text-sm font-sans leading-relaxed mb-5
                               opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-w-[260px]">
                  {svc.desc}
                </p>
                <div className="flex items-center gap-2 text-[#C4974A] text-[9px] tracking-[0.2em] uppercase font-sans">
                  <span>Book Now</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
              <div className="absolute inset-0 border border-[#C4974A]/0 group-hover:border-[#C4974A]/25 transition-all duration-500 pointer-events-none" />
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
