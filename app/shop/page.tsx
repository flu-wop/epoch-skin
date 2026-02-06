import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Discover our curated collection of botanical skincare products. Natural ingredients, cruelty-free formulas, and effective results.",
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
              Discover our thoughtfully curated collection of botanical skincare products. 
              Each formula is crafted with natural ingredients to nourish and enhance your skin's natural beauty.
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
                  <div className="h-8 w-8 rounded-full bg-clay-500"></div>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-sage-900">
                  Natural Ingredients
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Formulated with botanical extracts and natural actives that are gentle yet effective.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                  <div className="h-8 w-8 rounded-full bg-clay-500"></div>
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
                  <div className="h-8 w-8 rounded-full bg-clay-500"></div>
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
