'use client';
import { useCart } from '@/shared/hooks/use-cart';
import { useTranslations } from 'next-intl';
export default function ItemQuantity() {
  const t = useTranslations('cart');
  const { cartItems } = useCart();
  return (
    <span className="text-ds-text-muted self-end text-base font-medium">
      {cartItems.length} {t('products')}
    </span>
  );
}
