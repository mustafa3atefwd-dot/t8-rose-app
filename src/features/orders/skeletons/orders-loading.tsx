import { OrderCardSkeleton, OrdersPageHeaderSkeleton, OrdersPaginationSkeleton } from '@/features/orders/skeletons';

const ORDERS_SKELETON_COUNT = 4;

export default function OrdersLoading() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-15.5">
      <div className="container">
        <OrdersPageHeaderSkeleton />

        {Array.from({ length: ORDERS_SKELETON_COUNT }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))}

        <OrdersPaginationSkeleton />
      </div>
    </section>
  );
}
