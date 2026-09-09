'use client';

import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

export function WishlistErrorState({ retry }: { retry: () => void }) {
  const t = useTranslations('wishlist');

  return (
    <main className="bg-ds-bg-default py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-ds-border-soft bg-ds-bg-plain flex min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border p-8 text-center">
          <CircleAlert className="text-ds-text-danger size-12" aria-hidden="true" />
          <h1 className="text-ds-text-plain text-xl font-semibold">{t('error')}</h1>
          <Button type="button" onClick={retry}>
            {t('retry')}
          </Button>
        </div>
      </div>
    </main>
  );
}
