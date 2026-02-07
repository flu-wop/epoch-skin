import { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About Epoch Skin - Organic K-Beauty Skincare",
  description: "Learn about our commitment to handmade, small-batch organic skincare inspired by K-Beauty glass-skin principles.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 text-center mb-8">
          About Epoch Skin
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl p-8 mb-12">
            <p className="text-xl text-gray-800 leading-relaxed">
              Epoch Skin is a premium waxing studio and curated organic skincare line founded in 2026 by Kayla Ford, a New Orleans native.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            Our journey began when our founder experienced firsthand the discomfort and irritation caused by harsh waxing products and synthetic skincare. 
            Determined to create a better experience, she spent years researching natural formulations, gentle techniques, and certified organic ingredients 
            that deliver exceptional results without compromising skin health.
          </p>

          <p className="text-gray-700 mb-6">
            Today, Epoch Skin is more than just a studio—it's a sanctuary where expert waxing care meets natural luxury. 
            Every service and product is carefully crafted to honor your skin's natural beauty while delivering the visible, long-lasting results you deserve.
          </p>

          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Our Values</h2>
          <div className="bg-white border-2 border-emerald-200 rounded-lg p-6 mb-8">
            <ul className="space-y-6">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  <strong className="text-emerald-900">Organic First:</strong> We use only high-quality, certified organic ingredients in every formula
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  <strong className="text-emerald-900">Cruelty-Free:</strong> We never test on animals and source ethically from suppliers who share our values
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  <strong className="text-emerald-900">Quality Results:</strong> Every product and service is designed to deliver visible, long-lasting results you can trust
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  <strong className="text-emerald-900">Client-Centered:</strong> Your comfort, confidence, and satisfaction are at the heart of everything we do
                </span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Glass-Skin Layering</h2>
          <p className="text-gray-700 mb-6">
            The K-Beauty glass-skin aesthetic emphasizes hydration, radiance, and a luminous, 
            "glass-like" complexion. Our three-step routine—cleanser, serum, moisturizer—is 
            designed to layer seamlessly, building hydration and glow with each step.
          </p>

          <div className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Why Organic?</h3>
            <p className="text-gray-700">
              Organic ingredients are grown without synthetic pesticides, fertilizers, or GMOs. 
              By choosing certified organic, we ensure our formulas are as pure and clean as 
              possible—better for your skin and better for the planet.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Transparency & Safety</h2>
          <p className="text-gray-700 mb-4">
            We list every ingredient in INCI format and clearly mark which are organic. We provide 
            full usage instructions, storage recommendations, and safety warnings. Our products are 
            for external use only, and we always recommend patch testing.
          </p>
          <p className="text-sm text-gray-600 italic">
            These statements have not been evaluated by the Food and Drug Administration. Our products 
            are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </main>
  );
}