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
      <div className="flex w-full items-center justify-between gap-3">
        <h4 className="text-ds-text-primary relative text-4xl font-bold">
          Most Popular
          <div className="bg-soft-pink-100 absolute -bottom-1 left-0 -z-1 h-5 w-[75%] rounded-r-2xl before:block before:h-1 before:w-16 before:translate-y-4 before:bg-soft-pink-700 before:content-['']"></div>
        </h4>

        <Tabs
          value={activeOccasion}
          onValueChange={(value) => setActiveOccasion(value as (typeof OCCASION_FILTERS)[number])}
        >
          <TabsList variant="line">
            {OCCASION_FILTERS.map((occasion) => (
              <TabsTrigger key={occasion} value={occasion}>
                {occasion}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

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
