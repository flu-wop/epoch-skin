"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      size: product.size,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/shop/${product.slug}`}>
        {/* Product image placeholder */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sand-100 to-neutral-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-sage-200/30 backdrop-blur-sm"></div>
            </div>
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-sage-900/0 transition-all group-hover:bg-sage-900/5"></div>
          
          {/* Sale badge */}
          {product.compareAtPrice && (
            <div className="absolute right-3 top-3 rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-white">
              Sale
            </div>
          )}

          {/* Out of stock badge */}
          {!product.inStock && (
            <div className="absolute left-3 top-3 rounded-full bg-neutral-700 px-3 py-1 text-xs font-semibold text-white">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-5">
        {/* Category badge */}
        <div className="mb-2">
          <span className="text-xs font-medium text-sage-600">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-sage-900 transition-colors group-hover:text-clay-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
          {product.shortDescription}
        </p>

        {/* Skin type tags */}
        {product.skinType.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.skinType.slice(0, 3).map((type) => (
              <span 
                key={type}
                className="rounded-full bg-sage-50 px-2 py-0.5 text-xs text-sage-700"
              >
                {type === "all" ? "All Skin Types" : type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold text-sage-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-clay-500 hover:bg-clay-600"
          size="sm"
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {!product.inStock ? "Out of Stock" : isAdded ? "Added!" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
