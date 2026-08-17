import { Suspense } from 'react';
import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';
import ProductsGrid from '@/features/products/components/products-grid';
import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { PRODUCTS_PAGE_SIZE } from '@/features/products/lib/constants';

const ProductsPage = async () => {
  // Query
  const [categoriesResult, occasionsResult] = await Promise.all([
    getCategoriesAction({ limit: 50 }).catch(() => null),
    getOccasionsAction({ limit: 50 }).catch(() => null),
  ]);

  // Variables
  const categories = categoriesResult?.status ? (categoriesResult.payload?.data ?? []) : [];
  const occasions = occasionsResult?.status ? (occasionsResult.payload?.data ?? []) : [];

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8 md:flex-row">
      <ProductFiltersSidebar categories={categories} occasions={occasions} />

      <main className="w-full min-w-0 flex-1">
        <Suspense
          fallback={
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <ProductsGrid />
        </Suspense>
      </main>
    </div>
  );
};

export default ProductsPage;
