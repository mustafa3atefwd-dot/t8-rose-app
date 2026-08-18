'use client';

import { Button } from '@/shared/components/ui/button';
import { CircleAlert, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

type CartErrorProps = {
  onRetry: () => void;
};

export default function CartError({ onRetry }: CartErrorProps) {
  // translations
  const t = useTranslations('cart');
  return (
    <div className="flex flex-col items-center justify-center p-4 py-10 text-center">
      {/* Error Icon */}
      <CircleAlert className="text-destructive size-20" />

      {/* Title */}
      <h2 className="text-ds-text-primary mt-4 text-xl font-semibold">{t('error')}</h2>

      {/* Description */}
      <p className="text-ds-text-muted mt-2 text-sm">{t('errorDescription')}</p>

      {/* Retry Button */}
      <Button onClick={onRetry} className="mt-5 flex items-center gap-2">
        <RefreshCw className="size-4" />
        {t('retry')}
      </Button>
    </div>
  );
}
