import { useTranslations } from 'next-intl';

import type { IDashboardCategory } from '@/features/dashboard/lib/types/statistics';
import { formatStatistic } from '@/features/dashboard/lib/utils/format-statistic.util';

// Component props
interface CategoriesSummaryProps {
  categories: IDashboardCategory[];
  locale: string;
}

export function CategoriesSummary({ categories, locale }: CategoriesSummaryProps) {
  // Translations
  const t = useTranslations('dashboard.overview.categories');

  return (
    <section className="bg-ds-bg-plain min-h-0 rounded-2xl p-4 sm:p-6" aria-labelledby="dashboard-categories-title">
      {/* ===== Section Header ===== */}
      <h2 id="dashboard-categories-title" className="text-ds-text-plain text-xl font-semibold sm:text-2xl">
        {t('title')}
      </h2>

      {/* ===== Categories List ===== */}
      {categories.length === 0 ? (
        <p className="text-ds-text-soft flex min-h-48 items-center justify-center text-center">{t('empty')}</p>
      ) : (
        <ul className="mt-3 max-h-64 overflow-y-auto pe-1 sm:max-h-69">
          {categories.map((category) => (
            <li
              key={category.id}
              className="border-ds-border-muted flex min-w-0 items-center justify-between gap-3 border-b py-3 last:border-b-0"
            >
              <span className="text-ds-text-plain truncate text-sm sm:text-base">{category.title}</span>
              <span className="bg-ds-bg-muted text-ds-text-plain shrink-0 rounded-md px-2 py-1 text-xs sm:text-sm">
                {t('productCount', { count: formatStatistic(category.productCount, locale) })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
