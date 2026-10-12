"use client";

import Link from "next/link";
import { formatBn } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function CartMenu() {
  const { items, itemCount, subtotal } = useCart();

  return (
    <div className="dropdown dropdown-end">
      <button
        aria-label={`কার্ট, ${formatBn(itemCount)}টি পণ্য`}
        className="btn btn-ghost btn-circle btn-sm sm:btn-md"
        type="button"
      >
        <span className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-xs indicator-item sm:badge-sm">
            {formatBn(itemCount)}
          </span>
        </span>
      </button>
      <div className="card card-sm dropdown-content z-20 mt-3 w-72 max-w-[calc(100vw-1.5rem)] bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">
            কার্টে {formatBn(itemCount)}টি পণ্য
          </span>
          {items.length ? (
            <ul className="max-h-48 space-y-2 overflow-y-auto">
              {items.map((item) => (
                <li className="flex items-center gap-2" key={item.id}>
                  <span aria-hidden="true">{item.image}</span>
                  <span className="min-w-0 flex-1 truncate">{item.nameBn}</span>
                  <span className="shrink-0">× {formatBn(item.quantity)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/70">কার্ট এখন খালি।</p>
          )}
          <span className="text-info">
            মোট: {formatBn(subtotal)} টাকা
          </span>
          <div className="card-actions">
            <Link
              className="btn w-full border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-600"
              href="/cart"
            >
              কার্ট দেখুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
