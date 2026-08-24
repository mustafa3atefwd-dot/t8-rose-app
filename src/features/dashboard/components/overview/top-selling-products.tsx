import { useTranslations } from 'next-intl';

import type { ITopSellingProduct } from '@/features/dashboard/lib/types/statistics';
import { formatDashboardCurrency, formatStatistic } from '@/features/dashboard/lib/utils/format-statistic.util';
import { cn } from '@/shared/lib/utils';

interface TopSellingProductsProps {
  products: ITopSellingProduct[];
  currency: string;
  locale: string;
}

const rowTones = ['bg-ds-bg-warning-fade', 'bg-ds-bg-muted', 'bg-ds-bg-secondary-fade'];

export function TopSellingProducts({ products, currency, locale }: TopSellingProductsProps) {
  const t = useTranslations('dashboard.overview.topSelling');

  return (
    <section className="bg-ds-bg-plain min-h-0 rounded-2xl p-4 sm:p-6" aria-labelledby="top-selling-title">
      <h2 id="top-selling-title" className="text-ds-text-plain text-xl font-semibold sm:text-2xl">
        {t('title')}
      </h2>

      {products.length === 0 ? (
        <p className="text-ds-text-soft flex min-h-48 items-center justify-center text-center">{t('empty')}</p>
      ) : (
        <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto pe-1">
          {products.map((product, index) => (
            <li
              key={product.productId}
              className={cn(
                'flex min-w-0 items-center justify-between gap-3 rounded-md px-3 py-2',
                rowTones[index % rowTones.length]
              )}
            >
              <p className="min-w-0 truncate">
                <span className="text-ds-text-plain text-sm font-medium sm:text-base">{product.title}</span>{' '}
                <span className="text-ds-text-soft text-xs">
                  ({formatDashboardCurrency(product.unitPrice, currency, locale)})
                </span>
              </p>
              <strong className="text-ds-text-plain shrink-0 text-xs sm:text-sm">
                {t('sales', { count: formatStatistic(product.totalSales, locale) })}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
