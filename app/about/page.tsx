import { Container } from "@/components/layout/Container";
import Image from "next/image";
import Script from "next/script";
import { Leaf, Heart, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header with logo */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              About Epoch Skin
            </h1>
            
            <div className="flex justify-center mb-8">
              <Image
                src="/favicon.ico"
                alt="Epoch Skin"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            
            <div className="bg-sand/20 rounded-lg p-8 mb-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Epoch Skin is a premium waxing studio and curated Organic Skincare line founded in 2026 by Kayla Ford. We believe Skincare is more than routine—it's a transformative journey. Every service and product is carefully crafted with certified Organic Ingredients to honor your skin's natural beauty while delivering visible, long-lasting results.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Our philosophy combines expert waxing techniques with clean, Organic formulations that are effective, luxurious, and gentle on your skin. Experience the difference that premium care and natural ingredients can make.
                </p>
              </div>
            </div>
          </div>

          {/* Epoch Definition */}
          <section className="mb-16 text-center">
            <div className="bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl p-12 border border-clay-200">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-5xl md:text-6xl font-serif text-gray-900">
                  epoch
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 italic mb-6">
                /ˈepək/ · noun
              </p>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4">
                  A period of time in history or a person's life, typically one marked by notable events or particular characteristics.
                </p>
                <p className="text-base text-gray-600">
                  At Epoch Skin, we believe Skincare is more than routine—it's a transformative journey. 
                  Each treatment, each product marks a new chapter in your skin's story.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our journey began when our founder experienced firsthand the discomfort and irritation caused by harsh waxing products and synthetic Skincare. Determined to create a better experience, she spent years researching Organic formulations, gentle techniques, and certified Organic Ingredients that deliver exceptional results without compromising skin health.
              </p>
              <p>
                Today, Epoch Skin is more than just a studio—it's a sanctuary where expert waxing care meets natural luxury. Every service and product is carefully crafted to honor your skin's natural beauty while delivering the visible, long-lasting results you deserve.
              </p>
            </div>
          </section>

          {/* Licensed Estheticians */}
          <section className="mb-16" id="credentials">
            <h2 className="text-3xl font-serif text-clay-600 mb-8 text-center">Meet Your Estheticians</h2>
            
            <div className="flex justify-center">
              <div className="bg-white border border-sage-200 rounded-lg p-8 text-center max-w-md">
                {/* Taller container so forehead isn't cropped */}
                <div className="relative w-40 h-48 mx-auto mb-4 rounded-xl overflow-hidden bg-sand-100">
                  <Image
                    src="/images/team/founder-kayla.png"
                    alt="Kayla Ford, Licensed Esthetician"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Kayla Ford</h3>
                <p className="text-sage-600 text-sm mb-3">Founder & Licensed Esthetician</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  LA State Board Licensed • 3+ years experience • Certified in Organic facial treatments & precision waxing
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                All of our estheticians are Louisiana State Board licensed and undergo continuous education in Organic Skincare and gentle waxing techniques.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-8 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-sage-700" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Organic First</h3>
                <p className="text-gray-700">We use only high-quality, certified Organic Ingredients in every formula</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-rose/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Cruelty-Free</h3>
                <p className="text-gray-700">We never test on animals and source ethically from suppliers who share our values</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Quality Results</h3>
                <p className="text-gray-700">Every product and service is designed to deliver visible, long-lasting results you can trust</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-clay/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-clay-600" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Client-Centered</h3>
                <p className="text-gray-700">Your comfort, confidence, and satisfaction are at the heart of everything we do</p>
              </div>
            </div>
          </section>

          {/* Glass-Skin Layering */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Glass-Skin Layering</h2>
            
            <div className="relative w-full max-w-lg mx-auto mb-6 rounded-lg overflow-hidden" style={{ aspectRatio: '512/382' }}>
              <Image
                src="/images/blog/glass-skin.png"
                alt="Glass skin layering technique"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The K-Beauty glass-skin aesthetic emphasizes hydration, radiance, and a luminous complexion. Our three-step routine is designed to layer seamlessly, building hydration and glow with each step.
              </p>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-sand/20 to-sage/10 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-3">Why Organic?</h3>
              <p className="text-gray-700">
                Organic Ingredients are grown without synthetic pesticides, fertilizers, or GMOs. By choosing certified Organic, we ensure our formulas are as pure and clean as possible.
              </p>
            </div>
          </section>

          {/* Instagram Feed */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Follow Our Journey</h2>
            
            <div className="max-w-4xl mx-auto">
              <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
              <div className="elfsight-app-0570fdc4-b52b-4299-94d1-2a6d6b1da02b" data-elfsight-app-lazy></div>
            </div>
          </section>

          {/* Transparency */}
          <section>
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Transparency & Safety</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We list every ingredient in INCI format and clearly mark which are Organic. We provide full usage instructions, storage recommendations, and safety warnings.
              </p>
              <p className="text-sm text-gray-600 italic">
                These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
