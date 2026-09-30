import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import RoseLogo from '@/assets/images/rose-logo.png';
import { Link } from '@/i18n/navigation';
import { FOOTER_LINKS } from '../lib/constants/footer.constants';
import { NewsletterForm } from './newsletter-form';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="bg-ds-bg-inverse text-ds-text-inverse dark:bg-ds-bg-muted dark:text-ds-text-plain w-full px-6 py-10 sm:px-8 xl:px-0">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 lg:grid-cols-3 lg:gap-8">
        <section className="flex flex-col items-center gap-1.5 lg:justify-self-start" aria-label={t('appName')}>
          <Link href={'/'}>
            <Image
            src={RoseLogo}
            alt={t('logoAlt')}
            width={240}
            height={225}
            priority={false}
            className="h-auto w-full max-w-60 object-contain"
          />
          </Link>
          <p className="text-ds-text-secondary dark:text-ds-text-primary text-center text-lg leading-tight font-semibold">
            {t('appName')}
          </p>
          <p className="text-ds-text-inverse dark:text-ds-text-plain flex flex-wrap items-center justify-center gap-1 text-center text-sm leading-normal">
            <bdi>{t('tagline')}</bdi>
            <span aria-hidden>|</span>
            <bdi>{new Date().getFullYear()}</bdi>
          </p>
        </section>

        <nav className="w-full max-w-sm justify-self-center lg:w-auto" aria-labelledby="footer-navigation-title">
          <h2
            id="footer-navigation-title"
            className="text-ds-text-secondary dark:text-ds-text-primary mb-2 text-lg leading-tight font-semibold"
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

        <section
          className="w-full max-w-md justify-self-center lg:justify-self-end"
          aria-labelledby="footer-newsletter-title"
        >
          <h2
            id="footer-newsletter-title"
            className="text-ds-text-secondary dark:text-ds-text-primary text-xl leading-tight font-semibold"
          >
            {t('discountTitle')}
          </h2>
          <p className="text-ds-text-muted mt-1 text-sm leading-normal">{t('discountSubtitle')}</p>
          <NewsletterForm />
        </section>
      </div>
    </footer>
  );
}
