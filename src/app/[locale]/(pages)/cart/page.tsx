import LeftSide from '@/features/cart/components/left-side';
import OrderSummary from '@/shared/components/order-summary';
import ProductsYouMayLike from '@/shared/components/products-you-may-like';
import { getProductsAction } from '@/features/products/lib/actions';

const MAY_LIKE_LIMIT = 10;

export default async function Cart() {
  const result = await getProductsAction({ limit: MAY_LIKE_LIMIT }).catch(() => null);
  const products = result?.status ? (result.payload?.data ?? []) : [];

  return (
    <>
      <div className="container mt-15.5 mb-9 grid grid-cols-1 gap-12.5 lg:grid-cols-3">
        {/* Cart items */}
        <div className="space-y-6 lg:col-span-2">
          <LeftSide />
        </div>

        {/* Order summary */}
        <aside className="h-fit lg:sticky lg:top-8">
          <OrderSummary />
        </aside>
      </div>

      <ProductsYouMayLike products={products} />
    </>
  );
}
