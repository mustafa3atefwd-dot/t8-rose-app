import { cn } from '@/shared/lib/utils';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  className?: string;
  variant?: 'outline' | 'filled';
}

export default function Rating({ rating, className, variant = 'outline' }: RatingProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <span className="sr-only">{rating.toFixed(1)}</span>

      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          const fill = Math.min(Math.max(rating - index, 0), 1) * 100;

          return (
            <div key={index} className="relative h-5 w-5">
              {/* Empty Star */}
              <Star className={cn('absolute h-5 w-5', variant === 'outline' ? 'text-[#FBA707]' : 'text-transparent')} />

              {/* Filled Star */}
              <div className="absolute overflow-hidden" style={{ width: `${fill}%` }}>
                <Star className="h-5 w-5 fill-[#FBA707] text-[#FBA707]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
