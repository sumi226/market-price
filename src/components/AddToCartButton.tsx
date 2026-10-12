"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn btn-sm border-emerald-600 bg-emerald-500 text-white hover:border-emerald-700 hover:bg-emerald-600 sm:btn-md"
      onClick={() => addToCart(product)}
      type="button"
    >
      কার্টে যোগ করুন
    </button>
  );
}
