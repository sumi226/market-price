"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import type { Product } from "@/types/product";

export type CartItem = {
  id: string;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "bazar-dor-cart";
const cartListeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    typeof item.nameBn === "string" &&
    typeof item.image === "string" &&
    typeof item.unit === "string" &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readCartSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerCartSnapshot() {
  return null;
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function notifyCartListeners() {
  cartListeners.forEach((listener) => listener());
}

function parseCartSnapshot(snapshot: string | null): CartItem[] | null {
  if (snapshot === null) return [];

  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) && parsed.every(isCartItem) ? parsed : null;
  } catch {
    return null;
  }
}

function updateStoredCart(
  update: (items: CartItem[]) => CartItem[],
): boolean {
  const items = parseCartSnapshot(readCartSnapshot()) ?? [];

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(update(items)),
    );
    notifyCartListeners();
    return true;
  } catch {
    toast.error("কার্ট সংরক্ষণ করা যায়নি।");
    return false;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToCart,
    readCartSnapshot,
    getServerCartSnapshot,
  );
  const items = useMemo(
    () => parseCartSnapshot(snapshot) ?? [],
    [snapshot],
  );

  useEffect(() => {
    if (snapshot === null || parseCartSnapshot(snapshot) !== null) return;

    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      notifyCartListeners();
      toast.error("কার্টের সংরক্ষিত তথ্য পড়া যায়নি; কার্ট খালি করা হয়েছে।");
    } catch {
      toast.error("কার্টের তথ্য লোড করা যায়নি।");
    }
  }, [snapshot]);

  const addToCart = useCallback((product: Product) => {
    const saved = updateStoredCart((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === String(product.id),
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: String(product.id),
          slug: product.slug,
          nameBn: product.nameBn,
          image: product.image,
          unit: product.unit,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    if (saved) toast.success(`${product.nameBn} কার্টে যোগ হয়েছে।`);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const saved = updateStoredCart((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );

    if (saved) toast.success("পণ্যটি কার্ট থেকে সরানো হয়েছে।");
  }, []);

  const clearCart = useCallback(() => {
    if (updateStoredCart(() => [])) toast.success("কার্ট খালি করা হয়েছে।");
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [items, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
