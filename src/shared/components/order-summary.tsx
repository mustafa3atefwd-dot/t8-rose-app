'use client';

import { MoveRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/shared/hooks/use-cart';
import { getDiscountedPrice } from '@/features/products/lib/utils';
import CouponField from './coupon-field';

interface IOrderSummaryProps {
  readOnly?: boolean;
}

export default function OrderSummary({ readOnly = false }: IOrderSummaryProps) {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { cartItems } = useCart();

  // Totals are derived on every render rather than stored, so they can never
  // drift from the cart the rest of the app is reading.
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  const discount = cartItems.reduce((sum, item) => {
    const discountedPrice = getDiscountedPrice(item.product);
    if (discountedPrice === null) return sum;

    return sum + (Number(item.product.price) - discountedPrice) * item.quantity;
  }, 0);

  const total = subtotal - discount;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-ds-text-primary text-3xl font-semibold">{t('summary')}</h3>

      {!readOnly && <CouponField />}

      <div className="flex flex-col gap-4 p-2.5">
        {!readOnly && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-zinc-800">{t('subtotal')}</p>
              <p className="text-lg font-semibold text-zinc-800">{formatPrice(subtotal)}</p>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-zinc-800">{t('discount')}</p>
                <p className="text-lg font-semibold text-zinc-800">-{formatPrice(discount)}</p>
              </div>
            )}
          </>
        )}

        <span className="border-ds-border-soft flex border-t" />

        <div className="flex items-center justify-between">
          <p className="text-maroon-600 text-2xl font-bold">{t('total')}</p>
          <p className="text-maroon-600 text-2xl font-bold">{formatPrice(total)}</p>
        </div>
      </div>

      {!readOnly && (
        <Link
          href="/"
          className="rounded-ds-xl bg-maroon-600 flex h-17.5 w-full items-center justify-center gap-2.5 px-4 py-2.5 text-white"
        >
          <span>{t('checkout')}</span>
          <MoveRight className="h-6 w-6 rtl:rotate-180" />
        </Link>
      )}
    </div>
  );
}
