'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useCart } from '@/shared/hooks/use-cart';

export default function OrderSummary() {
  const t = useTranslations('checkoutPage.orderSummary');
  const locale = useLocale();
  const { cartItems, isLoading } = useCart();

  const formatPrice = (value: number | string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value));

  const total = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  return (
    <aside className="border-ds-border-soft flex h-fit flex-col gap-4 rounded-lg border p-5">
      <h2 className="text-lg font-semibold">{t('title')}</h2>

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {!isLoading && cartItems.length === 0 && <p className="text-ds-text-muted text-sm">{t('empty')}</p>}

      {!isLoading && cartItems.length > 0 && (
        <ul className="flex flex-col gap-3">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex flex-col">
                <span className="font-medium">{item.product.title}</span>
                <span className="text-ds-text-muted">{t('quantity', { count: item.quantity })}</span>
              </div>
              <span className="font-medium">{formatPrice(Number(item.product.price) * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-ds-border-soft flex items-center justify-between border-t pt-4 font-semibold">
        <span>{t('total')}</span>
        <span>{formatPrice(total)}</span>
      </div>

      <Button type="button" disabled className="w-full">
        {t('placeOrder')}
      </Button>
      <p className="text-ds-text-muted text-center text-xs">{t('comingSoon')}</p>
    </aside>
  );
}
