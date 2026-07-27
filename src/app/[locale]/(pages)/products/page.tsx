import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';

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
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row">
      <ProductFiltersSidebar categories={categories} occasions={occasions} />
    </div>
  );
};

export default ProductsPage;
