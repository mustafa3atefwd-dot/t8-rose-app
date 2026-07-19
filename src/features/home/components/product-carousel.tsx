'use client';

import ProductCard from '@/features/products/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/components/ui/carousel';
import { IProduct } from '@/features/products/lib/types/product';

interface ProductCarouselProps {
  /** Fetched server-side by the parent; `null` means the fetch failed. */
  products: IProduct[] | null;
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  if (!products || products.length === 0) {
    return (
      <p className="w-full py-12 text-center text-ds-text-muted">
        {products === null ? 'Failed to load products.' : 'No products yet.'}
      </p>
    );
  }

  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="-ml-6">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" className="left-4 bg-ds-bg-primary hover:bg-ds-bg-primary-saturated p-4" />
      <CarouselNext variant="default" className="right-4 bg-ds-bg-primary hover:bg-ds-bg-primary-saturated p-4" />
    </Carousel>
  );
};

export default ProductCarousel;
