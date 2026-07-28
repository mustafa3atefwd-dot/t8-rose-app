export default function ProductDetailsLoading() {
  return (
    <main className="bg-ds-bg-plain dark:bg-ds-bg-muted flex-1 py-6 sm:py-10">
      <div className="container">
        <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="bg-ds-bg-muted aspect-[3/2] rounded-xl" />
            <div className="mt-2 flex gap-2 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-ds-bg-muted aspect-[4/5] w-[90px] shrink-0 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:min-h-[522px]">
            <div className="bg-ds-bg-muted h-9 w-3/4 rounded" />
            <div className="bg-ds-bg-muted mt-3 h-8 w-1/2 rounded" />
            <div className="bg-ds-bg-muted my-5 h-px" />
            <div className="bg-ds-bg-muted h-5 w-1/3 rounded" />
            <div className="bg-ds-bg-muted my-5 h-px" />
            <div className="space-y-2">
              <div className="bg-ds-bg-muted h-4 rounded" />
              <div className="bg-ds-bg-muted h-4 rounded" />
              <div className="bg-ds-bg-muted h-4 w-4/5 rounded" />
            </div>
            <div className="mt-auto flex gap-3 pt-6">
              <div className="bg-ds-bg-muted h-12 w-12 rounded-lg" />
              <div className="bg-ds-bg-muted h-12 flex-1 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
