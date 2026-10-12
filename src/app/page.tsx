import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSection";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <Hero />
      <section className="rounded-3xl bg-primary/10 px-5 py-10 sm:px-10 sm:py-14">
        <p className="mb-3 text-sm font-semibold text-primary">
          🛒 প্রতিদিনের বাজারদর
        </p>

        <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-xl text-base-content/70">
          নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন, বাজারের সঙ্গে থাকুন।
        </p>

        <a
          href="#sob-ponno"
          className="btn mt-6 border-emerald-500 bg-emerald-500 text-white hover:border-emerald-600 hover:bg-emerald-600"
        >
          সব পণ্য দেখুন
        </a>
      </section>

      <ProductSections />
    </main>
  );
}
