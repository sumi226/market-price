export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="skeleton mb-4 h-10 w-56" />
      <div className="skeleton mb-8 h-5 w-72" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-base-300 p-4">
            <div className="skeleton h-24 w-full" />
            <div className="skeleton mt-4 h-5 w-3/4" />
            <div className="skeleton mt-3 h-4 w-1/2" />
            <div className="skeleton mt-5 h-8 w-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
