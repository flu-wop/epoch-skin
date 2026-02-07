import { Container } from "@/components/layout/Container";

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
                Epoch Skin is a premium waxing studio and curated organic skincare line founded in 2026 by Kayla Ford, a New Orleans native.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our journey began when our founder experienced firsthand the discomfort and irritation caused by harsh waxing products and synthetic skincare. Determined to create a better experience, she spent years researching organic formulations, gentle techniques, and certified organic ingredients that deliver exceptional results without compromising skin health.
              </p>
              <p>
                Today, Epoch Skin is more than just a studio—it's a sanctuary where expert waxing care meets natural luxury. Every service and product is carefully crafted to honor your skin's natural beauty while delivering the visible, long-lasting results you deserve.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Organic First:</h3>
                    <p className="text-gray-700">We use only high-quality, certified organic ingredients in every formula</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cruelty-Free:</h3>
                    <p className="text-gray-700">We never test on animals and source ethically from suppliers who share our values</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Results:</h3>
                    <p className="text-gray-700">Every product and service is designed to deliver visible, long-lasting results you can trust</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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
            <h2 className="text-3xl font-serif text-gray-900 mb-6">Glass-Skin Layering</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The K-Beauty glass-skin aesthetic emphasizes hydration, radiance, and a luminous, "glass-like" complexion. Our three-step routine—cleanser, serum, moisturizer—is designed to layer seamlessly, building hydration and glow with each step.
              </p>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-sand/20 to-sage/10 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Why Organic?</h3>
              <p className="text-gray-700">
                Organic ingredients are grown without synthetic pesticides, fertilizers, or GMOs. By choosing certified organic, we ensure our formulas are as pure and clean as possible—better for your skin and better for the planet.
              </p>
            </div>
          </section>

          {/* Transparency & Safety */}
          <section>
            <h2 className="text-3xl font-serif text-gray-900 mb-6">Transparency & Safety</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We list every ingredient in INCI format and clearly mark which are organic. We provide full usage instructions, storage recommendations, and safety warnings. Our products are for external use only, and we always recommend patch testing.
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
