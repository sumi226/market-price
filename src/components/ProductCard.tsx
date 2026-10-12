import Link from "next/link";
import type { Product } from "@/types/product";
import { formatBn, getChange } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const change = getChange(product);
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";

  const badgeClass =
    direction === "up"
      ? "badge-success"
      : direction === "down"
        ? "badge-error"
        : "badge-ghost";

  const changeLabel =
    direction === "up"
      ? `▲ ${formatBn(Math.abs(change))}%`
      : direction === "down"
        ? `▼ ${formatBn(Math.abs(change))}%`
        : "— ০.০%";

  return (
    <article className="card border border-emerald-300 bg-emerald-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/product/${encodeURIComponent(product.slug)}`}
        className="card-body gap-3 p-4 sm:p-5"
      >
        <div className="flex h-20 items-center justify-center rounded-xl bg-base-200 text-5xl">
          <span aria-hidden="true">{product.image}</span>
        </div>

        <div>
          <h3 className="line-clamp-1 text-lg font-bold">{product.nameBn}</h3>
          <p className="mt-1 text-sm text-base-content/60">{product.unit}</p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2 border-t border-base-300 pt-3">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-extrabold text-primary">
              {formatBn(product.price)} টাকা
            </p>
          </div>

          <span className={`badge ${badgeClass} badge-sm sm:badge-md`}>
            {changeLabel}
          </span>
        </div>
        <span className="link link-hover text-sm text-emerald-800">
          বিস্তারিত দেখুন
        </span>
      </Link>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
