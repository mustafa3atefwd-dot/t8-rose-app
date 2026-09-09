'use client';

import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { SectionLabel, SectionTitle } from '@/shared/components';
import { TestimonialItem } from '@/features/home/components';
import { testimonials } from '@/features/home/lib/constants';
import { useTranslations } from 'next-intl';
import { useCarouselAutoplayControl } from '@/shared/hooks';

function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

  // Lazy state initializer keeps a single plugin instance without reading a ref
  // during render.
  const [plugin] = useState(() =>
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useCarouselAutoplayControl(plugin);

  return (
    <section className="py-8 sm:py-12 md:py-14 lg:py-17.5">
      {/* ===== Section Header - Label & Title ===== */}
      <div className="container mx-auto mb-12 px-4 text-center md:mb-16">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>{t('title')}</SectionTitle>
      </div>

      {/* ===== Testimonials ===== */}
      <div className="bg-maroon-50 py-8 sm:py-12 md:py-16 lg:py-24 dark:bg-zinc-700">
        <div className="container">
          <Carousel
            dir="ltr"
            plugins={[plugin]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <TestimonialItem testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
