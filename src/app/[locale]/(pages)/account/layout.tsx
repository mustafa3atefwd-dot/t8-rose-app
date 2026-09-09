import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { AccountSidebar } from '@/features/account/layouts/account-sidebar';

interface AccountLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AccountLayout({ children, params }: AccountLayoutProps) {
  const { locale } = await params;

  const token = await getNextAuthToken();
  if (!token) redirect({ href: '/login', locale });

  const t = await getTranslations('account');

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <h1 className="text-ds-text-plain text-3xl font-bold capitalize sm:text-4xl lg:text-5xl">
        {t('layout.title')}
      </h1>
      <div className="flex min-w-0 flex-col items-stretch gap-6 lg:flex-row ">
        <AccountSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
