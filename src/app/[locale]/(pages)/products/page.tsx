import { Suspense } from 'react';
import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import ProductsGrid from '@/features/products/components/products-grid';
<<<<<<< HEAD
import { getOccasionsAction } from '@/features/products/lib/actions';
import { getCategoriesAction } from '@/features/products/lib/actions/categories.action';
import Header from '@/shared/components/header-page';
=======
import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { PRODUCTS_PAGE_SIZE } from '@/features/products/lib/constants';
>>>>>>> origin/testing

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

<<<<<<< HEAD

    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4 py-8 flex-1">
        
        <aside className="w-full md:w-64 gap-8">
          <ProductFiltersSidebar categories={categories} occasions={occasions} />
        </aside>

        <main className="w-full min-w-0 ml-6 flex-1 rtl:mr-6">
          {/* <GetProductsPage /> */}
          <ProductsGrid />
=======
        <main className="ml-6 w-full min-w-0 flex-1 rtl:mr-6">
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
>>>>>>> origin/testing
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
