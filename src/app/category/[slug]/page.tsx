import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategoryProducts } from "@/lib/products";
import CategoryProductList from "@/components/CategoryProductList";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let products;

  try {
    products = await getCategoryProducts(slug);
  } catch {
    notFound();
  }

  if (products.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm text-base-content/60">বাজার দর / ক্যাটাগরি</p>
        <h1 className="mt-2 text-3xl font-black">🛒 {products[0].category}</h1>
        <p className="mt-2 text-base-content/60">
          এই ক্যাটাগরির {products.length}টি পণ্য
        </p>
      </div>

      <CategoryProductList products={products} />
    </main>
  );
}


