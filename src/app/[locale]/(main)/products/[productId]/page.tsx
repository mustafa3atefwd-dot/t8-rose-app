import { Suspense } from 'react';
import { ProductDetails, ProductDetailsSkeleton } from '@/features/product-details';
import { getProductById } from '@/features/products';
import { ApiError } from '@/shared/lib/utils/error.util';
import { notFound } from 'next/navigation';

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

async function ProductDetailsContent({ productId, locale }: { productId: string; locale: string }) {
  const product = await loadProduct(productId);

  return <ProductDetails product={product} locale={locale} />;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { locale, productId } = await params;

  return (
   <>
       <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent productId={productId} locale={locale} />
    </Suspense>
        <Suspense fallback={<ProductReviewSkeleton />}>
       <ProductReviews productId={productId} />
    </Suspense>
   </>
  );
}
