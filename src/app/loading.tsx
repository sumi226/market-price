export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8 sm:px-6">
      <div className="skeleton h-48 w-full rounded-3xl sm:h-56" />
      <div className="space-y-4">
        <div className="skeleton h-8 w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 p-4"
            >
              <div className="skeleton h-24 w-full" />
              <div className="skeleton mt-4 h-5 w-3/4" />
              <div className="skeleton mt-3 h-4 w-1/2" />
              <div className="skeleton mt-5 h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
