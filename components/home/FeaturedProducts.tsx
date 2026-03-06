"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1000);
  };

  return (
    <section className="bg-sage-50/30 py-16 lg:py-24">
      <Container>
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-sage-900 sm:text-5xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Discover our curated collection of Organic Skincare essentials, 
            formulated with Organic Ingredients for radiant, healthy skin.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sand-100 to-neutral-100">
                  <Image
                    src={product.images[0]}
                    alt={product.imageAlt || `${product.name} - ${product.shortDescription}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
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

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-xl font-semibold text-sage-900">
                    {formatPrice(product.price)}
                  </span>
                </div>

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

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Shop All Products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}