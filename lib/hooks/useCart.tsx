"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CartItem } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { TAX_RATE } from "@/lib/constants";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("epoch-skin-cart", []);

  // Add item to cart or update quantity if already exists
  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        // Item already in cart, update quantity
        return currentItems.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      } else {
        // New item, add to cart
        return [
          ...currentItems,
          {
            ...newItem,
            quantity: newItem.quantity || 1,
          } as CartItem,
        ];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
