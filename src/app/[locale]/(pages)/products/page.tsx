import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';
import ProductsPagee from '../../(auth)/p/page';
import Header from '@/shared/components/header-page';

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
        
        <aside className="w-full md:w-64 gap-8">
          <ProductFiltersSidebar categories={categories} occasions={occasions} />
        </aside>

        <main className="w-full min-w-0 ml-6 flex-1">
          <ProductsPagee />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
