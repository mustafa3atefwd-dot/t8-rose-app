import { Rating } from '@/shared/components';
import { Review } from '../lib/types/product-reviews';
import { formatDate } from '@/shared/lib/utils/format-date';

export default function ProductReview({ review }: { review: Review }) {
  const { rating, content, createdAt, user, headline } = review;
  return (
    <article className="border-ds-border-muted mx-1 mt-2 mb-2.5 border-b pb-4 sm:mx-1.75">
      <header>
        <div className="flex items-center gap-2.5 ps-0.75">
          {/* user avater */}
          <div className="bg-maroon-600 flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white sm:size-11.25 sm:text-xl">
            {user.firstName[0]}
          </div>
          <div className="min-w-0">
            <h4 className="text-ds-text-plain truncate text-sm font-semibold sm:text-base">{user.firstName}</h4>
            <span className="text-ds-text-muted text-xs font-medium sm:text-sm">{formatDate(createdAt)}</span>
          </div>
        </div>
        {/* rating */}
        <div className="my-2.5 flex items-center gap-1">
          <Rating variant="filled" rating={rating} />
          <span className="text-ds-text-plain text-sm font-semibold sm:text-base">({rating.toFixed(1)})</span>
        </div>
      </header>
      {/* review content */}
      <div className="pt-1">
        <h5 className="text-ds-text-plain text-sm font-semibold sm:text-base">{headline}</h5>
        <p className="text-ds-text-default mt-1.5 text-sm leading-6 font-normal sm:text-base">{content}</p>
      </div>
    </article>
  );
}
