// app/page.tsx
// Matches reference mockup 1: full-bleed hero, "Signature Dewy Glow Collection" 4-card grid

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HomeTrust } from "@/components/home/HomeTrust";

export default function HomePage() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <div className="bg-[#F5F0EB]">

      {/* ── HERO ── matches mockup 1 exactly ── */}
      <HeroSection />

      {/* ── SIGNATURE DEWY GLOW COLLECTION ── */}
      <section className="py-20 md:py-28 px-5 sm:px-8">
        <div className="max-w-[1200px] mx-auto">

          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-3">
              Premium Product
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18]">
              Signature Dewy Glow Collection
            </h2>
          </div>

          {/* 4-column product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <HomeProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/shop"
              className="inline-flex items-center px-10 py-3.5 border border-[#C9A96E]
                         text-[#C9A96E] text-[11px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#1A1A18] transition-all duration-400">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <HomeTrust />

      {/* ── GLASS SKIN PHILOSOPHY PREVIEW ── */}
      <section className="py-20 md:py-28 px-5 sm:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-3">Our</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18] mb-5">Glass Skin Philosophy</h2>
          <p className="text-[#8A8580] font-sans text-sm leading-relaxed max-w-xl mx-auto mb-12">
            The K-Beauty glass-skin method — progressive hydration layered from thinnest to richest 
            for skin that reflects light like polished glass.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: "◈", title: "Glass Skin", body: "Our layering protocol maximizes absorption at every step, building hydration depth organically." },
              { icon: "✦", title: "Organic Actives", body: "Snow mushroom, centella, beta-glucan — certified organic, cold-process preserved for peak potency." },
              { icon: "◇", title: "Esthetician Team", body: "Louisiana State Board licensed estheticians trained in organic skincare and gentle waxing." },
            ].map((card) => (
              <div key={card.title}
                className="bg-[#5C6B5A] text-white p-8 group hover:bg-[#4A5E48] transition-colors duration-400">
                <span className="block text-[#C9A96E] text-2xl mb-5">{card.icon}</span>
                <h3 className="font-serif text-xl mb-3">{card.title}</h3>
                <p className="text-[#C4CFC3] text-sm font-sans leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/about"
              className="inline-flex items-center px-8 py-3.5 bg-[#1A1A18] text-[#C9A96E]
                         text-[11px] tracking-[0.22em] uppercase font-sans
                         hover:bg-[#C9A96E] hover:text-[#1A1A18] transition-all duration-400">
              About Our Studio
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <HomeFAQ />

      {/* ── NEWSLETTER ── */}
      <HomeNewsletter />
    </div>
  );
}

// ── Hero component (inline for page.tsx since it uses server data) ──
function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[560px] max-h-[900px] overflow-hidden bg-[#1A1A18]">
      {/* Background image — NOLA French Quarter + glowing skin */}
      <Image
        src="/images/hero/hero-skin.jpg"
        alt="Radiant glowing skin with New Orleans French Quarter background"
        fill
        className="object-cover object-center"
        priority
        quality={92}
        sizes="100vw"
      />

      {/* Layered overlays matching mockup warm tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Nav overlay — matches mockup: centered logo, right nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          {/* Logo mark placeholder */}
          <span className="text-white/70 text-sm font-sans">☽</span>
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 font-serif text-white text-lg tracking-[0.2em] uppercase">
          Epoch Skin
        </p>
        <div className="flex items-center gap-6">
          <Link href="/shop" className="text-white/80 text-[11px] tracking-[0.15em] uppercase font-sans hover:text-white transition-colors">
            Semite
          </Link>
          <Link href="/book"
            className="text-white/80 text-[11px] tracking-[0.15em] uppercase font-sans
                       border border-white/30 px-4 py-2 hover:border-white hover:text-white transition-all">
            Reouiuct
          </Link>
        </div>
      </div>

      {/* Hero text — matches mockup position: lower-left */}
      <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-14 pb-16 md:pb-20">
        <h1 className="font-serif text-[3.2rem] sm:text-[4.2rem] md:text-[5.2rem] text-white
                        leading-[1.05] mb-4 max-w-[680px]">
          A New Era of<br />Radiant Skin
        </h1>
        <p className="text-[#D4AF77] font-sans text-base sm:text-lg tracking-[0.08em]">
          Organic · Luxurious · Transformative
        </p>
      </div>

      {/* Left arrow indicator */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-2xl">‹</div>
    </section>
  );
}

// ── Product card — matches mockup 1 card style ──
function HomeProductCard({ product }: { product: any }) {
  return (
    <div className="group bg-[#F0EBE3] overflow-hidden flex flex-col
                     hover:shadow-[0_8px_40px_rgba(201,169,110,0.15)]
                     transition-all duration-500">
      {/* Image area with product name overlay — matches mockup */}
      <Link href={`/shop/${product.slug}`} className="block relative">
        <div className="relative aspect-[3/3.5] overflow-hidden bg-[#E8E0D5]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Product name overlay on image — matches mockup top-left text */}
          <div className="absolute top-4 left-4 right-4">
            <p className="font-serif text-white text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {product.name}
            </p>
          </div>
          {/* Dew drop texture shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      {/* "Shop Now" gold button — matches mockup exactly */}
      <Link
        href={`/shop/${product.slug}`}
        className="block text-center py-3.5 bg-[#C9A96E] text-white
                   text-[11px] tracking-[0.18em] uppercase font-sans
                   hover:bg-[#B8924A] transition-colors duration-300 mt-auto"
      >
        Shop Now
      </Link>
    </div>
  );
}
