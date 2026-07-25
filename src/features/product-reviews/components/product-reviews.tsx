'use client';
import { Rating, SectionTitle } from '@/shared/components';
import ProductReview from './product-review';
import ProductReviewSkeleton from '../skeletons/product-review.skeleton';
import { useProductReviews } from '../hooks/use-product-reviews';
import { useProductRating } from '../hooks/use-product-rating';
import { useTranslations } from 'next-intl';
type Props = {
  productId: string;
};
export default function ProductReviews({ productId }: Props) {
  const t = useTranslations('productReview');

  const { data: productRatingData } = useProductRating(productId);

  const { data: reviewsData, ref, isFetchingNextPage, isPending} = useProductReviews(productId);

  const reviews = reviewsData?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <section>
      <div className="container">
        <SectionTitle className="ms-0 mb-2.5">{t('title')}</SectionTitle>
        <header className="border-ds-border-muted mb-4 space-y-1 border-b pb-4">
          <h3 className="text-ds-text-plain text-xl font-semibold">{t('subTitle')}</h3>
          <div className="flex items-center gap-1">
            <span className="text-ds-text-plain text-2xl font-bold">
              {productRatingData?.payload.product.rating.toFixed(1) || 0}
            </span>
            <span className="text-ds-text-muted text-sm font-medium">
              ({productRatingData?.payload.product.ratings || 0} {t('ratings')})
            </span>
          </div>
          <Rating variant="filled" rating={productRatingData?.payload.product.rating || 0} className="justify-start" />
        </header>
        <div className="flex items-center gap-5">
          {/* product reviews */}
          <div className="border-ds-border-muted max-h-91.75 flex-2 overflow-auto border-e pe-5">
            {isPending ? (
              Array.from({ length: 2 }).map((_, index) => (
                <ProductReviewSkeleton key={index} />
              ))
            ) : reviews.length > 0 ? (
              <>
                {reviews.map((review) => (
                  <ProductReview key={review.id} review={review} />
                ))}

                <div ref={ref}>{isFetchingNextPage && <ProductReviewSkeleton />}</div>
              </>
            ) : (
              <div className="flex min-h-91.75 items-center justify-center">
                <p className="text-ds-text-muted">{t('noReviews')}</p>
              </div>
            )}
          </div>
          {/* user rating */}
          <div className="min-h-91.75 flex-1 bg-violet-500"></div>
        </div>
      </div>
    </section>
  );
}
