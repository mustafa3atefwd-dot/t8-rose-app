import { CircleDollarSign, ClipboardList, Package, ReceiptText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { IDashboardSummary } from '@/features/dashboard/lib/types/statistics';
import { formatDashboardCurrency, formatStatistic } from '@/features/dashboard/lib/utils/format-statistic.util';
import { StatisticCard } from '@/features/dashboard/components/overview/statistic-card';

interface SummaryCardsProps {
  locale: string;
  summary: IDashboardSummary;
}

export function SummaryCards({ locale, summary }: SummaryCardsProps) {
  const t = useTranslations('dashboard.overview.summary');

  const cards = [
    {
      key: 'products',
      icon: Package,
      label: t('products'),
      value: formatStatistic(summary.totalProducts, locale),
      tone: 'danger' as const,
    },
    {
      key: 'orders',
      icon: ReceiptText,
      label: t('orders'),
      value: formatStatistic(summary.totalOrders, locale),
      tone: 'info' as const,
    },
    {
      key: 'categories',
      icon: ClipboardList,
      label: t('categories'),
      value: formatStatistic(summary.totalCategories, locale),
      tone: 'secondary' as const,
    },
    {
      key: 'revenue',
      icon: CircleDollarSign,
      label: t('revenue'),
      value: formatDashboardCurrency(summary.totalRevenue, summary.currency, locale),
      tone: 'success' as const,
    },
  ];

  return (
    <section aria-label={t('label')} className="bg-ds-bg-plain rounded-2xl p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2">
        {cards.map(({ key, ...card }) => (
          <StatisticCard key={key} {...card} />
        ))}
      </div>
    </section>
  );
}
