import ProductsYouMayLike from '@/shared/components/products-you-may-like';
import { getProductsAction } from '@/features/products/lib/actions';
import OrderSummarySidebar from '@/features/checkout/layouts/order-summary-sidebar';

const MAY_LIKE_LIMIT = 10;

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const result = await getProductsAction({ limit: MAY_LIKE_LIMIT }).catch(() => null);

  const products = result?.status ? (result.payload?.data ?? []) : [];

  return (
    <>
      <div className="container mt-6 mb-9 grid grid-cols-1 gap-8 px-3 sm:mt-10 sm:px-4 lg:mt-12 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        <main className="min-w-0 lg:col-span-2">{children}</main>

        <OrderSummarySidebar />
      </div>

      <ProductsYouMayLike products={products} />
    </>
  );
}
