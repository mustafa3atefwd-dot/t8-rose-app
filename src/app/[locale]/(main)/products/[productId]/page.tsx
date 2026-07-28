import ProductReviews from "@/features/product-reviews/components/product-reviews";
import ProductReviewSkeleton from "@/features/product-reviews/skeletons/product-review.skeleton";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function page({params}: Props) {
  const {productId} = await params;
  return (
    <Suspense fallback={<ProductReviewSkeleton />}>
       <ProductReviews productId={productId} />
    </Suspense>
  )
}
