import { getAllOrders } from '@/features/orders/lib/apis/get-orders.api';
import { OrderCard, OrdersPagination, OrdersEmpty } from '@/features/orders/components';
import { getTranslations } from 'next-intl/server';

const ORDERS_LIMIT = 12;

interface IOrdersPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: IOrdersPageProps) {
  // Translations
  const t = await getTranslations('orders');

  // Resolve search params
  const params = await searchParams;

  // Get page from search params
  const page = Math.max(Number(params.page) || 1, 1);

  // Get all orders
  const orders = await getAllOrders({
    limit: ORDERS_LIMIT,
    page,
  });

  // Total pages and orders
  const totalPages = orders.payload?.metadata?.totalPages ?? 1;
  const data = orders.payload?.data ?? [];

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-15.5">
      <div className="container">
        {/* Page Title */}
        <h1 className="text-ds-text-plain mb-6 text-2xl font-bold lg:text-3xl xl:text-5xl">{t('title')}</h1>

        {/* Orders Empty */}
        {data.length === 0 ? (
          <OrdersEmpty />
        ) : (
          <>
            {/* Orders List */}
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

            {/* Orders Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 mb-2 flex items-center justify-center">
                <OrdersPagination page={page} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
