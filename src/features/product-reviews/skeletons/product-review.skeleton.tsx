function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className ?? ''}`} />;
}

export default function ProductReviewSkeleton() {
  return (
    <article className="border-ds-border-muted mx-1.75 mt-2 mb-2.5 border-b pb-4">
      <header>
        <div className="flex items-center gap-2.5 ps-0.75">
          <SkeletonBlock className="size-11.25 shrink-0 rounded-full" />
          <div className="-space-y-2.5">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-3.5 w-16" />
          </div>
        </div>
        <div className="my-2.5 flex items-center gap-1">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-4 w-8" />
        </div>
      </header>
      <div className="space-y-2 pt-1">
        <SkeletonBlock className="h-4 w-3/5" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
      </div>
    </article>
  );
}
