'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProductCard from '@/features/products/components/product-card';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { IOccasionTab } from './most-popular.constants';

interface MostPopularTabsProps {
  /** Occasions fetched server-side, pre-filtered to only those with products. */
  occasionTabs: IOccasionTab[];
}

const MostPopularTabs = ({ occasionTabs }: MostPopularTabsProps) => {
  const t = useTranslations('home');
  const [activeOccasionId, setActiveOccasionId] = useState(occasionTabs[0].id);
  const products = occasionTabs.find((occasion) => occasion.id === activeOccasionId)?.products ?? [];

  return (
    <section className="container mx-auto flex flex-col items-stretch gap-6 px-4 py-8 sm:gap-8 sm:py-12">
      <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <h4 className="text-ds-text-primary relative text-3xl font-bold sm:text-4xl">
          {t('label')}
          <div className="bg-soft-pink-100 dark:bg-ds-bg-plain before:bg-soft-pink-700 absolute -bottom-1 left-0 -z-1 h-5 w-[75%] rounded-r-2xl before:block before:h-1 before:w-16 before:translate-y-4 before:content-['']"></div>
        </h4>

        <Tabs value={activeOccasionId} onValueChange={setActiveOccasionId} className="w-full min-w-0 md:w-auto">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto pb-1 md:w-auto">
            {occasionTabs.map((occasion) => (
              <TabsTrigger key={occasion.id} value={occasion.id} className="shrink-0 whitespace-nowrap">
                {occasion.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Button className="self-end capitalize" asChild variant="link">
        <Link href={`/products?occasionId=${activeOccasionId}&sortBy=mostPopular`}>
          {t('viewMore')} <ArrowRight />
        </Link>
      </Button>
    </section>
  );
};

export default MostPopularTabs;
