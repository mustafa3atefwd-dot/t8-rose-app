import ProductReviewForm from '@/features/product-details/components/product-review-form';
import RelatedProducts from '@/features/product-details/components/related-products';
import { getProductByIdAction } from '@/features/products/lib/actions';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { productId } = await params;

  const response = await getProductByIdAction(productId);

  if (!response.status || !response.payload?.product) {
    notFound();
  }

  const product = response.payload.product;

  return (
    <>
      <ProductReviewForm productId={productId} />

      <RelatedProducts
        categoryId={product.categoryId}
        subCategoryId={product.subCategoryId ?? ''}
        currentProductId={product.id}
      />
    </>
  );
}
