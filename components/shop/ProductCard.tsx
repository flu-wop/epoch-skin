"use client";
// components/shop/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/hooks/useCart";

interface Props {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group product-card flex flex-col">
      {/* Image wrapper */}
      <Link href={`/shop/${product.slug}`} className="block relative overflow-hidden bg-[#F0EBE3]">
        {/* Aspect ratio box */}
        <div className="relative aspect-[4/5]">
          <Image
            src={product.images[0]}
            alt={product.imageAlt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
        </div>

        {/* Gold corner brackets on hover */}
        <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/0
                          group-hover:border-[#C9A96E]/70 transition-all duration-500" />
        <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/0
                          group-hover:border-[#C9A96E]/70 transition-all duration-500" />
        <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/0
                          group-hover:border-[#C9A96E]/70 transition-all duration-500" />
        <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/0
                          group-hover:border-[#C9A96E]/70 transition-all duration-500" />

        {/* Category tag */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2
                         opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="bg-[#18181A]/80 text-[#C9A96E] text-[8px] tracking-[0.2em] uppercase
                            px-3 py-1.5 font-sans backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 bg-white">
        <Link href={`/shop/${product.slug}`} className="block flex-1">
          <h3 className="font-serif text-[#18181A] text-lg leading-snug mb-2
                          group-hover:text-[#C9A96E] transition-colors duration-400">
            {product.name}
          </h3>
          <p className="text-[#9A9088] text-xs font-sans leading-relaxed line-clamp-2 mb-4">
            {product.shortDescription}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F0EBE3]">
          <div>
            <span className="font-serif text-xl text-[#18181A]">{formatPrice(product.price)}</span>
            {product.size && (
              <span className="text-[#C8C0B8] text-[10px] font-sans ml-2">{product.size}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-2 px-4 py-2.5
                       border border-[#E8E0D5] text-[#9A9088]
                       text-[9px] tracking-[0.18em] uppercase font-sans
                       hover:border-[#C9A96E] hover:text-[#C9A96E]
                       transition-all duration-300"
          >
            <ShoppingBag className="w-3 h-3" />
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
