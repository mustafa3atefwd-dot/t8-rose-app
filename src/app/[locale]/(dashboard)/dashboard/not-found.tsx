import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('statusPages.dashboard.notFound');

  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-full flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-6 lg:px-10"
    >
      {/* Illustration */}
      <div className="flex w-full items-center justify-center">
        <Image
          src="/images/not-found.svg"
          alt=""
          width={710}
          height={315}
          priority
          fetchPriority="high"
          className="h-auto w-87.5 max-w-full xl:w-177.5"
        />
      </div>

      {/* Title */}
      <h1
        id="not-found-title"
        className="text-ds-text-plain font-inter mt-14 text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl"
      >
        {t('title')}
      </h1>

      {/* Description */}
      <p className="text-ds-text-muted font-inter mt-3 text-sm leading-7 sm:text-base md:text-lg">{t('description')}</p>
    </section>
  );
}
