import { Skeleton } from '@/shared/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';

type ItemsSkeletonProps = {
  count?: number;
};

export default function ItemsSkeleton({ count = 3 }: ItemsSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const isLast = index === count - 1;
        return (
          <div key={index} className={cn('', !isLast && 'border-b-ds-border-muted mb-4 border-b pb-5')}>
            <div className="flex gap-4">
              {/* Item Image Skeleton */}
              <Skeleton className="rounded-ds-lg h-35 w-29.25 shrink-0" />

              {/* Item Details Skeleton */}
              <div className="flex flex-1 flex-col justify-between">
                {/* Header Skeleton */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    {/* Title Skeleton */}
                    <Skeleton className="rounded-ds-sm h-6 w-48" />
                    {/* Rating Skeleton */}
                    <Skeleton className="rounded-ds-sm h-5 w-36" />
                  </div>

                  {/* Remove Button Skeleton */}
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-end justify-between">
                  {/* Price Skeleton */}
                  <Skeleton className="rounded-ds-sm h-7 w-28" />

                  {/* Quantity Controls Skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-10 rounded-lg" />
                    <Skeleton className="h-10 w-25.75 rounded-lg" />
                    <Skeleton className="size-10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
