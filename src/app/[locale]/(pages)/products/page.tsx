import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { getCategoriesAction, getOccasionsAction, getProductsAction } from '@/features/products/lib/actions';
import { PRODUCTS_PAGE_SIZE } from '@/features/products/lib/constants';

interface ProductsPageProps {
  searchParams: Promise<{
    categoryId?: string;
    occasionId?: string;
    minRating?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { categoryId, occasionId, minRating, minPrice, maxPrice, page } = await searchParams;

  const [categoriesResult, occasionsResult] = await Promise.all([
    getCategoriesAction({ limit: 50 }).catch(() => null),
    getOccasionsAction({ limit: 50 }).catch(() => null),
    getProductsAction({
      limit: PRODUCTS_PAGE_SIZE,
      page: page ? Number(page) : undefined,
      categoryId,
      occasionId,
      minRating: minRating ? Number(minRating) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    }).catch(() => null),
  ]);

  const categories = categoriesResult?.status ? (categoriesResult.payload?.data ?? []) : [];
  const occasions = occasionsResult?.status ? (occasionsResult.payload?.data ?? []) : [];

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row">
      <ProductFiltersSidebar categories={categories} occasions={occasions} />
    </div>
  );
};

export default ProductsPage;
