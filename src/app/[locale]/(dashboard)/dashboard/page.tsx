import { Suspense } from 'react';

import { redirect } from '@/i18n/navigation';
import { DashboardOverview } from '@/features/dashboard/components/overview/dashboard-overview';
import { DashboardOverviewSkeleton } from '@/features/dashboard/components/overview/dashboard-overview-skeleton';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const accessToken = await getNextAuthToken();

  if (!accessToken) return redirect({ href: '/login', locale });

  return (
    <Suspense fallback={<DashboardOverviewSkeleton />}>
      <DashboardOverview accessToken={accessToken} locale={locale} />
    </Suspense>
  );
}
