// app/page.tsx
// Fixed: removed old Contact component (blank section), updated service cards
import { HomeHero } from "@/components/home/HomeHero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HomeServices } from "@/components/home/HomeServices";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import FAQ from "@/components/home/FAQ";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBadges />
      <HomeServices />
      <FeaturedProducts />
      <FAQ />
      <HomeNewsletter />
    </>
  );
}
