import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { aboutFeatures } from '@/features/home/lib/constants';
import { ImageWithSkeleton, SectionLabel } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { Link } from '@/i18n/navigation';

function AboutSection() {
  const t = useTranslations('home.about');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="py-8 sm:py-12 md:py-14 lg:py-17.5">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20" dir={'ltr'}>
          {/* ===== Images ===== */}
          <div className="flex justify-center">
            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-3 lg:gap-5">
              {/* Primary Image */}
              <div className="before:border-ds-bg-primary relative h-70 w-57.5 before:absolute before:-inset-4 before:-top-3 before:z-0 before:h-full before:w-full before:rotate-3 before:rounded-tl-[50px] before:rounded-tr-[120px] before:rounded-br-[120px] before:rounded-bl-[120px] before:border-4 before:content-[''] sm:h-86 sm:w-75.5">
                <div className="relative z-10 h-full w-full overflow-hidden rounded-tl-[50px] rounded-tr-[120px] rounded-br-[120px] rounded-bl-[120px]">
                  <ImageWithSkeleton
                    src="/images/about/about-1.jpg"
                    alt={t('images.mainAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Secondary Images */}
              <div className="flex gap-3 sm:flex-col">
                {/* Top Image */}
                <div className="relative h-27.5 w-27.5 overflow-hidden rounded-full sm:h-37.5 sm:w-37.5 lg:h-48.25 lg:w-48.25">
                  <ImageWithSkeleton
                    src="/images/about/about-2.jpg"
                    alt={t('images.secondAlt')}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom Image */}
                <div className="relative h-25 w-25 overflow-hidden rounded-tl-[40px] rounded-tr-[80px] rounded-br-[80px] rounded-bl-[40px] sm:h-30 sm:w-37.5 lg:h-36 lg:w-48.25">
                  <ImageWithSkeleton
                    src="/images/about/about-3.jpg"
                    alt={t('images.thirdAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== Content ===== */}
          <div className="flex max-w-xl flex-col items-start" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Section Label */}
            <SectionLabel>{t('label')}</SectionLabel>

            {/* Section Title */}
            <h2 className="text-ds-text-primary mt-4 mb-3 text-xl font-bold sm:text-2xl lg:text-3xl">
              {t.rich('title', {
                highlight1: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
                highlight2: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
              })}
            </h2>

            {/* Description */}
            <p className="text-ds-text-soft text-sm leading-7 sm:text-base">{t('description')}</p>

            {/* Discover Products Button */}
            <Link href={'/products'}>
              <Button className="my-6 flex items-center gap-2">
                {t('discover')}
                <ArrowRight size={16} />
              </Button>
            </Link>

            {/* Features */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {aboutFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.key} className="flex items-center gap-2">
                    <Icon className="text-ds-text-primary shrink-0" size={16} />
                    <span className="text-ds-text-plain text-sm">{t(`features.${feature.key}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
