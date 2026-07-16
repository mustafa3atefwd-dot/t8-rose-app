import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import RoseLogo from '@/assets/images/rose-logo.png';
import { Link } from '@/i18n/navigation';
import { FOOTER_LINKS } from './footer.constants';
import { NewsletterForm } from './NewsletterForm';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="w-full bg-[#27272A] px-6 py-10 text-white sm:px-8 xl:px-0 dark:bg-[#18181B]">
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
          <p className="flex h-10 items-end text-center text-lg leading-none font-semibold text-[#F78DA7]">
            {t('appName')}
          </p>
          <p className="h-3.5 text-center text-sm leading-none text-white">
            {t('tagline')} | {t('year')}
          </p>
        </section>

        <nav className="w-full max-w-[250px] lg:w-auto" aria-labelledby="footer-navigation-title">
          <h2 id="footer-navigation-title" className="mb-2 text-lg leading-none font-semibold text-[#F78DA7]">
            {t('navigationTitle')}
          </h2>
          <ul className="space-y-1">
            {FOOTER_LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-base leading-none text-white transition-colors hover:text-[#F78DA7] focus-visible:text-[#F78DA7] focus-visible:outline-none"
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="w-full max-w-[376px]" aria-labelledby="footer-newsletter-title">
          <h2 id="footer-newsletter-title" className="text-xl leading-none font-semibold text-[#F78DA7]">
            {t('discountTitle')}
          </h2>
          <p className="mt-1 text-sm leading-none text-[#8B8B93]">{t('discountSubtitle')}</p>
          <NewsletterForm />
        </section>
      </div>
    </footer>
  );
}
