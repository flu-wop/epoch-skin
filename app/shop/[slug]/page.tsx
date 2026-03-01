import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Link href="/shop" className="text-clay-600 hover:text-clay-700 mb-8 inline-block">
            ← Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-sand-100">
              <Image
                src={product.images[0]}
                alt={product.imageAlt || product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-serif text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-semibold text-clay-600 mb-2">${product.price}</p>

              {product.size && (
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
                  {product.size}
                </p>
              )}

              <p className="text-gray-700 mb-6">{product.description}</p>

              <Button className="w-full bg-clay-500 hover:bg-clay-600 mb-8" size="lg">
                Add to Cart
              </Button>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-sage-600 mt-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How to Use */}
              {product.howToUse && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">How to Use:</h3>
                  <p className="text-gray-700">{product.howToUse}</p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Ingredients:</h3>
                  <p className="text-sm text-gray-600">{product.ingredients.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
