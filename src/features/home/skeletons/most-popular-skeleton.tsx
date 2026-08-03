import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { MOST_POPULAR_OCCASION_TABS_LIMIT, MOST_POPULAR_PRODUCTS_LIMIT } from '../components/most-popular.constants';

const MostPopularSkeleton = () => {
  return (
    <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-12 text-center">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="bg-ds-bg-muted rounded-ds-sm h-9 w-48 animate-pulse" />

        <div className="flex gap-4">
          {Array.from({ length: MOST_POPULAR_OCCASION_TABS_LIMIT }).map((_, index) => (
            <div key={index} className="bg-ds-bg-muted rounded-ds-sm h-8 w-20 animate-pulse" />
          ))}
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: MOST_POPULAR_PRODUCTS_LIMIT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default MostPopularSkeleton;
