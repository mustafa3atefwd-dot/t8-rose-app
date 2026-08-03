import { Rating, SectionTitle } from '@/shared/components';
import ProductReview from './product-review';
import { getTranslations } from 'next-intl/server';
import { ReviewsResponse } from '../lib/types/product-reviews';
import { IProductDetail } from '@/features/products/lib/types';
import ProductReviewForm from './product-review-form';

type Props = {
  reviewsData: ReviewsResponse;
  productRatingData: IProductDetail;
};

export default async function ProductReviews({ reviewsData, productRatingData }: Props) {
  const t = await getTranslations('productReview');
  return (
    <section>
      <div className="container">
        <SectionTitle className="ms-0 mb-2.5">{t('title')}</SectionTitle>
        <header className="border-ds-border-muted mb-4 space-y-1 border-b pb-4">
          <h3 className="text-ds-text-plain text-xl font-semibold">{t('subTitle')}</h3>
          <div className="flex items-center gap-1">
            <span className="text-ds-text-plain text-2xl font-bold">{productRatingData?.rating.toFixed(1) || 0}</span>
            <span className="text-ds-text-muted text-sm font-medium">
              ({productRatingData?.ratings || 0} {t('ratings')})
            </span>
          </div>
          <Rating variant="filled" rating={productRatingData?.rating || 0} className="justify-start" />
        </header>
        <div className="flex items-center gap-2">
          {/* product reviews */}
          <div className="border-ds-border-muted hide-scrollbar max-h-91.75 flex-2 overflow-auto border-e pe-5">
            {reviewsData?.payload.data.length > 0 ? (
              reviewsData.payload.data.map((review) => <ProductReview key={review.id} review={review} />)
            ) : (
              <div className="flex min-h-91.75 items-center justify-center">
                <p className="text-ds-text-muted">{t('noReviews')}</p>
              </div>
            )}
          </div>
          {/* user rating */}
          <div className="min-h-91.75 flex-1">
            <ProductReviewForm productId={productRatingData.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
