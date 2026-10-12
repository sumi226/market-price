"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatBn } from "@/lib/products";

export default function CartPage() {
  const { items, itemCount, subtotal, removeFromCart, clearCart } = useCart();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <Link href="/" className="link link-hover text-sm">
        ← হোম পেজ
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">আপনার কার্ট</h1>
          <p className="mt-1 text-base-content/70">
            মোট {formatBn(itemCount)}টি পণ্য
          </p>
        </div>
        {items.length > 0 && (
          <button
            className="btn btn-outline btn-sm"
            onClick={clearCart}
            type="button"
          >
            কার্ট খালি করুন
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <section className="rounded-2xl border border-emerald-300 bg-emerald-100 p-8 text-center">
          <p className="text-lg font-semibold">আপনার কার্ট এখন খালি।</p>
          <Link
            className="btn btn-sm mt-4 border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-600 sm:btn-md"
            href="/#sob-ponno"
          >
            পণ্য বেছে নিন
          </Link>
        </section>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-emerald-300 bg-emerald-100 p-4"
              >
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl"
                >
                  {item.image}
                </span>
                <div className="min-w-36 flex-1">
                  <Link
                    className="font-bold hover:underline"
                    href={`/product/${encodeURIComponent(item.slug)}`}
                  >
                    {item.nameBn}
                  </Link>
                  <p className="text-sm text-base-content/70">
                    {formatBn(item.price)} টাকা / {item.unit} ×{" "}
                    {formatBn(item.quantity)}
                  </p>
                </div>
                <strong>
                  {formatBn(item.price * item.quantity)} টাকা
                </strong>
                <button
                  aria-label={`${item.nameBn} কার্ট থেকে সরান`}
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => removeFromCart(item.id)}
                  type="button"
                >
                  সরান
                </button>
              </li>
            ))}
          </ul>

          <section className="ml-auto max-w-sm rounded-2xl border border-emerald-300 bg-emerald-100 p-5">
            <p className="flex justify-between gap-4 text-lg font-bold">
              <span>সর্বমোট</span>
              <span>{formatBn(subtotal)} টাকা</span>
            </p>
            <p className="mt-2 text-sm text-base-content/70">
              বাজারে প্রকৃত দাম পরিবর্তিত হতে পারে।
            </p>
          </section>
        </>
      )}
    </main>
  );
}
