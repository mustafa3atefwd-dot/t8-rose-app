'use client';

import { useState } from 'react';
<<<<<<< HEAD
import ProductCard from '@/features/products/components/product-card';
=======
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProductCard from '@/features/products/components/product-card';
import { Button } from '@/shared/components/ui/button';
>>>>>>> origin/sprint/home-page
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { IOccasionTab } from './most-popular.constants';

interface MostPopularTabsProps {
  /** Occasions fetched server-side, pre-filtered to only those with products. */
  occasionTabs: IOccasionTab[];
}

const MostPopularTabs = ({ occasionTabs }: MostPopularTabsProps) => {
<<<<<<< HEAD
=======
  const t = useTranslations('home');
>>>>>>> origin/sprint/home-page
  const [activeOccasionId, setActiveOccasionId] = useState(occasionTabs[0].id);
  const products = occasionTabs.find((occasion) => occasion.id === activeOccasionId)?.products ?? [];

  return (
<<<<<<< HEAD
    <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-12 text-center">
      <div className="flex w-full items-center justify-between gap-3">
        <h4 className="text-ds-text-primary relative text-4xl font-bold">
          Most Popular
          <div className="bg-soft-pink-100 absolute -bottom-1 left-0 -z-1 h-5 w-[75%] rounded-r-2xl before:block before:h-1 before:w-16 before:translate-y-4 before:bg-soft-pink-700 before:content-['']"></div>
=======
    <div className="container mx-auto flex flex-col items-end gap-8 px-4 py-12">
      <div className="flex w-full items-center justify-between gap-3">
        <h4 className="text-ds-text-primary relative text-4xl font-bold">
          {t('mostPopular')}
          <div className="bg-soft-pink-100 dark:bg-ds-bg-plain before:bg-soft-pink-700 absolute -bottom-1 left-0 -z-1 h-5 w-[75%] rounded-r-2xl before:block before:h-1 before:w-16 before:translate-y-4 before:content-['']"></div>
>>>>>>> origin/sprint/home-page
        </h4>

        <Tabs value={activeOccasionId} onValueChange={setActiveOccasionId}>
          <TabsList variant="line">
            {occasionTabs.map((occasion) => (
              <TabsTrigger key={occasion.id} value={occasion.id}>
                {occasion.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

<<<<<<< HEAD
      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
=======
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
>>>>>>> origin/sprint/home-page
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
<<<<<<< HEAD
=======

      <Button className="capitalize" asChild variant="link">
        <Link href={`/products?occasionId=${activeOccasionId}&sortBy=mostPopular`}>
          {t('viewMore')} <ArrowRight />
        </Link>
      </Button>
>>>>>>> origin/sprint/home-page
    </div>
  );
};

export default MostPopularTabs;
