'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/shared/components/ui/button';

export function OverviewErrorState() {
  const t = useTranslations('dashboard.overview.error');
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  return (
    <section className="bg-ds-bg-plain flex min-h-80 flex-col items-center justify-center rounded-2xl p-6 text-center">
      <div
        className="bg-ds-bg-danger-fade text-ds-text-danger mb-5 grid size-16 place-items-center rounded-full"
        aria-hidden="true"
      >
        <AlertCircle className="size-7" />
      </div>
      <h2 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">{t('title')}</h2>
      <p className="text-ds-text-soft mt-2 max-w-md text-sm sm:text-base">{t('description')}</p>
      <Button
        type="button"
        className="mt-6"
        loading={isRefreshing}
        loadingText={t('retrying')}
        onClick={() => startTransition(() => router.refresh())}
      >
        <RefreshCw className="size-4" />
        {t('retry')}
      </Button>
    </section>
  );
}
