'use client';

import { useState } from 'react';
import ProductCard from '@/features/products/components/product-card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { IProduct } from '@/features/products/lib/types/product';
import { OCCASION_FILTERS, OccasionFilter } from './most-popular.constants';

interface MostPopularTabsProps {
  /** Products fetched server-side, keyed by occasion tab. `null` means that occasion's fetch failed. */
  productsByOccasion: Record<OccasionFilter, IProduct[] | null>;
}

const MostPopularTabs = ({ productsByOccasion }: MostPopularTabsProps) => {
  const [activeOccasion, setActiveOccasion] = useState<OccasionFilter>(OCCASION_FILTERS[0]);
  const products = productsByOccasion[activeOccasion];

  return (
    <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-12 text-center">
      <div className="flex w-full items-center justify-between gap-3">
        <h4 className="text-ds-text-primary relative text-4xl font-bold">
          Most Popular
          <div className="bg-soft-pink-100 absolute -bottom-1 left-0 -z-1 h-5 w-[75%] rounded-r-2xl before:block before:h-1 before:w-16 before:translate-y-4 before:bg-soft-pink-700 before:content-['']"></div>
        </h4>

        <Tabs value={activeOccasion} onValueChange={(value) => setActiveOccasion(value as OccasionFilter)}>
          <TabsList variant="line">
            {OCCASION_FILTERS.map((occasion) => (
              <TabsTrigger key={occasion} value={occasion}>
                {occasion}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-ds-text-muted w-full py-12">
          {products === null ? 'Failed to load products.' : 'No products yet.'}
        </p>
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

export default MostPopularTabs;
