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
          <div
            key={index}
            className={cn(
              '',
              !isLast && 'border-b border-b-ds-border-muted mb-4 pb-5'
            )}
          >
            <div className="flex gap-4">
              {/* Item Image Skeleton */}
              <Skeleton className="h-35 w-29.25 shrink-0 rounded-ds-lg" />

              {/* Item Details Skeleton */}
              <div className="flex flex-1 flex-col justify-between">
                {/* Header Skeleton */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-6 w-48 rounded-ds-sm" />
                    {/* Rating Skeleton */}
                    <Skeleton className="h-5 w-36 rounded-ds-sm" />
                  </div>

                  {/* Remove Button Skeleton */}
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-end justify-between">
                  {/* Price Skeleton */}
                  <Skeleton className="h-7 w-28 rounded-ds-sm" />

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
