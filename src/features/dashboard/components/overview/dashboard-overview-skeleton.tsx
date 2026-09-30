import { Skeleton } from '@/shared/components/ui/skeleton';

// Shared skeleton for dashboard list sections
function ListSkeleton() {
  return (
    <div className="bg-ds-bg-plain rounded-2xl p-4 sm:p-6">
      <Skeleton className="h-8 w-48" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 pb-6" aria-busy="true" aria-label="Loading dashboard overview">
      {/* ===== Summary And Categories Skeleton ===== */}
      <div className="grid gap-6 xl:grid-cols-[minmax(20rem,0.85fr)_minmax(24rem,1fr)]">
        <div className="bg-ds-bg-plain grid grid-cols-1 gap-4 rounded-2xl p-4 min-[430px]:grid-cols-2 sm:p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="min-h-32 rounded-2xl sm:min-h-36" />
          ))}
        </div>
        <ListSkeleton />
      </div>

      {/* ===== Product Lists Skeleton ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
