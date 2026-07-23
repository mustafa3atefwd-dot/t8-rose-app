import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import RoseLogo from '@/assets/images/rose-logo.png';
import { Link } from '@/i18n/navigation';
import { FOOTER_LINKS } from './footer.constants';
import { NewsletterForm } from './NewsletterForm';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="bg-ds-bg-inverse text-ds-text-inverse dark:bg-ds-bg-muted dark:text-ds-text-plain w-full px-6 py-10 sm:px-8 xl:px-0">
      <div className="mx-auto grid min-h-[291px] w-full max-w-[1280px] items-start justify-items-center gap-12 lg:grid-cols-[250px_auto_376px] lg:justify-between lg:justify-items-start lg:gap-4">
        <section className="flex h-[291px] w-[250px] flex-col items-center gap-1.5" aria-label={t('appName')}>
          <Image
            src={RoseLogo}
            alt={t('logoAlt')}
            width={240}
            height={225}
            priority={false}
            className="h-[225px] w-[240px] object-contain"
          />
          <p className="text-ds-text-secondary dark:text-ds-text-primary flex h-10 items-end text-center text-lg leading-none font-semibold">
            {t('appName')}
          </p>
          <p className="text-ds-text-inverse dark:text-ds-text-plain flex h-3.5 items-center gap-1 text-center text-sm leading-none">
            <bdi>{t('tagline')}</bdi>
            <span aria-hidden>|</span>
            <bdi>{t('year')}</bdi>
          </p>
        </section>

        <nav className="w-full max-w-[250px] lg:w-auto" aria-labelledby="footer-navigation-title">
          <h2
            id="footer-navigation-title"
            className="text-ds-text-secondary dark:text-ds-text-primary mb-2 text-lg leading-none font-semibold"
          >
            {t('navigationTitle')}
          </h2>
          <ul className="space-y-1">
            {FOOTER_LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-ds-text-inverse hover:text-ds-text-secondary focus-visible:text-ds-text-secondary dark:text-ds-text-plain dark:hover:text-ds-text-primary dark:focus-visible:text-ds-text-primary text-base leading-none transition-colors focus-visible:outline-none"
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="w-full max-w-[376px]" aria-labelledby="footer-newsletter-title">
          <h2
            id="footer-newsletter-title"
            className="text-ds-text-secondary dark:text-ds-text-primary text-xl leading-none font-semibold"
          >
            {t('discountTitle')}
          </h2>
          <p className="text-ds-text-muted mt-1 text-sm leading-none">{t('discountSubtitle')}</p>
          <NewsletterForm />
        </section>
      </div>
    </footer>
  );
}
