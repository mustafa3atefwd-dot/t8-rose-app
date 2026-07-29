'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  // 1. Translation / Locale
  const t = useTranslations('hero');
  const locale = useLocale(); 
  const isRtl = locale === 'ar';

  // 2. State
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // 3. Ref
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));

  // 4. Variables / Constants
  const SLIDES = [
    { id: 'flowers', image: sliderFlowers, link: '/category/flowers' },
    { id: 'chocolates', image: sliderChocolates, link: '/category/chocolates' },
    { id: 'gifts', image: sliderGifts, link: '/category/gifts' },
  ];

  const activeSlide = SLIDES[current] || SLIDES[0];

  // 5. Effects
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // 6. Callbacks / Handlers
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

      {/* Independent Floating Overlay Text Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-semibold tracking-wide md:text-5xl ltr:text-left rtl:text-right">
            {t(`slides.${activeSlide.id}.title`)}
          </h1>
          <p className="text-lg font-light text-white/80 ltr:text-left rtl:text-right">
            {t(`slides.${activeSlide.id}.desc`)}
          </p>
          <div className="pointer-events-auto pt-2 ltr:text-left rtl:text-right">
            <Button asChild className="bg-maroon-50 text-maroon-700 hover:bg-maroon-100 rounded-xl px-4 py-2.5 font-medium transition-colors">
              <Link href={activeSlide.link}>
                {t('buying')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="h-full w-full"
        opts={{
          loop: true,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <CarouselContent className="-ml-4 h-96">
          {SLIDES.map((slide, idx) => (
            <CarouselItem key={slide.id} className="relative h-full w-full rounded-2xl pl-4">
              <div className="relative flex h-full w-full items-end">
                <Image
                  src={slide.image}
                  alt={t(`slides.${slide.id}.title`)}
                  fill
                  placeholder="blur"
                  priority={idx === 0}
                  className="z-0 rounded-2xl object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
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