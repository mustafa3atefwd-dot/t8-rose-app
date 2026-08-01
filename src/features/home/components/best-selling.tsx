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
    <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-12 text-start md:flex-row">
      <div className="flex w-full flex-col items-start gap-3 md:w-72 md:shrink-0 lg:w-80">
        <h4 className="text-body text-ds-text-secondary align-middle font-bold tracking-[0.25em] uppercase">
          {t('label')}
        </h4>
        <p className="text-maroon-700 dark:text-ds-bg-primary-saturated align-middle text-3xl leading-none font-bold">
          {t.rich('title', {
            accent: (chunks) => <span className="text-ds-bg-secondary">{chunks}</span>,
          })}
        </p>
        <p className="pb-12 align-middle text-lg leading-[1.2] font-normal text-zinc-500">
          {t('description')}
        </p>
        <Button className="capitalize" asChild>
          <Link href="/products?sortBy=bestSelling">
            {tButton('exploreGifts')} <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* carousel of products */}
      <div className="min-w-0 flex-1">
        <Suspense fallback={<BestSellingSkeleton />}>
          <BestSellingProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default BestSelling;
