'use client';
import HeaderBadge from '@/shared/components/header-badge';
import { useCart } from '@/shared/hooks/use-cart';

export default function CartBadge() {
  const { uniqueItemsCount } = useCart();

  if (uniqueItemsCount <= 0) {
    return null;
  }

  return <HeaderBadge count={uniqueItemsCount} />;
}