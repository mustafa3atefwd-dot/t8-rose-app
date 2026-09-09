function ReviewItemSkeleton() {
  return (
    <article className="border-ds-border-muted mx-1.75 mt-2 mb-2.5 border-b pb-4">
      <header>
        <div className="flex items-center gap-2.5 ps-0.75">
          <div className="size-11.25 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3.5 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
        <div className="my-2.5 flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="size-5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ))}
          </div>
          <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </header>
      <div className="space-y-2 pt-1">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </article>
  );
}

export default function ProductReviewSkeleton() {
  return (
    <section>
      <div className="container">
        <div className="ms-0 mb-2.5 h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />

        <header className="border-ds-border-muted mb-4 space-y-2 border-b pb-4">
          <div className="h-6 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="size-5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ))}
          </div>
        </header>

        <div className="flex items-center gap-5">
          <div className="border-ds-border-muted max-h-91.75 flex-2 overflow-hidden border-e pe-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <ReviewItemSkeleton key={index} />
            ))}
          </div>
          <div className="min-h-91.75 flex-1" />
        </div>
      </div>
    </section>
  );
}
