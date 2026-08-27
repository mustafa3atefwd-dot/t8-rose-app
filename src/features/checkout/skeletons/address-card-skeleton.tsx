import { Skeleton } from '@/shared/components/ui/skeleton'; 

export function AddressSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4"
        >
          {/* Title & Street Address Pill */}
          <div className="space-y-2.5">
            <Skeleton className="h-5 w-24 bg-zinc-400  rounded-md" />
            <Skeleton className="h-6 w-52 bg-zinc-400  rounded-full sm:w-64" />
          </div>

          {/* Phone Circle Icon & Number */}
          <div className="flex items-center gap-2 dir-ltr">
            <Skeleton className="h-8 w-8 bg-zinc-400 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-28 bg-zinc-400  rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}