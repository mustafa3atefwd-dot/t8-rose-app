import { OrderCardHeaderSkeleton, OrderCardSummarySkeleton, OrderItemsSkeleton } from '@/features/orders/skeletons/';

export function OrderCardSkeleton() {
  return (
    <article className="bg-ds-bg-muted border-ds-border-muted mb-4 overflow-hidden rounded-xl border">
      <OrderCardHeaderSkeleton />

      <div className="p-4">
        <OrderCardSummarySkeleton />

        <OrderItemsSkeleton />
      </div>
    </article>
  );
}
