import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface RatingStarsProps {
  rating: number;
  label: string;
}

const RatingStars = ({ rating, label }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            'size-3.5',
            index < Math.round(rating) ? 'fill-ds-text-warning text-ds-text-warning' : 'text-ds-border-soft fill-transparent'
          )}
        />
      ))}
    </div>
  );
};

export default RatingStars;
