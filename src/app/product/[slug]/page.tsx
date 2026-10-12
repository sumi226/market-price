import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts, formatBn } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  let product;

  try {
    // প্রথমে slug/id অনুযায়ী সব পণ্যের মধ্যে খোঁজো।
    const allProducts = await getProducts();
    product =
      allProducts.find((item) => item.slug === slug) ??
      allProducts.find((item) => String(item.id) === slug);

    // না পেলে single-product endpoint-এ id দিয়ে চেষ্টা করো।
    if (!product && /^\d+$/.test(slug)) {
      product = await getProductById(slug);
    }
  } catch {
    notFound();
  }

  if (!product) notFound();

  const marketPrices = product.markets;
  const lowestPrice = marketPrices.length
    ? Math.min(...marketPrices.map((market) => market.min))
    : product.price;
  const highestPrice = marketPrices.length
    ? Math.max(...marketPrices.map((market) => market.max))
    : product.price;
  const averagePrice = marketPrices.length
    ? marketPrices.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0,
      ) / marketPrices.length
    : product.price;

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <Link href="/" className="link link-hover text-sm">
        ← হোম পেজ
      </Link>

      <section className="card border border-base-300 bg-emerald-300 shadow-sm">
        <div className="card-body sm:flex-row sm:items-center sm:gap-6">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">
            {product.emoji}
          </div>

          <div>
            <h1 className="text-3xl font-black">{product.nameBn}</h1>
            <p className="mt-2 text-base-content/70">
              {product.description || "আজকের বাজারদরের তথ্য"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="badge badge-primary">{product.category}</span>
              <span className="badge badge-outline">{product.unit}</span>
            </div>
            <div className="mt-4">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl  font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-4 text-black sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন বাজারদর", value: lowestPrice },
            { label: "সর্বোচ্চ বাজারদর", value: highestPrice },
            { label: "গড় বাজারদর", value: averagePrice },
          ].map((item) => (
            <div
              key={item.label}
              className="stat rounded-2xl border border-base-300  bg-green-300 text-black"
            >
              <div className="stat-title">{item.label}</div>
              <div className="stat-value text-xl text-black">
                {formatBn(item.value)} টাকা
              </div>
              <div className="stat-desc text-black">{product.unit}</div>
            </div>
          ))}
        </div>
        {marketPrices.length > 0 && (
          <p className="mt-3 text-sm text-black">
            গড় বাজারদর প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যমানের গড়
            হিসেবে দেখানো হয়েছে।
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-2xl bg-emerald-300 border border-black">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody >
              {marketPrices.length > 0 ? (
                marketPrices.map((market) => (
                  <tr key={`${market.marketName}-${market.division}`}>
                    <td>{market.marketName}</td>
                    <td>{market.division}</td>
                    <td>
                      {formatBn(market.min)} টাকা / {product.unit}
                    </td>
                    <td>
                      {formatBn(market.max)} টাকা / {product.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center">
                    এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
