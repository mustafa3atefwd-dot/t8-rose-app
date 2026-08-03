import React, { useState, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl'; 
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/components/ui/carousel';
import { Button } from '@/shared/components/ui/button';

import sliderFlowers from '@/assets/images/slider-flowers.png';
import sliderChocolates from '@/assets/images/slider-chocolates.png';
import sliderGifts from '@/assets/images/slider-gift.png';

export function HeroCarousel() {
  const t = useTranslations('hero');
  const locale = useLocale(); 
  const isRtl = locale === 'ar';

  const [api, setApi] = useState<CarouselApi>();

  const SLIDES = [
    { id: 'flowers', image: sliderFlowers, link: '/category/flowers' },
    { id: 'chocolates', image: sliderChocolates, link: '/category/chocolates' },
    { id: 'gifts', image: sliderGifts, link: '/category/gifts' },
  ];

  // Created once via a lazy state initializer so the plugin instance is stable
  // without reading a ref during render.
  const [autoplayPlugin] = useState(() => Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));

  // Embla is an external store: subscribe to it instead of mirroring its state
  // into React state from inside an effect.
  const subscribeToApi = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};

      api.on('select', onStoreChange);
      api.on('reInit', onStoreChange);

      return () => {
        api.off('select', onStoreChange);
        api.off('reInit', onStoreChange);
      };
    },
    [api]
  );

  const current = useSyncExternalStore(
    subscribeToApi,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  );

  const count = useSyncExternalStore(
    subscribeToApi,
    () => api?.scrollSnapList().length ?? 0,
    () => 0
  );

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl lg:col-span-3">
      {/* Custom Header Dots */}
        <div className="absolute top-6 z-30 flex gap-2 ltr:right-8 rtl:left-8">
          {Array.from({ length: count || SLIDES.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                current === i ? 'bg-maroon-700 w-9' : 'bg-maroon-50 hover:bg-maroon-100 w-3'
              }`}
              aria-label={t('goToSlide', { number: i + 1 })}
            />
          ))}
        </div>
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin]}
        className="h-full w-full"
        opts={{
          loop: true,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <CarouselContent className="-ml-4 h-96">
          {SLIDES.map((slide, idx) => (
            <CarouselItem key={slide.id} className="relative h-full w-full rounded-2xl pl-4">
              <div className="relative flex h-full w-full items-end p-6">
                <Image
                  src={slide.image}
                  alt={t(`slides.${slide.id}.title`)}
                  fill
                  placeholder="blur"
                  priority={idx === 0}
                  className="z-0 rounded-2xl object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
                <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                <div className="relative z-20 max-w-lg space-y-4 text-white">
                  <h1 className="text-4xl font-semibold tracking-wide md:text-5xl ltr:text-left rtl:text-right">
                    {t(`slides.${slide.id}.title`)}
                  </h1>
                  <p className="text-lg font-light text-white/80 ltr:text-left rtl:text-right">
                    {t(`slides.${slide.id}.desc`)}
                  </p>
                  <div className="pt-2 ltr:text-left rtl:text-right">
                    <Link href={slide.link}>
                      <Button className="bg-maroon-50 text-maroon-700 hover:bg-maroon-100 rounded-xl px-4 py-2.5 font-medium transition-colors">
                        {t('buying')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Manual Slider Navigation */}
        <div className="bg-maroon-50 absolute bottom-6 z-30 flex items-center rounded-xl ltr:right-6 rtl:left-6">
          <Button
            size="icon"
            variant="ghost"
            className="bg-maroon-50 text-maroon-700 hover:bg-maroon-500 hover:text-maroon-400 h-7.5 w-7.5 backdrop-blur-md transition-all"
            onClick={() => api?.scrollPrev()}
            aria-label={t('prevSlide')}
          >
            <ChevronLeft className="h-5 w-5 transition-transform rtl:rotate-180" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="bg-maroon-50 text-maroon-700 hover:bg-maroon-500 hover:text-maroon-700 h-7.5 w-7.5 backdrop-blur-md transition-all"
            onClick={() => api?.scrollNext()}
            aria-label={t('nextSlide')}
          >
            <ChevronRight className="h-5 w-5 transition-transform rtl:rotate-180" />
          </Button>
        </div>
      </Carousel>
    </div>
  );
}
