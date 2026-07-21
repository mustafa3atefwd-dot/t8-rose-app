import { getOccasionsAction, getProductsAction } from '@/features/products/lib/actions';
import { IProduct } from '@/features/products/lib/types/product';
import MostPopularTabs from './most-popular-tabs';
import { MOST_POPULAR_PRODUCTS_LIMIT, OCCASION_FILTERS, OccasionFilter } from './most-popular.constants';

const MostPopular = async () => {
  const occasionsResult = await getOccasionsAction({ limit: 100 }).catch(() => null);
  const occasions = occasionsResult?.status ? (occasionsResult.payload?.data ?? []) : [];

  const entries = await Promise.all(
    OCCASION_FILTERS.map(async (title) => {
      const occasionId = occasions.find((occasion) => occasion.title === title)?.id;
      if (!occasionId) return [title, []] as [OccasionFilter, IProduct[]];

      const result = await getProductsAction({
        limit: MOST_POPULAR_PRODUCTS_LIMIT,
        occasionId,
        sortBy: 'mostPopular',
        sortOrder: 'desc',
      }).catch(() => null);
      const products = result?.status ? (result.payload?.data ?? []) : null;
      return [title, products] as [OccasionFilter, IProduct[] | null];
    })
  );

  const productsByOccasion = Object.fromEntries(entries) as Record<OccasionFilter, IProduct[] | null>;

  return <MostPopularTabs productsByOccasion={productsByOccasion} />;
};

export default MostPopular;
