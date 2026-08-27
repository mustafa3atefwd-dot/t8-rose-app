import { Skeleton } from '@/shared/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-ds-lg border-ds-border-soft bg-ds-bg-plain mx-auto flex w-full max-w-75 flex-col overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-xl" />

      <div className="flex flex-col gap-2 py-3">
        <Skeleton className="h-5 w-3/4 rounded-ds-sm" />

        <Skeleton className="h-4 w-24 rounded-ds-sm" />

        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-16 rounded-ds-sm" />
          <Skeleton className="size-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
