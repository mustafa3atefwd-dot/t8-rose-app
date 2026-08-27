import { Suspense } from 'react';
import { ProductDetailsSkeleton } from '@/features/product-details';
import { getProductById } from '@/features/products';
import { ApiError } from '@/shared/lib/utils/error.util';
import { notFound } from 'next/navigation';
import ProductReviewSkeleton from '@/features/product-details/skeletons/product-review.skeleton';
import ProductReviews from '@/features/product-details/components/product-reviews';
import { getReviews } from '@/features/product-details/lib/apis/reviews.api';
import { ProductDetails } from '@/features/product-details/components/product-details';
import RelatedProducts from '@/features/product-details/components/related-products';

interface ProductDetailsPageProps {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
}

async function loadProduct(productId: string) {
  try {
    const response = await getProductById(productId);

    if (!response.status || !response.payload?.product) {
      notFound();
    }

    return response.payload.product;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function ProductDetailsContent({ params }: ProductDetailsPageProps) {
  const { locale, productId } = await params;
  const product = await loadProduct(productId);
  const reviewsData = await getReviews(productId, 1, 20);

  return (
    <>
      <Suspense
        fallback={
          <>
            <ProductDetailsSkeleton />
            <ProductReviewSkeleton />
          </>
        }
      >
        <ProductDetails product={product} locale={locale} />
        <ProductReviews reviewsData={reviewsData} productRatingData={product} />
        <RelatedProducts
          categoryId={product.category.id}
          subCategoryId={product.subCategoryId ?? ''}
          currentProductId={product.id}
        />
      </Suspense>
    </>
  );
}
