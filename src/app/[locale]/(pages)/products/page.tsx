import { Suspense } from 'react';
import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';
import Header from '@/shared/components/header-page';
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
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-8 md:flex-row">
        {/* Both children read the filter state from `useSearchParams`, which
            Next requires to sit under a Suspense boundary. */}
        <div className="w-full gap-8 md:w-64">
          <Suspense fallback={null}>
            <ProductFiltersSidebar categories={categories} occasions={occasions} />
          </Suspense>
        </div>

        <main className="ml-8 w-full min-w-0 flex-1 rtl:mr-6">
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
    </div>
  );
};

export default ProductsPage;
