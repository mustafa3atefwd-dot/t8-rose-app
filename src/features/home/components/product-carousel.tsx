'use client';

import ProductCard from '@/features/products/components/product-card';
import { useProducts } from '@/features/products/hooks';
import { Spinner } from '@/shared/components/ui/spinner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/components/ui/carousel';

const ProductCarousel = () => {
  const { data, isPending, isError } = useProducts({ page: 1, limit: 10 });
  const products = data?.data ?? [];

  if (isPending) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError || products.length === 0) {
    return (
      <p className="w-full py-12 text-center text-ds-text-muted">
        {isError ? 'Failed to load products.' : 'No products yet.'}
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
