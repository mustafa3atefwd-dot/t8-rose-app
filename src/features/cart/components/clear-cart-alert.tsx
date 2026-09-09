'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';
import { useTranslations } from 'next-intl';

type ClearCartAlertProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ClearCartAlert({ isOpen, onOpenChange }: ClearCartAlertProps) {
  const { clearCart } = useCart();
  const t = useTranslations('cart');

  const handleClearCart = () => {
    clearCart();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('clearCart')}</AlertDialogTitle>

          <AlertDialogDescription>{t('confirmClear')}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>

          <Button onClick={handleClearCart}>{t('accept')}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
