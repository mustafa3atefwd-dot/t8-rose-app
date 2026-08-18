import { Skeleton } from '@/shared/components/ui/skeleton';

export function WishlistSkeleton() {
  return (
    <main className="bg-ds-bg-default py-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="border-ds-border-soft flex gap-4 border-b py-5">
              <Skeleton className="h-28 w-24 shrink-0 rounded-lg sm:h-35 sm:w-29" />
              <div className="flex flex-1 flex-col justify-center gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
