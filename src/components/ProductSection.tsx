import ProductCard from "@/components/ProductCard";
import { getProducts, getChange } from "@/lib/products";

export default async function ProductSections() {
  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <div className="alert alert-error">
        পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
      </div>
    );
  }

  const risers = products
    .filter((p) => getChange(p) > 0)
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);

  const fallers = products
    .filter((p) => getChange(p) < 0)
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  const sections = [
    {
      id: "dam-bereche",
      title: "আজ দাম বেড়েছে ▲",
      subtitle: "যেসব পণ্যের দাম আগের তুলনায় বেড়েছে",
      items: risers,
    },
    {
      id: "dam-komeche",
      title: "আজ দাম কমেছে ▼",
      subtitle: "যেসব পণ্যের দাম আগের তুলনায় কমেছে",
      items: fallers,
    },
    {
      id: "sob-ponno",
      title: "সব পণ্য",
      subtitle: `মোট ${products.length}টি পণ্য দেখানো হচ্ছে`,
      items: products,
    },
  ];

  return (
    <div className="space-y-14">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 space-y-5"
        >
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-base-content/60 sm:text-base">
              {section.subtitle}
            </p>
          </div>

          {section.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-base-200 p-5 text-base-content/70">
              এই মুহূর্তে কোনো পণ্যের তথ্য নেই।
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
