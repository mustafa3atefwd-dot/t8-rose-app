import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import ProductCarousel from '@/features/home/components/product-carousel';
import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { getProductsAction } from '@/features/products/lib/actions';
import { SectionTitle } from '@/shared/components';

const RELATED_PRODUCTS_LIMIT = 10;

interface IRelatedProductsProps {
  categoryId: string;
  subCategoryId: string;
  currentProductId: string;
}

const RelatedProductsContent = async ({ categoryId, subCategoryId, currentProductId }: IRelatedProductsProps) => {
  const result = await getProductsAction({
    categoryId,
    subCategoryId,
    limit: RELATED_PRODUCTS_LIMIT,
  });

  const products = result?.status
    ? (result.payload?.data ?? []).filter((product) => product.id !== currentProductId)
    : null;

  return <ProductCarousel products={products} />;
};

const RelatedProductsSkeleton = () => (
  <div className="flex w-full gap-6 overflow-hidden">
    <div className="w-75 shrink-0">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 sm:block">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 lg:block">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 lg:block">
      <ProductCardSkeleton />
    </div>
  </div>
);

const RelatedProducts = async (props: IRelatedProductsProps) => {
  const t = await getTranslations('productDetails');

  return (
    <section className="py-8 sm:py-12 md:py-15">
      <div className="container">
        <div className="mb-10">
          <SectionTitle className="mx-0! w-fit!">{t('relatedProducts.title')}</SectionTitle>
        </div>

        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProductsContent {...props} />
        </Suspense>
      </div>
    </section>
  );
};

export default RelatedProducts;
