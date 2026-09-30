import { Skeleton } from '@/shared/components/ui/skeleton';

interface IOrderItemsSkeletonProps {
  count?: number;
}

export function OrderItemsSkeleton({ count = 4 }: IOrderItemsSkeletonProps) {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between py-2">
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="bg-ds-bg-plain grid grid-cols-1 gap-2 rounded-lg p-4 md:grid-cols-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex gap-2.5 overflow-hidden rounded-lg">
            <Skeleton className="h-25 w-25 shrink-0 rounded-lg md:h-35.5 md:w-29" />

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-2">
              <Skeleton className="h-5 w-3/4 md:h-6" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-32 md:h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
