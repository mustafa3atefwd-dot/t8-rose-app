import ProductReviews from "@/features/product-reviews/components/product-reviews";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function page({params}: Props) {
  const {productId} = await params;
  return (
    <ProductReviews productId={productId}/>
  )
}
