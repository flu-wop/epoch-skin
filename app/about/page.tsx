import { Container } from "@/components/layout/Container";
import Image from "next/image";
import { Leaf, Heart, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              About Epoch Skin
            </h1>
            
            <div className="bg-sand/20 rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Epoch Skin is a premium waxing studio and curated Organic skincare line founded in 2026 by Kayla Ford, a New Orleans native.
              </p>
            </div>
          </div>

          {/* Epoch Definition */}
          <section className="mb-16 text-center">
            <div className="bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl p-12 border border-clay-200">
              <div className="flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-clay-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                <h2 className="text-5xl md:text-6xl font-serif text-gray-900">
                  epoch
                </h2>
                <span className="text-3xl text-clay-500 ml-2">💧</span>
              </div>
              
              <p className="text-lg text-gray-600 italic mb-6">
                /ˈepək/ · noun
              </p>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4">
                  A period of time marked by distinctive character or significant events
                </p>
                <p className="text-base text-gray-600">
                  At Epoch Skin, we believe skincare is more than routine—it's a transformative journey. 
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
                Our journey began when our founder experienced firsthand the discomfort and irritation caused by harsh waxing products and synthetic skincare. Determined to create a better experience, she spent years researching Organic formulations, gentle techniques, and certified Organic ingredients that deliver exceptional results without compromising skin health.
              </p>
              <p>
                Today, Epoch Skin is more than just a studio—it's a sanctuary where expert waxing care meets natural luxury. Every service and product is carefully crafted to honor your skin's natural beauty while delivering the visible, long-lasting results you deserve.
              </p>
            </div>
          </section>

          {/* Licensed Estheticians - CENTERED */}
          <section className="mb-16" id="credentials">
            <h2 className="text-3xl font-serif text-clay-600 mb-8 text-center">Meet Your Estheticians</h2>
            
            <div className="flex justify-center">
              <div className="bg-white border border-sage-200 rounded-lg p-8 text-center max-w-md">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-sand-100">
                  <Image
                    src="/images/team/kayla.jpg"
                    alt="Kayla Ford, Licensed Esthetician"
                    fill
                    className="object-cover"
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
                All of our estheticians are Louisiana State Board licensed and undergo continuous education in Organic skincare and gentle waxing techniques.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-8 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Organic First:</h3>
                    <p className="text-gray-700">We use only high-quality, certified Organic ingredients in every formula</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cruelty-Free:</h3>
                    <p className="text-gray-700">We never test on animals and source ethically from suppliers who share our values</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Results:</h3>
                    <p className="text-gray-700">Every product and service is designed to deliver visible, long-lasting results you can trust</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Client-Centered:</h3>
                    <p className="text-gray-700">Your comfort, confidence, and satisfaction are at the heart of everything we do</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Glass-Skin Layering */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Glass-Skin Layering</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The K-Beauty glass-skin aesthetic emphasizes hydration, radiance, and a luminous, "glass-like" complexion. Our three-step routine—cleanser, serum, moisturizer—is designed to layer seamlessly, building hydration and glow with each step.
              </p>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-sand/20 to-sage/10 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-3">Why Organic?</h3>
              <p className="text-gray-700">
                Organic ingredients are grown without synthetic pesticides, fertilizers, or GMOs. By choosing certified Organic, we ensure our formulas are as pure and clean as possible—better for your skin and better for the planet.
              </p>
            </div>
          </section>

          {/* Transparency & Safety */}
          <section>
            <h2 className="text-3xl font-serif text-clay-600 mb-6 text-center">Transparency & Safety</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We list every ingredient in INCI format and clearly mark which are Organic. We provide full usage instructions, storage recommendations, and safety warnings. Our products are for external use only, and we always recommend patch testing.
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
