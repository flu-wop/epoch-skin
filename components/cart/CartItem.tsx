import Link from "next/link";
import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 border-b border-sage-100 py-6">
      {/* Product image */}
      <Link 
        href={`/shop/${item.slug}`}
        className="flex-shrink-0"
      >
        <div className="h-24 w-24 overflow-hidden rounded-lg bg-gradient-to-br from-sand-100 to-neutral-100 relative">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link 
            href={`/shop/${item.slug}`}
            className="font-serif text-lg font-semibold text-sage-900 hover:text-clay-600"
          >
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-neutral-600">{item.size}</p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-sage-200">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              className="p-2 transition-colors hover:bg-sage-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4 text-sage-700" />
            </button>
            <span className="w-12 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="p-2 transition-colors hover:bg-sage-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4 text-sage-700" />
            </button>
          </div>

          {/* Remove button */}
          <button
            onClick={() => onRemove(item.productId)}
            className="text-sm text-neutral-500 transition-colors hover:text-error"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.productId)}
          className="rounded-full p-1 transition-colors hover:bg-sage-50"
          aria-label="Remove item"
        >
          <X className="h-5 w-5 text-neutral-400" />
        </button>
        <p className="font-serif text-lg font-semibold text-sage-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}