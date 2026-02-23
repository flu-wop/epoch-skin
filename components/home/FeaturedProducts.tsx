"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { useCart } from "@/lib/hooks/useCart";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  const { addItem } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size,
    });

    // Show brief feedback
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1000);
  };

  return (
    <section className="bg-sage-50/30 py-16 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-sage-900 sm:text-5xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Discover our curated collection of organic skincare essentials, 
            formulated with organic ingredients for radiant, healthy skin.
          </p>
        </div>

        {/* Products grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              <Link href={`/shop/${product.slug}`}>
                {/* Product image placeholder */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sand-100 to-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto h-16 w-16 rounded-full bg-sage-200/50 flex items-center justify-center">
                        <span className="text-sage-600 text-sm font-medium">Image</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-sage-900/0 transition-all group-hover:bg-sage-900/5"></div>
                </div>
              </Link>

              <CardContent className="p-5">
                <Link href={`/shop/${product.slug}`}>
                  <h3 className="font-serif text-lg font-semibold text-sage-900 transition-colors group-hover:text-clay-600">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-xl font-semibold text-sage-900">
                    {formatPrice(product.price)}
                  </span>
                </div>

                {/* Add to cart button */}
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-clay-500 hover:bg-clay-600"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {addedProductId === product.id ? "Added!" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all products link */}
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Shop All Products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
