import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategoryCards } from "@/components/home/ServiceCategoryCards";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import About from "@/components/home/About";
import Commitment from "@/components/home/Commitment";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategoryCards />
      <FeaturedProducts />
      <About />
      <Commitment />
      <FAQ />
      <Contact />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}