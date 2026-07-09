'use client';
// app/cart/page.tsx
// Uses lib/hooks/useCart (CartProvider-based, matches Providers.tsx)

import { useCart } from '@/lib/hooks/useCart';
import { resolveDiscountCode } from '@/lib/discounts';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TAX_RATE = 0.0945; // Louisiana state + New Orleans local

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);

  const discountAmount = applied ? total * applied.pct : 0;
  const discountedSubtotal = total - discountAmount;
  const tax = discountedSubtotal * TAX_RATE;
  const grandTotal = discountedSubtotal + tax;

  const handleApplyPromo = () => {
    setPromoError('');
    const match = resolveDiscountCode(promoInput);
    if (!match) {
      setPromoError('That code isn\u2019t valid.');
      setApplied(null);
      return;
    }
    setApplied(match);
  };

  const handleRemovePromo = () => {
    setApplied(null);
    setPromoInput('');
    setPromoError('');
  };

  // Clear stale cart items that have broken image paths
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // If any item is missing a valid image path starting with /images/, clear it
          const hasStale = parsed.some((item: { image?: string }) =>
            !item.image || (!item.image.startsWith('/images/') && !item.image.startsWith('/'))
          );
          if (hasStale) clearCart();
        } catch { clearCart(); }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.id, quantity: i.quantity })),
          discountCode: applied?.code ?? '',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-6">🌿</p>
          <h1 className="font-serif text-3xl text-[#111] mb-4">Your cart is empty</h1>
          <p className="text-[#888] mb-8">Discover our Organic Skincare collection.</p>
          <Link
            href="/shop"
            className="inline-block px-10 py-3.5 bg-[#3E4A3C] text-[#C4974A] text-xs tracking-widest uppercase hover:bg-[#C4974A] hover:text-white transition-colors"
          >
            Shop Skincare
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-2">Your Selection</p>
          <h1 className="font-serif text-4xl text-[#111]">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 pb-6 border-b border-[#E8E0D0]">
                <div className="relative w-20 h-20 flex-shrink-0 bg-[#F5EDD8] overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#C9A96E]/40 text-xl">✦</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-[#111] text-sm mb-1 leading-snug">{item.name}</h3>
                  <p className="text-[#D4AF77] text-sm font-medium">${item.price.toFixed(2)}</p>
                  {item.size && <p className="text-[#AAA] text-xs mt-0.5">{item.size}</p>}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E0D8CC]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#111] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-[#111]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#111] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[#111] text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-[#AAA] hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E8E0D0] p-8 sticky top-24">
              <h2 className="font-serif text-xl text-[#111] mb-6">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-6">
                {applied ? (
                  <div className="flex items-center justify-between bg-[#F5EDD8] px-4 py-3 text-sm">
                    <span className="text-[#3E4A3C]">
                      Code <strong>{applied.code}</strong> applied — {Math.round(applied.pct * 100)}% off
                    </span>
                    <button
                      onClick={handleRemovePromo}
                      className="text-[#888] hover:text-red-500 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyPromo(); } }}
                        placeholder="Discount code"
                        className="w-full border border-[#E0D8CC] px-3 py-2.5 text-sm text-[#111] placeholder-[#AAA] focus:outline-none focus:border-[#C4974A]"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="w-full px-5 py-2.5 border border-[#3E4A3C] text-[#3E4A3C] text-xs tracking-widest uppercase hover:bg-[#3E4A3C] hover:text-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-xs mt-2">{promoError}</p>}
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {applied && (
                  <div className="flex justify-between text-sm text-[#4A9B6F]">
                    <span>Discount ({applied.code})</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Shipping</span>
                  <span className="text-[#4A9B6F]">Free</span>
                </div>
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Tax (9.45%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#E8E0D0] pt-3 flex justify-between font-serif text-lg text-[#111]">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-[#3E4A3C] text-[#C4974A] text-xs tracking-widest uppercase hover:bg-[#C4974A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>

              <p className="text-[#AAA] text-xs text-center mt-4">
                Secure checkout via Stripe.
              </p>

              <div className="mt-6 pt-6 border-t border-[#E8E0D0]">
                <Link href="/shop" className="text-xs text-[#888] hover:text-[#D4AF77] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
