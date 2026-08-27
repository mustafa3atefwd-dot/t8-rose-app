import { ImageWithSkeleton, Rating } from '@/shared/components';
import { ITestimonial } from '@/features/home/lib/types';
import { useLocale, useTranslations } from 'next-intl';

interface ITestimonialItemProps {
  testimonial: ITestimonial;
}

function TestimonialItem({ testimonial }: ITestimonialItemProps) {
  const t = useTranslations('home.testimonials');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <article className="relative mt-14 flex flex-col rounded-3xl bg-white px-6 pt-12 pb-8 shadow-lg md:pt-16">
      <figure className="flex flex-1 flex-col" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* ===== Avatar ===== */}
        <div className="absolute top-0 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <ImageWithSkeleton
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
            className="object-cover"
          />
        </div>

        {/* ===== Author ===== */}
        <figcaption>
          <h3 className="mb-3 text-center text-lg font-semibold text-zinc-800 md:mb-8">{testimonial.name}</h3>
        </figcaption>

        <Rating rating={testimonial.rating} />

        {/* ===== Review ===== */}
        <blockquote className="mt-2.5 mb-4 max-h-24 min-h-24 flex-1 scrollbar-none overflow-y-auto text-center text-sm leading-7 text-zinc-600 md:text-start md:text-base">
          <p>{t(`items.${testimonial.reviewKey}`)}</p>{' '}
        </blockquote>

        {/* ===== Date ===== */}
        <time className="text-center text-xs text-zinc-400">{t(`dates.${testimonial.dateKey}`)}</time>
      </figure>
    </article>
  );
}

export default TestimonialItem;
