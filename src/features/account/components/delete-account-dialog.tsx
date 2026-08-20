'use client';

import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useDeleteAccount } from '../hooks/use-delete-account';

export function DeleteAccountDialog() {
  const t = useTranslations('account');
  const [open, setOpen] = useState(false);
  const mutation = useDeleteAccount();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!mutation.isPending) setOpen(nextOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        type="button"
        className={cn(buttonVariants({ variant: 'ghost' }), 'text-ds-text-danger w-full capitalize sm:w-auto')}
      >
        {t('actions.delete')}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-[474px] gap-0 rounded-2xl border-0 px-6 pt-7 pb-6 sm:min-h-[373px]">
        <button
          type="button"
          disabled={mutation.isPending}
          aria-label={t('deleteDialog.close')}
          onClick={() => setOpen(false)}
          className="text-ds-text-soft hover:text-ds-text-plain absolute end-6 top-6 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-5" />
        </button>

        <div className="mx-auto mt-12 flex size-[105px] items-center justify-center rounded-full bg-neutral-100">
          <div className="flex size-[70px] items-center justify-center rounded-full bg-neutral-300 text-neutral-800">
            <Trash2 className="size-7 stroke-[1.75]" aria-hidden="true" />
          </div>
        </div>

        <AlertDialogHeader className="mt-7 gap-1 text-center">
          <AlertDialogTitle className="text-xl leading-7">{t('deleteDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription className="text-ds-text-danger text-base leading-6">
            {t('deleteDialog.warning')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-auto gap-2.5 pt-8 sm:justify-stretch">
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => setOpen(false)}
            className="h-11 flex-1 text-base"
          >
            {t('deleteDialog.cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="h-11 flex-1 text-base"
          >
            {t('deleteDialog.confirm')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
