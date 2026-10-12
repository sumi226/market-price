type Product = {
  id?: string | number;
  image: string | null;
  nameBn: string;
  today: number | string;
  change?: {
    dir: "up" | "down" | "same";
    pct: number | string;
  };
};

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error(`Failed to load product ticker: ${res.status}`);
  }

  const products: Product[] = await res.json();

  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <div
      className="overflow-hidden rounded-lg bg-green-200 py-3 text-black"
      aria-label="আজকের বাজারদর"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0"
            aria-hidden={copy === 1}
          >
            {products.map((product, i) => {
              const direction = product.change?.dir;
              const percentage = product.change?.pct;
              const directionColor =
                direction === "up"
                  ? "text-red-400"
                  : direction === "down"
                    ? "text-green-400"
                    : "text-gray-300";

              return (
                <span
                  key={`${copy}-${product.id ?? i}`}
                  className="mx-4 inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span
                    className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10"
                    role="img"
                    aria-label={product.nameBn}
                  >
                    {product.image ?? "🛒"}
                  </span>

                  <span>{product.nameBn}</span>
                  <b>৳{product.today}</b>

                  <span className={directionColor}>
                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                        ? "▼"
                        : "—"}{" "}
                    {percentage ?? 0}%
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
