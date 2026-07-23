"use client";
// components/shop/CartDrawer.tsx
// Slide-in cart panel — opens automatically on Add to Cart, or via the
// header cart icon. Quantity/remove happen live here; the actual checkout
// (discount code entry + Stripe) stays on /cart, the existing hardened flow.

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, total } = useCart();

  // Close on Escape, lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 bg-[#1C1C1A]/40 z-[60] transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#FAF7F2] z-[70]
          shadow-[-8px_0_40px_rgba(28,28,26,0.12)] transition-transform duration-400 ease-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5DCCF]">
          <p className="font-serif text-xl text-[#1C1C1A]">
            Your Cart {itemCount > 0 && <span className="text-[#C9A96E] text-base">({itemCount})</span>}
          </p>
          <button onClick={closeCart} aria-label="Close cart"
            className="p-1 text-[#8C8680] hover:text-[#1C1C1A] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-8 h-8 text-[#C9A96E] mb-4" strokeWidth={1.2} />
            <p className="font-serif text-lg text-[#1C1C1A] mb-1">Nothing here yet</p>
            <p className="text-[#8C8680] text-sm font-sans mb-6">Your skincare picks will land here.</p>
            <button onClick={closeCart}
              className="text-[11px] tracking-[0.18em] uppercase font-sans text-[#C9A96E] hover:underline">
              Continue Shopping →
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-[#F0EBE3] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-[#1C1C1A] text-sm leading-snug">{item.name}</p>
                      <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}
                        className="text-[#C0BAB4] hover:text-red-500 transition-colors flex-shrink-0 text-lg leading-none">
                        ×
                      </button>
                    </div>
                    {item.size && <p className="text-[#8C8680] text-xs font-sans mt-0.5">{item.size}</p>}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#E5DCCF]">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#5A5550] hover:text-[#C9A96E] transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-sans text-[#1C1C1A]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#5A5550] hover:text-[#C9A96E] transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-serif text-[#1C1C1A] text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E5DCCF] px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#5A5550] text-sm font-sans">Subtotal</span>
                <span className="font-serif text-xl text-[#1C1C1A]">{formatPrice(total)}</span>
              </div>
              <p className="text-[#8C8680] text-[11px] font-sans">Shipping and discount codes calculated at checkout.</p>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block text-center w-full py-3.5 bg-[#C9A96E] text-[#1C1C1A]
                           text-[11px] tracking-[0.2em] uppercase font-sans font-medium
                           hover:bg-[#B8985D] transition-colors duration-300"
              >
                View Cart & Checkout
              </Link>
              <button onClick={closeCart}
                className="block w-full text-center text-[11px] tracking-[0.18em] uppercase font-sans text-[#8C8680] hover:text-[#C9A96E] transition-colors">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
