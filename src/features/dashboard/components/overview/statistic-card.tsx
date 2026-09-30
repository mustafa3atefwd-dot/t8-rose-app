import type { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

// Component props
interface StatisticCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: 'danger' | 'info' | 'secondary' | 'success';
}

// Semantic colour classes for each statistic type
const toneClasses: Record<StatisticCardProps['tone'], string> = {
  danger: 'bg-ds-bg-danger-fade text-ds-text-danger',
  info: 'bg-ds-bg-info-fade text-ds-text-info',
  secondary: 'bg-ds-bg-secondary-fade text-ds-text-secondary',
  success: 'bg-ds-bg-success-fade text-ds-text-success',
};

export function StatisticCard({ icon: Icon, label, value, tone }: StatisticCardProps) {
  return (
    <article
      className={cn('flex min-h-32 flex-col justify-between rounded-2xl p-4 sm:min-h-36 sm:p-5', toneClasses[tone])}
    >
      {/* ===== Statistic Icon ===== */}
      <Icon className="size-7 sm:size-8" aria-hidden="true" />

      {/* ===== Statistic Value And Label ===== */}
      <div className="mt-5 min-w-0">
        <strong className="block truncate text-2xl font-semibold sm:text-3xl">{value}</strong>
        <p className="text-ds-text-plain mt-1 text-sm font-medium sm:text-base">{label}</p>
      </div>
    </article>
  );
}
