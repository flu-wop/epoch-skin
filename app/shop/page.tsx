import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Discover our curated collection of organic skincare products. Certified organic ingredients, cruelty-free formulas, and effective results.",
};

export default function ShopPage() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold text-sage-900 sm:text-6xl">
              Shop Skincare
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Discover our thoughtfully curated collection of organic skincare products.
              Each formula is crafted with certified organic ingredients to nourish and enhance your skin's natural beauty.
            </p>
          </div>
        </Container>
      </section>

      {/* Products section */}
      <section className="py-16 lg:py-24">
        <Container>
          <ProductGrid products={products} />
        </Container>
      </section>

      {/* Why choose us section */}
      <section className="bg-sage-50/30 py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-3xl font-bold text-sage-900">
              Why Choose Epoch Skin Products
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                  <svg className="w-8 h-8 text-clay-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-sage-900">
                  Certified Organic
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Formulated with certified organic extracts and natural actives that are gentle yet effective.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                  <svg className="w-8 h-8 text-clay-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-sage-900">
                  Cruelty-Free
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Never tested on animals. We're committed to ethical and sustainable practices.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                  <svg className="w-8 h-8 text-clay-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-sage-900">
                  Proven Results
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Trusted by thousands of clients for visible improvements in skin health.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
