'use client';

import { useState } from 'react';
import { BrushCleaning } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';

import ClearCartAlert from './clear-cart-alert';

export default function ClearCartButton() {
  const [openAlert, setOpenAlert] = useState(false);

  const { cartItems } = useCart();
  const t = useTranslations('cart');

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <Button
        disabled={isEmpty}
        onClick={() => setOpenAlert(true)}
        className="text-maroon-600 flex items-center justify-center gap-2.5 font-semibold"
        variant="secondary"
        size="lg"
      >
        <BrushCleaning className="size-5" />
        {t('clearCart')}
      </Button>

      <ClearCartAlert isOpen={openAlert} onOpenChange={setOpenAlert} />
    </>
  );
}
