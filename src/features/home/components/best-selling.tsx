<<<<<<< HEAD
import ProductCarousel from '@/features/home/components/product-carousel';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
=======
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProductCarousel from '@/features/home/components/product-carousel';
import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';
import { Button } from '@/shared/components/ui/button';
>>>>>>> origin/sprint/home-page
import { getProductsAction } from '@/features/products/lib/actions';

const BEST_SELLING_LIMIT = 10;

<<<<<<< HEAD
const BestSelling = async () => {
=======
const BestSellingProducts = async () => {
>>>>>>> origin/sprint/home-page
  const result = await getProductsAction({ limit: BEST_SELLING_LIMIT, sortBy: 'bestSelling', sortOrder: 'desc' }).catch(
    () => null
  );
  const products = result?.status ? (result.payload?.data ?? []) : null;

<<<<<<< HEAD
  return (
    <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-12 text-start md:flex-row">
      <div className="flex max-w-1/5 flex-col items-start gap-3">
        <h4 className="text-body text-ds-text-secondary align-middle font-bold tracking-[0.25em] uppercase">
          Best Selling
        </h4>
        <p className="text-maroon-700 align-middle text-3xl leading-none font-bold">
          <span className="text-ds-bg-secondary">Check Out</span> What Everyone’s{' '}
          <span className="text-ds-bg-secondary">Buying</span> Right Now
        </p>
        <p className="align-middle text-lg leading-[1.2] font-normal pb-12 text-zinc-500">
          Not sure what to choose? Start with our best sellers, these are the gifts our customers keep coming back for.
          Whether you &apos;re celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a
          lasting impression.
        </p>
        {/* button */}
        <Button className="capitalize ">
          explore gift <ArrowRight />
=======
  return <ProductCarousel products={products} />;
};

const BestSellingSkeleton = () => (
  <div className="flex w-full gap-6 overflow-hidden">
    <div className="w-75 shrink-0">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 sm:block">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 lg:block">
      <ProductCardSkeleton />
    </div>
  </div>
);

const BestSelling = async () => {
  const t = await getTranslations('home');

  return (
    <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-12 text-start md:flex-row">
      <div className="flex w-full flex-col items-start gap-3 md:w-72 md:shrink-0 lg:w-80">
        <h4 className="text-body text-ds-text-secondary align-middle font-bold tracking-[0.25em] uppercase">
          {t('bestSelling')}
        </h4>
        <p className="text-maroon-700 dark:text-ds-bg-primary-saturated align-middle text-3xl leading-none font-bold">
          {t.rich('bestSellingHeading', {
            accent: (chunks) => <span className="text-ds-bg-secondary">{chunks}</span>,
          })}
        </p>
        <p className="pb-12 align-middle text-lg leading-[1.2] font-normal text-zinc-500">
          {t('bestSellingDescription')}
        </p>
        <Button className="capitalize" asChild>
          <Link href="/products?sortBy=bestSelling">
            {t('Explore gifts')} <ArrowRight />
          </Link>
>>>>>>> origin/sprint/home-page
        </Button>
      </div>

      {/* carousel of products */}
<<<<<<< HEAD
      <ProductCarousel products={products} />
=======
      <div className="min-w-0 flex-1">
        <Suspense fallback={<BestSellingSkeleton />}>
          <BestSellingProducts />
        </Suspense>
      </div>
>>>>>>> origin/sprint/home-page
    </div>
  );
};

export default BestSelling;
