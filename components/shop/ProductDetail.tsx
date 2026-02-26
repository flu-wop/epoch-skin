"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/hooks/useCart";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.size,
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen py-20">
      <Container>
        <Link 
          href="/shop"
          className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-sand-100 to-neutral-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-4xl font-bold text-sage-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl font-bold text-sage-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-neutral-600">{product.size}</span>
            </div>

            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-semibold text-sage-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-sage-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-sage-300 flex items-center justify-center hover:bg-sage-50"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-sage-300 flex items-center justify-center hover:bg-sage-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-clay-500 hover:bg-clay-600 text-lg py-6"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {addedToCart ? "Added to Cart!" : "Add to Cart"}
            </Button>

            {/* How to Use */}
            {product.howToUse && (
              <div className="mt-8 pt-8 border-t border-sage-200">
                <h3 className="font-semibold text-sage-900 mb-3">How to Use</h3>
                <p className="text-neutral-700">{product.howToUse}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mt-8 pt-8 border-t border-sage-200">
                <h3 className="font-semibold text-sage-900 mb-3">Ingredients</h3>
                <p className="text-sm text-neutral-600">
                  {product.ingredients.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}