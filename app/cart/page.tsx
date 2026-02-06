"use client";

import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, tax, total, itemCount } = useCart();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const finalTotal = total + shipping;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-100">
              <ShoppingBag className="h-12 w-12 text-sage-600" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-sage-900">
              Your Cart is Empty
            </h1>
            <p className="mt-3 text-neutral-600">
              Looks like you haven't added any products yet. Start shopping to fill your cart!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-clay-500 hover:bg-clay-600">
                <Link href="/shop">Shop Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <section className="border-b bg-sage-50/30 py-12">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-sage-900">Shopping Cart</h1>
          <p className="mt-2 text-neutral-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </Container>
      </section>

      {/* Cart content */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-sage-100 bg-white p-6">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Continue shopping link */}
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-clay-600 transition-colors hover:text-clay-700"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <div>
              <div className="sticky top-24 rounded-xl border border-sage-100 bg-white p-6">
                <h2 className="font-serif text-2xl font-bold text-sage-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium text-sage-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium text-sage-900">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>

                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="rounded-lg bg-clay-50 p-3 text-xs text-clay-700">
                      Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
                    </p>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium text-sage-900">
                      {formatPrice(tax)}
                    </span>
                  </div>

                  <div className="border-t border-sage-100 pt-3">
                    <div className="flex justify-between">
                      <span className="font-serif text-lg font-semibold text-sage-900">
                        Total
                      </span>
                      <span className="font-serif text-2xl font-bold text-sage-900">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout button */}
                <Button
                  asChild
                  size="lg"
                  className="mt-6 w-full bg-clay-500 hover:bg-clay-600"
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {/* Trust badges */}
                <div className="mt-6 space-y-2 border-t border-sage-100 pt-6 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                    <span>Ships within 1-2 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
