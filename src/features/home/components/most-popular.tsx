import { Suspense } from 'react';
import { getOccasionsAction, getProductsAction } from '@/features/products/lib/actions';
import MostPopularTabs from './most-popular-tabs';
import MostPopularSkeleton from '../skeletons/most-popular-skeleton';
import {
  IOccasionTab,
  MOST_POPULAR_OCCASION_TABS_LIMIT,
  MOST_POPULAR_OCCASIONS_LIMIT,
  MOST_POPULAR_PRODUCTS_LIMIT,
} from './most-popular.constants';

const MostPopularContent = async () => {
  const occasionsResult = await getOccasionsAction({ limit: MOST_POPULAR_OCCASIONS_LIMIT }).catch(() => null);
  const occasions = occasionsResult?.status ? (occasionsResult.payload?.data ?? []) : [];

  const entries = await Promise.all(
    occasions.map(async (occasion): Promise<IOccasionTab> => {
      const result = await getProductsAction({
        limit: MOST_POPULAR_PRODUCTS_LIMIT,
        occasionId: occasion.id,
        sortBy: 'mostPopular',
        sortOrder: 'desc',
      }).catch(() => null);
      const products = result?.status ? (result.payload?.data ?? []) : [];
      return { id: occasion.id, title: occasion.title, products };
    })
  );

  // Only surface occasions that actually have products tagged against them, capped to keep the tab row short.
  const occasionTabs = entries.filter((entry) => entry.products.length > 0).slice(0, MOST_POPULAR_OCCASION_TABS_LIMIT);

  if (occasionTabs.length === 0) return null;

  return <MostPopularTabs occasionTabs={occasionTabs} />;
};

const MostPopular = () => {
  return (
    <Suspense fallback={<MostPopularSkeleton />}>
      <MostPopularContent />
    </Suspense>
  );
};

export default MostPopular;
