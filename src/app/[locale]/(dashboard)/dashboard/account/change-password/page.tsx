import { getTranslations } from 'next-intl/server';

import { DashboardChangePasswordForm } from '@/features/dashboard/components/account/dashboard-change-password-form';
import { redirect } from '@/i18n/navigation';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';

interface DashboardPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPasswordPage({ params }: DashboardPasswordPageProps) {
  const { locale } = await params;
  const [accessToken, t] = await Promise.all([getNextAuthToken(), getTranslations('account.password')]);

  if (!accessToken) redirect({ href: '/login', locale });

  return (
    <section className="space-y-5 pb-6" aria-labelledby="dashboard-change-password-title">
      <h1 id="dashboard-change-password-title" className="text-ds-text-plain text-2xl font-semibold sm:text-3xl">
        {t('title')}
      </h1>
      <DashboardChangePasswordForm />
    </section>
  );
}
