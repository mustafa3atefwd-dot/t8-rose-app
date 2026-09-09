'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('statusPages.dashboard.error');

  return (
    <section
      aria-labelledby="error-title"
      className="flex min-h-full flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-6 lg:px-10"
    >
      {/* Illustration */}
      <div className="mb-8 flex items-center justify-center sm:mb-9">
        <Image
          src="/images/error.svg"
          alt=""
          width={360}
          height={360}
          priority
          fetchPriority="high"
          className="h-50 w-50 sm:h-60 sm:w-60 md:h-75 md:w-75 lg:h-90 lg:w-90"
        />
      </div>

      {/* Content */}
      <div className="flex w-full max-w-180 flex-col items-center">
        {/* Title */}
        <h1 id="error-title" className="text-ds-text-plain font-inter text-2xl font-semibold sm:text-3xl md:text-4xl">
          {t('title')}
        </h1>

        {/* Description */}
        <p className="text-ds-text-muted font-inter mt-2 max-w-180 text-sm leading-7 sm:text-base md:text-lg">
          {t('description')}
        </p>

        {/* Divider */}
        <div className="bg-ds-bg-soft mt-4 h-px w-full max-w-110" />

        {/* Retry */}
        <Button type="button" onClick={reset} className="font-mulish mt-6 h-10 rounded-lg px-8.5 py-5 text-sm">
          {t('retry')}
        </Button>
      </div>
    </section>
  );
}
