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

export interface IDeleteAccountDialogCopy {
  trigger: string;
  title: string;
  warning: string;
  cancel: string;
  confirm: string;
}

interface DeleteAccountDialogProps {
  copy: IDeleteAccountDialogCopy;
}

export function DeleteAccountDialog({ copy }: DeleteAccountDialogProps) {
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
        className={cn(buttonVariants({ variant: 'ghost' }), 'font-inter text-ds-text-danger text-base font-medium')}
      >
        {copy.trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-[474px] gap-0 rounded-2xl border-0 px-6 pt-7 pb-6 sm:min-h-[373px]">
        <button
          type="button"
          disabled={mutation.isPending}
          aria-label={t('deleteDialog.close')}
          onClick={() => setOpen(false)}
          className="text-ds-text-soft hover:text-ds-text-plain absolute inset-e-6 top-6 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-5" />
        </button>

        <div className="bg-ds-bg-muted mx-auto mt-12 flex size-[105px] items-center justify-center rounded-full">
          <div className="bg-ds-bg-soft text-ds-text-plain flex size-[70px] items-center justify-center rounded-full">
            <Trash2 className="size-7 stroke-[1.75]" aria-hidden="true" />
          </div>
        </div>

        <AlertDialogHeader className="mt-7 gap-1 text-center">
          <AlertDialogTitle className="text-center text-xl leading-7">{copy.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-ds-text-danger text-center text-base leading-6">
            {copy.warning}
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
            {copy.cancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="h-11 flex-1 text-base"
          >
            {copy.confirm}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
