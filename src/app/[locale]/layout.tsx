import type { Metadata } from 'next';
import { Great_Vibes, Nunito_Sans, Sarabun, Tajawal } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getLocaleConfig, type Locale } from '@/shared/i18n/config';
import Providers from '@/shared/context/global/providers';

const sarabun = Sarabun({
  variable: '--font-sarabun',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
});

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

// Decorative script for Latin auth headings. Great Vibes is a self-hosted,
// OFL-licensed stand-in for the proprietary "Edwardian Script ITC" — it has no
// Arabic glyphs, so it is only applied to Latin locales (see AuthHeading).
const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('app-title') || 'Rose App',
    description: 'Color tokens, typography, and light/dark mode for Rose App.',
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const { direction } = getLocaleConfig(locale as Locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${sarabun.variable} ${tajawal.variable} ${nunitoSans.variable} ${greatVibes.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
