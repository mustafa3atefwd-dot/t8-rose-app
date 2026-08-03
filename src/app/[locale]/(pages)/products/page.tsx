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


    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4 py-8 flex-1">
        
        {/* Both children read the filter state from `useSearchParams`, which
            Next requires to sit under a Suspense boundary. */}
        <div className="w-full md:w-64 gap-8">
          <Suspense fallback={null}>
            <ProductFiltersSidebar categories={categories} occasions={occasions} />
          </Suspense>
        </div>

        <main className="w-full min-w-0 ml-6 flex-1 rtl:mr-6">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-2">
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
