import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Epoch Skin's story, values, and commitment to natural beauty and sustainable practices.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold text-sage-900 sm:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Born from a passion for natural beauty and sustainable skincare, 
              Epoch Skin is dedicated to helping you feel confident and radiant in your own skin.
            </p>
          </div>
        </Container>
      </section>

      {/* Brand story */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-neutral-700">
                Epoch Skin began with a simple belief: beauty should be natural, effective, 
                and accessible. Founded in 2019, we've grown from a small waxing studio into 
                a trusted destination for premium body care and organic skincare.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                Our journey started when our founder experienced firsthand the discomfort and 
                irritation caused by harsh waxing products. Determined to create a better 
                experience, she spent years researching natural formulations and gentle 
                techniques that deliver exceptional results without compromising skin health.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                Today, Epoch Skin is more than just a studio—it's a sanctuary where expert 
                care meets natural luxury. Every service and product is carefully crafted to 
                honor your skin's natural beauty while delivering the results you deserve.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="bg-sage-50/30 py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-bold text-sage-900">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Value 1 */}
            <div className="rounded-xl border border-sage-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                <Leaf className="h-8 w-8 text-clay-600" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-sage-900">
                Natural First
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                We prioritize organic ingredients and natural formulations that work 
                in harmony with your skin.
              </p>
            </div>

            {/* Value 2 */}
            <div className="rounded-xl border border-sage-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                <Heart className="h-8 w-8 text-clay-600" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-sage-900">
                Ethical Beauty
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                Cruelty-free, sustainable, and committed to practices that respect 
                people and planet.
              </p>
            </div>

            {/* Value 3 */}
            <div className="rounded-xl border border-sage-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                <Sparkles className="h-8 w-8 text-clay-600" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-sage-900">
                Quality Results
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                Every product and service is designed to deliver visible, long-lasting 
                results you can trust.
              </p>
            </div>

            {/* Value 4 */}
            <div className="rounded-xl border border-sage-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                <Users className="h-8 w-8 text-clay-600" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-sage-900">
                Client-Centered
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                Your comfort, confidence, and satisfaction are at the heart of 
                everything we do.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sustainability section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-4xl font-bold text-sage-900">
              Our Commitment to Sustainability
            </h2>
            <p className="mt-6 text-center text-lg text-neutral-600">
              We believe beautiful skin and a beautiful planet go hand in hand
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100">
                    <div className="h-3 w-3 rounded-full bg-sage-600"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-sage-900">
                    Eco-Friendly Packaging
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Our products use recyclable glass bottles and minimal, sustainable packaging materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100">
                    <div className="h-3 w-3 rounded-full bg-sage-600"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-sage-900">
                    Responsible Sourcing
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    We partner with suppliers who share our commitment to ethical and sustainable ingredient sourcing.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100">
                    <div className="h-3 w-3 rounded-full bg-sage-600"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-sage-900">
                    Zero Waste Studio
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Our studio implements recycling programs and minimizes waste at every step of our operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-br from-clay-50 to-sand-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-sage-900 sm:text-4xl">
              Experience the Epoch Skin Difference
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Visit us in-studio or explore our curated product collection online.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-clay-500 hover:bg-clay-600"
              >
                <Link href="/book">Book Appointment</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
              >
                <Link href="/shop">Shop Products</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
