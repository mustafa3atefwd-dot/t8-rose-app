'use client';

<<<<<<< HEAD
import ProductCard from '@/features/products/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/components/ui/carousel';
=======
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import ProductCard from '@/features/products/components/product-card';
import { Button } from '@/shared/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
>>>>>>> origin/sprint/home-page
import { IProduct } from '@/features/products/lib/types/product';

interface ProductCarouselProps {
  /** Fetched server-side by the parent; `null` means the fetch failed. */
  products: IProduct[] | null;
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
<<<<<<< HEAD
  if (!products || products.length === 0) {
    return (
      <p className="w-full py-12 text-center text-ds-text-muted">
        {products === null ? 'Failed to load products.' : 'No products yet.'}
      </p>
=======
  const t = useTranslations('home.productCarousel');
  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-4 py-12 text-center">
        <p className="text-ds-text-muted">{products === null ? t('error') : t('empty')}</p>
        {products === null && (
          <Button variant="outline" onClick={() => router.refresh()}>
            {t('retry')}
          </Button>
        )}
      </div>
>>>>>>> origin/sprint/home-page
    );
  }

  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="-ml-6">
        {products.map((product) => (
<<<<<<< HEAD
          <CarouselItem key={product.id} className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3">
=======
          <CarouselItem key={product.id} className="basis-full pl-6 sm:basis-85">
>>>>>>> origin/sprint/home-page
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
<<<<<<< HEAD
      <CarouselPrevious variant="default" className="left-4 bg-ds-bg-primary hover:bg-ds-bg-primary-saturated p-4" />
      <CarouselNext variant="default" className="right-4 bg-ds-bg-primary hover:bg-ds-bg-primary-saturated p-4" />
=======
      <CarouselPrevious variant="default" className="bg-maroon-500 hover:bg-maroon-600 left-4 p-4 text-white" />
      <CarouselNext variant="default" className="bg-maroon-500 hover:bg-maroon-600 right-4 p-4 text-white" />
>>>>>>> origin/sprint/home-page
    </Carousel>
  );
};

export default ProductCarousel;
