import { getProductByIdAction } from '@/features/products';
import { ProductDetails } from '@/features/product-details';
import { ApiError } from '@/shared/lib/utils/error.util';
import { notFound } from 'next/navigation';
import ProductReviews from '@/features/product-reviews/components/product-reviews';

interface ProductDetailsPageProps {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
}

async function loadProduct(productId: string) {
  try {
    const response = await getProductByIdAction(productId);

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

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { locale, productId } = await params;
  const product = await loadProduct(productId);

  return<>
  <ProductReviews productId={productId}/>
  <ProductDetails product={product} locale={locale} />;
  </> 

}
