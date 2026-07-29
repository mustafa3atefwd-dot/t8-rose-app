import { Rating } from '@/shared/components';
import { Review } from '../lib/types/product-reviews';
import { formatDate } from '@/shared/lib/utils/format-date';

export default function ProductReview({review}: {review: Review}) {
  const {rating, content, createdAt, user, headline} = review;
  return (
    <article className='mx-1.75 mt-2 pb-4 border-b border-ds-border-muted mb-2.5'>
      <header>
        <div className='flex items-center gap-2.5 ps-0.75'>
          {/* user avater */}
          <div className="size-11.25 rounded-full bg-maroon-600 flex items-center justify-center text-white text-xl font-semibold">
            {user.firstName[0]}
          </div>
          <div className='-space-y-2.5'>
            <h4 className='text-ds-text-plain text-base font-semibold'>{user.firstName}</h4>
            <span className='text-ds-text-muted text-sm font-medium'>{formatDate(createdAt)}</span>
          </div>
        </div>
        {/* rating */}
        <div className='flex items-center gap-1 my-2.5'>
          <Rating variant='filled' rating={rating} />
          <span className='text-ds-text-plain text-base font-semibold'>({rating.toFixed(1)})</span>
        </div>
      </header>
      {/* review content */}
      <div className='pt-1'>
        <h5 className='text-black text-base font-semibold dark:text-zinc-50'>{headline}</h5>
        <p className='text-ds-text-default text-base font-normal mt-1.5'>
          {content}
        </p>
      </div>
    </article>
  );
}
