'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/features/products/components/product-card';
import { useOccasions, useProducts } from '@/features/products/hooks';
import { Spinner } from '@/shared/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const OCCASION_FILTERS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'] as const;
const PRODUCTS_LIMIT = 12; // 4 cols x 3 rows

const MostPopular = () => {
  const [activeOccasion, setActiveOccasion] = useState<(typeof OCCASION_FILTERS)[number]>(OCCASION_FILTERS[0]);

  const { data: occasionsData, isPending: isOccasionsPending, isError: isOccasionsError } = useOccasions();

  const activeOccasionId = useMemo(
    () => occasionsData?.data.find((occasion) => occasion.title === activeOccasion)?.id,
    [occasionsData, activeOccasion]
  );

  const {
    data,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useProducts({ limit: PRODUCTS_LIMIT, occasionId: activeOccasionId }, { enabled: Boolean(activeOccasionId) });

  const products = data?.data ?? [];
  const isPending = isOccasionsPending || isProductsPending;
  const isError = isOccasionsError || isProductsError;

  return (
    <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-12 text-center">
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-body text-ds-text-secondary font-bold tracking-[0.25em] uppercase">Most Popular</h4>
        <p className="text-3xl leading-none font-bold">
          <span className="text-ds-bg-secondary">Shop by</span> Occasion
        </p>
      </div>

      <Tabs value={activeOccasion} onValueChange={(value) => setActiveOccasion(value as (typeof OCCASION_FILTERS)[number])}>
        <TabsList variant="segmented">
          {OCCASION_FILTERS.map((occasion) => (
            <TabsTrigger key={occasion} value={occasion}>
              {occasion}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isPending ? (
        <div className="flex w-full items-center justify-center py-12">
          <Spinner className="size-6" />
        </div>
      ) : isError || products.length === 0 ? (
        <p className="text-ds-text-muted w-full py-12">{isError ? 'Failed to load products.' : 'No products yet.'}</p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MostPopular;
