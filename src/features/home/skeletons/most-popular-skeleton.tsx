import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { MOST_POPULAR_OCCASION_TABS_LIMIT, MOST_POPULAR_PRODUCTS_LIMIT } from '../components/most-popular.constants';

const MostPopularSkeleton = () => {
  return (
    <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:py-12">
      <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div className="bg-ds-bg-muted rounded-ds-sm h-9 w-48 animate-pulse" />

        <div className="flex w-full gap-4 overflow-hidden md:w-auto">
          {Array.from({ length: MOST_POPULAR_OCCASION_TABS_LIMIT }).map((_, index) => (
            <div key={index} className="bg-ds-bg-muted rounded-ds-sm h-8 w-20 animate-pulse" />
          ))}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: MOST_POPULAR_PRODUCTS_LIMIT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default MostPopularSkeleton;
