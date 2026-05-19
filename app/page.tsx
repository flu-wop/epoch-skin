import { HomeHero } from "@/components/home/HomeHero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ServiceCategoryCards } from "@/components/home/ServiceCategoryCards";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
// import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBadges />
      <ServiceCategoryCards />
      <FeaturedProducts />
      <FAQ />
      <Contact />
      {/* <InstagramGallery /> */}
      <Newsletter />
      {/* <InstagramGallery /> */}
    </>
  );
}