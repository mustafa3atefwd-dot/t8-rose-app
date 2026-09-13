import { Skeleton } from '@/shared/components/ui/skeleton';

const SKELETON_ROW_COUNT = 6;

export function ProductsTableSkeleton() {
  return Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => (
    <tr key={rowIndex} className="border-ds-border-muted border-b">
      <SkeletonCell className="px-5"><Skeleton className="h-4 w-3/4" /></SkeletonCell>
      <SkeletonCell className="px-2 md:px-5"><Skeleton className="h-4 w-16" /></SkeletonCell>
      <SkeletonCell className="px-2 md:px-5"><Skeleton className="h-4 w-14" /></SkeletonCell>
      <SkeletonCell className="hidden px-5 md:table-cell"><Skeleton className="h-4 w-12" /></SkeletonCell>
      <SkeletonCell className="hidden px-5 md:table-cell"><Skeleton className="h-4 w-20" /></SkeletonCell>
      <SkeletonCell className="px-2 md:px-5">
        <div className="flex justify-end gap-2">
          <Skeleton className="size-7 md:h-7 md:w-14" />
          <Skeleton className="hidden h-7 w-16 md:block" />
        </div>
      </SkeletonCell>
    </tr>
  ));
}

function SkeletonCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`h-15 py-3.5 ${className ?? ''}`}>{children}</td>;
}
