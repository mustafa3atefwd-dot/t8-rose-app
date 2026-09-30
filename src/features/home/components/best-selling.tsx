import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProductCarousel from '@/features/home/components/product-carousel';
import BestSellingSkeleton from '@/features/home/skeletons/best-selling-skeleton';
import { Button } from '@/shared/components/ui/button';
import { getProductsAction } from '@/features/products/lib/actions';

const BEST_SELLING_LIMIT = 10;

const BestSellingProducts = async () => {
  const result = await getProductsAction({ limit: BEST_SELLING_LIMIT, sortBy: 'bestSelling', sortOrder: 'desc' }).catch(
    () => null
  );
  const products = result?.status ? (result.payload?.data ?? []) : null;

  return <ProductCarousel products={products} />;
};

const BestSelling = async () => {
  const t = await getTranslations('home.bestSelling');
  const tButton = await getTranslations('button');

  return (
    <section className="container mx-auto flex flex-col items-stretch gap-7 overflow-hidden px-4 py-8 text-start sm:gap-8 sm:py-12 md:flex-row md:items-start">
      <div className="flex w-full flex-col items-start gap-3 md:w-72 md:shrink-0 lg:w-80">
        <h4 className="text-ds-text-secondary text-sm font-bold tracking-[0.2em] uppercase sm:text-base sm:tracking-[0.25em]">
          {t('label')}
        </h4>
        <p className="text-maroon-700 dark:text-ds-bg-primary-saturated text-2xl leading-tight font-bold sm:text-3xl sm:leading-none">
          {t.rich('title', {
            accent: (chunks) => <span className="text-ds-bg-secondary">{chunks}</span>,
          })}
        </p>
        <p className="text-ds-text-muted max-w-prose pb-2 text-base leading-relaxed font-normal sm:pb-5 sm:text-lg sm:leading-[1.3] md:pb-8">
          {t('description')}
        </p>
        <Button className="w-full capitalize sm:w-auto" asChild>
          <Link href="/products?sortBy=bestSelling">
            {tButton('exploreGifts')} <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* carousel of products */}
      <div className="w-full min-w-0 flex-1">
        <Suspense fallback={<BestSellingSkeleton />}>
          <BestSellingProducts />
        </Suspense>
      </div>
    </section>
  );
};

export default BestSelling;
