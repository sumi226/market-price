"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "low" | "high";

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">পণ্যের তালিকা</h2>

        <label className="flex items-center gap-2 text-sm">
          <span>সাজান:</span>
          <select
            className="select select-bordered select-sm border-emerald-300 bg-emerald-50 focus:border-emerald-500"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
