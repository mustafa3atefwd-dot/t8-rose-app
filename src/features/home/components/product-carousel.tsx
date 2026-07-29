'use client';

import ProductCard from '@/features/products/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { IProduct } from '@/features/products/lib/types/product';

interface ProductCarouselProps {
  /** Fetched server-side by the parent; `null` means the fetch failed. */
  products: IProduct[] | null;
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  if (!products || products.length === 0) {
    return (
      <p className="text-ds-text-muted w-full py-12 text-center">
        {products === null ? 'Failed to load products.' : 'No products yet.'}
      </p>
    );
  }

  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="-ml-6">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious variant="default" className="bg-ds-bg-primary hover:bg-ds-bg-primary-saturated left-4 p-4" />
      <CarouselNext variant="default" className="bg-ds-bg-primary hover:bg-ds-bg-primary-saturated right-4 p-4" />
    </Carousel>
  );
};

export default ProductCarousel;
