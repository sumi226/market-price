import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts, formatBn } from "@/lib/products";

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

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <Link href="/" className="link link-hover text-sm">
        ← হোম পেজ
      </Link>

      <section className="card border border-base-300 bg-base-100 shadow-sm">
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
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", value: product.price },
            { label: "সর্বোচ্চ দাম", value: product.price },
            { label: "গড় দাম", value: product.price },
          ].map((item) => (
            <div
              key={item.label}
              className="stat rounded-2xl border border-base-300 bg-base-100"
            >
              <div className="stat-title">{item.label}</div>
              <div className="stat-value text-xl text-primary">
                {formatBn(item.value)} টাকা
              </div>
              <div className="stat-desc">{product.unit}</div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-base-content/60">
          প্রকৃত সর্বনিম্ন, সর্বোচ্চ ও গড় দাম দেখাতে বাজারভিত্তিক price data
          API থেকে নিতে হবে।
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>একক</th>
                <th>আজকের দাম</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  এই পণ্যের বাজারভিত্তিক তথ্য API-তে যুক্ত হলে এখানে দেখানো হবে।
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
