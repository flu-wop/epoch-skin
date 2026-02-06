import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-sand-100 via-sage-50 to-sand-50 lg:min-h-[700px]">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-sage-300 via-transparent to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Main heading */}
        <h1 className="font-serif text-5xl font-bold leading-tight text-sage-900 sm:text-6xl lg:text-7xl">
          Natural Beauty,
          <br />
          <span className="text-clay-600">Timeless Results</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl">
          Experience premium waxing services and discover our curated collection 
          of botanical skincare products. Your journey to radiant skin begins here.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            asChild 
            size="lg"
            className="w-full bg-clay-500 px-8 text-base hover:bg-clay-600 sm:w-auto"
          >
            <Link href="/book">Book Appointment</Link>
          </Button>
          <Button 
            asChild 
            size="lg"
            variant="outline"
            className="w-full border-sage-300 px-8 text-base text-sage-700 hover:bg-sage-50 sm:w-auto"
          >
            <Link href="/shop">Shop Products</Link>
          </Button>
        </div>

        {/* Features/badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-sage-500"></div>
            <span>100% Natural Ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-sage-500"></div>
            <span>Cruelty-Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-sage-500"></div>
            <span>Expert Estheticians</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-sage-200 opacity-20 blur-3xl"></div>
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-clay-200 opacity-20 blur-3xl"></div>
    </section>
  );
}
