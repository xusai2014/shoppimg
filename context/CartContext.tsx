"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  skuId: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string, skuId: string, qty: number) => void;
  updateQty: (productId: string, skuId: string, qty: number) => void;
  removeItem: (productId: string, skuId: string) => void;
  clear: () => void;
  count: number;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cyg-mall-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (productId: string, skuId: string, qty: number) =>
      setItems((prev) => {
        const i = prev.findIndex((it) => it.productId === productId && it.skuId === skuId);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...prev, { productId, skuId, qty }];
      });
    const updateQty = (productId: string, skuId: string, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((it) => !(it.productId === productId && it.skuId === skuId))
          : prev.map((it) => (it.productId === productId && it.skuId === skuId ? { ...it, qty } : it))
      );
    const removeItem = (productId: string, skuId: string) =>
      setItems((prev) => prev.filter((it) => !(it.productId === productId && it.skuId === skuId)));
    const clear = () => setItems([]);
    const count = items.reduce((s, it) => s + it.qty, 0);
    return { items, addItem, updateQty, removeItem, clear, count, ready };
  }, [items, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
