'use client';

import { useEffect, useRef } from 'react';
import { Paintbrush, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

interface ClearWishlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ClearWishlistDialog({ open, onOpenChange, onConfirm }: ClearWishlistDialogProps) {
  const t = useTranslations('wishlist');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const closeDialog = () => onOpenChange(false);

  const confirmClear = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="clear-wishlist-title"
      className="border-ds-border-muted bg-ds-bg-plain text-ds-text-plain backdrop:bg-ds-bg-overlay m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border p-0 shadow-2xl"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={closeDialog}
    >
      <div className="relative flex flex-col items-center gap-7 p-6 sm:p-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t('closeDialog')}
          className="absolute end-3 top-3"
          onClick={closeDialog}
        >
          <X />
        </Button>

        <div className="bg-ds-bg-subtle flex size-24 items-center justify-center rounded-full">
          <div className="bg-ds-bg-muted flex size-16 items-center justify-center rounded-full">
            <Paintbrush className="size-8" aria-hidden="true" />
          </div>
        </div>

        <h2 id="clear-wishlist-title" className="text-center text-lg font-semibold sm:text-xl">
          {t('clearConfirmation')}
        </h2>

        <div className="grid w-full grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-11" onClick={closeDialog}>
            {t('cancel')}
          </Button>
          <Button type="button" variant="destructive" className="h-11" onClick={confirmClear}>
            {t('confirm')}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
