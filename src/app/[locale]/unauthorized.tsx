import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Unauthorized() {
  // Translations
  const t = useTranslations('statusPages.dashboard.unauthorized');

  return (
    <main className="bg-ds-bg-plain flex min-h-dvh items-center justify-center px-5 py-10 sm:px-6">
      <section aria-labelledby="unauthorized-title" className="flex w-full max-w-4xl flex-col items-center text-center">
        {/* Illustration */}
        <div className="mb-8 flex items-center justify-center sm:mb-9">
          <Image
            src="/images/unauthorized.svg"
            alt=""
            width={360}
            height={360}
            priority
            fetchPriority="high"
            className="h-50 w-50 sm:h-60 sm:w-60 md:h-75 md:w-75 lg:h-90 lg:w-90"
          />
        </div>

        {/* Content */}
        <div className="flex w-full flex-col items-center">
          {/* Title */}
          <h1
            id="unauthorized-title"
            className="text-ds-text-plain font-inter text-2xl font-semibold sm:text-3xl md:text-4xl"
          >
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-ds-text-muted font-inter mt-2 max-w-125 text-sm leading-7 sm:text-base md:text-lg">
            {t('description')}
          </p>

          {/* Divider */}
          <div className="bg-ds-bg-soft mt-4 h-px w-full max-w-110" />

          {/* Home button */}
          <Button
            asChild
            variant="outline"
            className="text-ds-text-plain font-mulish mt-6 h-10 rounded-lg px-8.5 py-5 text-sm shadow-none"
          >
            <Link href="/">{t('goHome')}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
