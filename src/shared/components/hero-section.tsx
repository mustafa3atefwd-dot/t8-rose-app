'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sliderFlowers from '@/assets/images/slider-flowers.png';
import sliderChocolates from '@/assets/images/slider-chocolates.png';
import sliderGifts from '@/assets/images/slider-gift.png';
import categoryAnn from '@/assets/images/category-anniversary.png';
import categoryEngagement from '@/assets/images/category-engagement.png';
import categoryWedding from '@/assets/images/category-wedding.png';
import giftBoxes from '@/assets/images/gift-boxes.png';
import Autoplay from 'embla-carousel-autoplay';
import { Truck, RotateCcw, ShieldCheck, Headphones, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/components/ui/carousel';
import { Button } from '@/shared/components/ui/button';
import { HeroSkeleton } from './hero-skelaton';

// --- Static Asset Config ---
const HERO_SLIDES = [
  {
    id: 1,
    title: 'Say It with Flowers',
    description: 'Elegant gifts for every special moment.',
    image: sliderFlowers,
    link: '/category/flowers',
    buttonText: "I'm buying !",
  },
  {
    id: 2,
    title: 'Sweetest Expressions',
    description: 'Handcrafted chocolates made with love.',
    image: sliderChocolates,
    link: '/category/chocolates',
    buttonText: "I'm buying !",
  },
  {
    id: 3,
    title: 'Sweetest Expressions',
    description: 'Handcrafted chocolates made with love.',
    image: sliderGifts,
    link: '/category/chocolates',
    buttonText: "I'm buying !",
  },
  {
    id: 4,
    title: 'Sweetest Expressions',
    description: 'Handcrafted chocolates made with love.',
    image: sliderGifts,
    link: '/category/chocolates',
    buttonText: "I'm buying !",
  },
];

const CATEGORIES = [
  {
    tag: 'Wedding',
    title: "Celebrate Her Forever with a Gift She'll Always Remember",
    image: categoryWedding,
    link: '/category/wedding',
  },
  {
    tag: 'Engagement',
    title: 'Honor the Beginning of a Beautiful Journey Together',
    image: categoryEngagement,
    link: '/category/engagement',
  },
  {
    tag: 'Anniversary',
    title: 'Mark Every Year of Love with a Meaningful Surprise',
    image: categoryAnn,
    link: '/category/anniversary',
  },
];

const FEATURES = [
  {
    icon: Truck,
    title: 'Free Delivery',
    desc: 'For orders above 120 EGP',
  },
  {
    icon: RotateCcw,
    title: 'Get Refund',
    desc: 'Refunds within 30 days',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Payment',
    desc: '100% Secure Payment',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Contact us at any time',
  },
];

export default function HomepageHero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // 1. Track if client-side React is ready
  const [mounted, setMounted] = useState(false);


  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  const handleDotClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  // Show the skeleton first while mounting to prevent layout shifting
  if (!mounted) {
    return <HeroSkeleton />;
  }

  return (
    <div className="bg-background text-foreground mx-auto w-full max-w-7xl space-y-6 px-4 py-8 transition-colors duration-300 select-none">
      {/* ================= UPPER SECTION: ALIGNED GRID ================= */}
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Left Vertical Banner */}
        <div className="group relative flex h-full w-full flex-col justify-end gap-3 overflow-hidden rounded-2xl p-8 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${giftBoxes.src})` }}
          />
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-20">
            <span className="bg-maroon-50 text-maroon-600 mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md">
              Starting from 10.99 EGP
            </span>
            <h2 className="font-primary text-2xl leading-tight font-semibold tracking-tight">
              Special Gifts For The People You Love
            </h2>
          </div>
          <div className="relative z-20">
            <Link href="/shop">
              <Button className="bg-maroon-50 text-maroon-700 hover:bg-maroon-100 flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-medium transition-all">
                Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Carousel*/}
        <div className="relative h-96 w-full overflow-hidden rounded-2xl lg:col-span-3">
          <div className="h-full w-full">
            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              className="h-full w-full"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4 h-96">
                {HERO_SLIDES.map((slide, idx) => (
                  /* 4. Added pl-4 to correct the offset and align items perfectly */
                  <CarouselItem key={slide.id} className="relative h-full w-full rounded-2xl pl-4">
                    <div className="relative flex h-full w-full items-end p-6">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        placeholder="blur"
                        priority={idx === 0}
                        className="z-0 rounded-2xl object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 75vw"
                      />
                      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                      {/* Text Content */}
                      <div className="relative z-20 max-w-lg space-y-4 text-white">
                        <h1 className="translate-y-0 text-4xl font-semibold tracking-wide opacity-100 transition-all delay-100 duration-700 md:text-5xl">
                          {slide.title}
                        </h1>
                        <p className="translate-y-0 text-lg font-light text-white/80 opacity-100 transition-all delay-200 duration-700">
                          {slide.description}
                        </p>
                        <div className="translate-y-0 pt-2 opacity-100 transition-all delay-300 duration-700">
                          <Link href={slide.link}>
                            <Button className="bg-maroon-50 text-maroon-700 hover:bg-maroon-100 rounded-xl px-4 py-2.5 font-medium transition-colors">
                              {slide.buttonText}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Manual Slider Navigation */}
              <div className="rounded-ds-xl bg-maroon-50 absolute right-6 bottom-6 z-30 flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-maroon-50 text-maroon-700 hover:bg-maroon-500 hover:text-maroon-400 h-7.5 w-7.5 backdrop-blur-md transition-all"
                  onClick={() => api?.scrollPrev()}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-maroon-50 text-maroon-700 hover:bg-maroon-500 hover:text-maroon-700 h-7.5 w-7.5 border-white/20 backdrop-blur-md transition-all"
                  onClick={() => api?.scrollNext()}
                >
                  <ChevronRight />
                </Button>
              </div>

              {/* Custom Header Dots */}
              <div className="absolute top-6 right-8 z-30 flex gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`rounded-ds-lg h-2 transition-all duration-300 ${
                      current === i ? 'bg-maroon-700 w-9' : 'bg-maroon-50 hover:bg-maroon-100 w-2'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* ================= MIDDLE SECTION: CATEGORY TRIO ================= */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CATEGORIES.map((cat, index) => (
          /* 1. Fixed height syntax to h-[240px] */
          <Link key={index} href={cat.link} className="group relative block h-72 w-full overflow-hidden rounded-2xl">
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              placeholder="blur"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <span className="text-maroon-600 bg-maroon-50 rounded-ds-lg mb-2 inline-block w-fit px-2 py-0.5 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                {cat.tag}
              </span>
              <h3 className="group-hover:text-maroon-500 text-2xl leading-snug font-semibold transition-all">
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= LOWER SECTION: FEATURES BAR ================= */}
      <div className="bg-maroon-50 dark:bg-zinc-700 grid w-full grid-cols-2 items-center gap-6 rounded-2xl p-10 md:grid-cols-4 md:gap-4 md:px-12 md:py-8">
        {FEATURES.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div key={index} className="group flex items-center gap-4">
              <div className="bg-maroon-600 rounded-full p-3 text-white dark:text-zinc-800 transition-transform duration-300 group-hover:scale-110 dark:bg-soft-pink-200">
                <Icon className="h-10 w-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-maroon-600 dark:text-soft-pink-200 text-foreground text-xl font-semibold md:text-base">{feat.title}</span>
                <span className="text-muted-foreground text-sm text-zinc-500 dark:text-zinc-300">{feat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
