import { getTranslations } from 'next-intl/server';

import { CategoriesSummary } from '@/features/dashboard/components/overview/categories-summary';
import { LowStockProducts } from '@/features/dashboard/components/overview/low-stock-products';
import { OverviewErrorState } from '@/features/dashboard/components/overview/overview-error-state';
import { SummaryCards } from '@/features/dashboard/components/overview/summary-cards';
import { TopSellingProducts } from '@/features/dashboard/components/overview/top-selling-products';
import { getDashboardStatistics } from '@/features/dashboard/lib/apis/get-dashboard-statistics.api';
import type { IDashboardStatistics } from '@/features/dashboard/lib/types/statistics';

// Component props
interface DashboardOverviewProps {
  accessToken: string;
  locale: string;
}

export async function DashboardOverview({ accessToken, locale }: DashboardOverviewProps) {
  // Translations
  const t = await getTranslations('dashboard.overview');

  // Dashboard statistics
  let statistics: IDashboardStatistics;

  try {
    statistics = await getDashboardStatistics(accessToken);
  } catch {
    return <OverviewErrorState />;
  }

  return (
    <section className="space-y-6 pb-6" aria-labelledby="dashboard-overview-title">
      {/* ===== Accessible Page Title ===== */}
      <h1 id="dashboard-overview-title" className="sr-only">
        {t('title')}
      </h1>

      {/* ===== Summary And Categories ===== */}
      <div className="grid gap-6 xl:grid-cols-[minmax(20rem,0.85fr)_minmax(24rem,1fr)]">
        <SummaryCards locale={locale} summary={statistics.summary} />
        <CategoriesSummary locale={locale} categories={statistics.categories} />
      </div>

      {/* ===== Product Lists ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopSellingProducts
          products={statistics.topSellingProducts}
          currency={statistics.summary.currency}
          locale={locale}
        />
        <LowStockProducts products={statistics.lowStockProducts} locale={locale} />
      </div>
    </section>
  );
}
