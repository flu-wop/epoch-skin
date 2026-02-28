"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/hooks/useCart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size,
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
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

      <CardContent className="p-4 sm:p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-sage-900 transition-colors group-hover:text-clay-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 sm:mt-2 line-clamp-2 text-sm text-neutral-600">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-xl sm:text-2xl font-semibold text-sage-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-neutral-500">{product.size}</span>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-clay-500 hover:bg-clay-600 min-h-[44px] text-base"
          size="default"
        >
          <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          {addedToCart ? "Added!" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}