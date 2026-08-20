'use client';

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
import { IProduct } from '@/features/products/lib/types/product';

interface ProductCarouselProps {
  products: IProduct[] | null;
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
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
    );
  }

  return (
    <Carousel opts={{ align: 'start', containScroll: 'trimSnaps' }} className="w-full">
      <CarouselContent className="-ml-4 sm:-ml-6">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-[88%] pl-4 min-[440px]:basis-[70%] sm:basis-85 sm:pl-6">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="default"
        className="bg-maroon-500 hover:bg-maroon-600 left-4 hidden p-4 text-white sm:flex"
      />
      <CarouselNext
        variant="default"
        className="bg-maroon-500 hover:bg-maroon-600 right-4 hidden p-4 text-white sm:flex"
      />
    </Carousel>
  );
};

export default ProductCarousel;
