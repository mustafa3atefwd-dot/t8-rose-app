'use client';

import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';
import { BrushCleaning } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ClearCartButton() {
  const { clearCart, cartItems } = useCart();
  const t = useTranslations('cart');
  const isEmpty = cartItems.length === 0;

  return (
    <Button
      disabled={isEmpty}
      onClick={clearCart}
      className="text-maroon-600 font-semibold flex items-center justify-center gap-2.5"
      variant="secondary"
      size="lg"
    >
      <BrushCleaning className="size-5" />
      {t('clearCart')}
    </Button>
  );
}