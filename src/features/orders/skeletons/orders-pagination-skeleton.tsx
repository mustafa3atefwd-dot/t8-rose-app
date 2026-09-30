import { Skeleton } from '@/shared/components/ui/skeleton';

interface IOrdersPaginationSkeletonProps {
  count?: number;
}

export function OrdersPaginationSkeleton({ count = 5 }: IOrdersPaginationSkeletonProps) {
  return (
    <div className="mt-20 mb-2 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="size-9 rounded-md" />
      ))}
    </div>
  );
}
