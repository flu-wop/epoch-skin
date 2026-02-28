"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  // Calculate totals locally
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Free shipping, no tax for now

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-serif text-gray-900 mb-6">Shopping Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Button asChild size="lg" className="bg-clay-500 hover:bg-clay-600">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const itemId = (item as any).productId || (item as any).id || index.toString();
              return (
                <div
                  key={itemId}
                  className="bg-white border border-sage-200 rounded-lg p-6 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-sand-50 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(itemId)}
                        className="text-clay-600 hover:text-clay-700 p-2"
                        aria-label="Remove item"
                      >
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(itemId, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded border border-sage-300 flex items-center justify-center hover:bg-sage-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-sage-300 flex items-center justify-center hover:bg-sage-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                        <p className="font-serif text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-sage-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-sage-200 pt-3 flex justify-between font-serif text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span className="text-clay-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full mb-3 bg-clay-500 hover:bg-clay-600" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
