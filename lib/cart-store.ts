// lib/cart-store.ts
// Zustand cart store — persisted to localStorage

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  price: number;        // in dollars
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.slug === item.slug);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.slug === item.slug
                ? { ...i, quantity: Math.min(10, i.quantity + 1) }
                : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (slug) => set((state) => ({
        items: state.items.filter(i => i.slug !== slug),
      })),

      updateQuantity: (slug, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter(i => i.slug !== slug) };
        }
        return {
          items: state.items.map(i =>
            i.slug === slug ? { ...i, quantity: Math.min(10, quantity) } : i
          ),
        };
      }),

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'epoch-skin-cart',
    }
  )
);
