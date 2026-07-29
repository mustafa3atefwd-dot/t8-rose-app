import ProductReviewForm from '@/features/product-details/components/product-review-form';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function page({ params }: Props) {
  const { productId } = await params;
  return <ProductReviewForm productId={productId} />;
}
