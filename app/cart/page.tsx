"use client";

import { Container } from "@/components/layout/Container";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-20 bg-sand/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Add some of our organic products to get started.
              </p>
              <Link
                href="/shop"
                className="inline-block px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image Placeholder */}
                    <div className="w-24 h-24 bg-sand-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-sand-400 text-sm">No Image</span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{item.size}</p>
                      <p className="text-lg font-semibold text-clay-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-clay-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-3 px-6 bg-clay-500 text-white text-center rounded-lg font-semibold hover:bg-clay-600 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block w-full py-3 px-6 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
