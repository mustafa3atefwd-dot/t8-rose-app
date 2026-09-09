'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { deleteAccountAction } from '../lib/actions/account.action';

export function useDeleteAccount() {
  const t = useTranslations('account');

  return useMutation({
    mutationFn: deleteAccountAction,
    onSuccess: async () => {
      toast.success(t('messages.deleted'));
      await signOut({ callbackUrl: '/' });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
