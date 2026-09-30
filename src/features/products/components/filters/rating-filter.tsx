import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { PRODUCT_MAX_RATING } from '../../lib/constants/product.constant';

interface RatingFilterProps {
  value?: number;
  onChange: (rating?: number) => void;
  label: (rating: number) => string;
}

const RatingFilter = ({ value = 0, onChange, label }: RatingFilterProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: PRODUCT_MAX_RATING }).map((_, index) => {
        const rating = index + 1;
        const isFilled = rating <= value;

        return (
          <button
            key={rating}
            type="button"
            aria-label={label(rating)}
            aria-pressed={isFilled}
            onClick={() => onChange(rating === value ? undefined : rating)}
            className="text-ds-text-warning rounded-sm transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Star
              className={cn('size-6.5', isFilled ? 'fill-ds-text-warning' : 'fill-transparent')}
              strokeWidth={1.75}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingFilter;
