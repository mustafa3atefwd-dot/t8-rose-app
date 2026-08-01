import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LoginForm } from '@/features/auth/components/login-form';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const t = await getTranslations('auth.loginForm');
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <LoginForm />

      {/* Footer */}
      <footer className="mx-auto w-fit text-sm font-medium text-zinc-800 dark:text-zinc-50">
        {t('noAccount')}{' '}
        <Link
          href="/register"
          className="text-maroon-700 hover:text-maroon-700/90 dark:text-soft-pink-300 dark:hover:text-soft-pink-300/90 text-base font-medium"
        >
          {t('createNow')}
        </Link>
      </footer>
    </>
  );
}
