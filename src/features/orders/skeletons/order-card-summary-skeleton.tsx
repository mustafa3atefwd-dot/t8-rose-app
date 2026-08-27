import { Skeleton } from '@/shared/components/ui/skeleton';

export function OrderCardSummarySkeleton() {
  return (
    <>
      {/* Price & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-3">
        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 md:h-7 md:w-28" />
          <Skeleton className="h-6 w-24 md:h-7 md:w-28" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Payment & Delivery */}
      <div className="space-y-2 py-4 md:px-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-5 w-48" />
      </div>
    </>
  );
}
