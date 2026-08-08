'use client';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { IProduct } from '@/features/products/lib/types';
import ProductCard from '@/features/products/components/product-card';


interface ProductsCarouselProps {
  title?: string;
  products: IProduct[];
}

export default function ProductsCarousel({
  title = 'Products You May Like',
  products,
}: ProductsCarouselProps) {


  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-maroon-700 mb-6 text-2xl font-bold text-left rtl:text-right">
          <span className="bg-soft-pink-100 relative inline-block pb-1 after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-2 after:w-full after:rounded-sm">
            {title.split(' ')[0]}
          </span>{' '}
          {title.split(' ').slice(1).join(' ')}
        </h2>

        <div className="relative w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="bg-maroon-600 hover:bg-maroon-700 absolute -left-4 top-1/2 z-30 h-8 w-8 -translate-y-1/2 border-none text-white" />
            <CarouselNext className="bg-maroon-600 hover:bg-maroon-700 absolute -right-4 top-1/2 z-30 h-8 w-8 -translate-y-1/2 border-none text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}