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
import { useSession } from 'next-auth/react';

interface ProductCarouselProps {
  products: IProduct[] | null;
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const t = useTranslations('home.productCarousel');
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

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
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="-ml-6">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-full pl-6 sm:basis-85">
            <ProductCard product={product} isLoggedIn={isLoggedIn} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" className="bg-maroon-500 hover:bg-maroon-600 left-4 p-4 text-white" />
      <CarouselNext variant="default" className="bg-maroon-500 hover:bg-maroon-600 right-4 p-4 text-white" />
    </Carousel>
  );
};

export default ProductCarousel;
