import { useTranslations } from 'next-intl';

import type { ILowStockProduct } from '@/features/dashboard/lib/types/statistics';
import { formatStatistic } from '@/features/dashboard/lib/utils/format-statistic.util';
import { cn } from '@/shared/lib/utils';

// Component props
interface LowStockProductsProps {
  products: ILowStockProduct[];
  locale: string;
}

// Stock at or below this value uses the danger colour
const DANGER_STOCK_LIMIT = 5;

export function LowStockProducts({ products, locale }: LowStockProductsProps) {
  // Translations
  const t = useTranslations('dashboard.overview.lowStock');

  return (
    <section className="bg-ds-bg-plain min-h-0 rounded-2xl p-4 sm:p-6" aria-labelledby="low-stock-title">
      {/* ===== Section Header ===== */}
      <h2 id="low-stock-title" className="text-ds-text-plain text-xl font-semibold sm:text-2xl">
        {t('title')}
      </h2>

      {/* ===== Low-stock List ===== */}
      {products.length === 0 ? (
        <p className="text-ds-text-soft flex min-h-48 items-center justify-center text-center">{t('empty')}</p>
      ) : (
        <ul className="mt-3 max-h-80 overflow-y-auto pe-1">
          {products.map((product) => (
            <li
              key={product.id}
              className="border-ds-border-muted flex min-w-0 items-center justify-between gap-3 border-b py-3 last:border-b-0"
            >
              <span className="text-ds-text-plain truncate text-sm sm:text-base">{product.title}</span>
              <span
                className={cn(
                  'shrink-0 text-xs font-medium sm:text-sm',
                  product.stock <= DANGER_STOCK_LIMIT ? 'text-ds-text-danger' : 'text-ds-text-plain'
                )}
              >
                {t('inStock', { count: formatStatistic(product.stock, locale) })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
