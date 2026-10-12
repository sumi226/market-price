import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <section className="text-center">
        <p className="text-7xl font-black text-primary">৪০৪</p>
        <h1 className="mt-4 text-2xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-base-content/70">
          ঠিকানাটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।
        </p>
        <Link
          className="btn btn-sm mt-6 border-emerald-500 bg-emerald-500 text-white hover:border-emerald-600 hover:bg-emerald-600 sm:btn-md"
          href="/"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
