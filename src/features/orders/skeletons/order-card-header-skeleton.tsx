import { Skeleton } from '@/shared/components/ui/skeleton';

export function OrderCardHeaderSkeleton() {
  return (
    <header className="bg-ds-bg-primary-saturated flex min-h-14 w-full items-center justify-between gap-4 p-4">
      <Skeleton className="h-6 w-32 bg-white/20 lg:h-7 lg:w-40" />

      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-32 bg-white/20 md:w-40" />
        <Skeleton className="size-4 rounded-full bg-white/20" />
      </div>
    </header>
  );
}
