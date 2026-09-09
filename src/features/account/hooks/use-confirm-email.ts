'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { confirmEmailAction } from '../lib/actions/account.action';

interface UseConfirmEmailOptions {
  onConfirmed: () => void;
}

export function useConfirmEmail(email: string, { onConfirmed }: UseConfirmEmailOptions) {
  const t = useTranslations('account');
  const [code, setCode] = useState('');

  const mutation = useMutation({
    mutationFn: () => confirmEmailAction({ email, code }),
    onSuccess: () => {
      setCode('');
      toast.success(t('messages.emailVerified'));
      onConfirmed();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { code, setCode, mutation, confirmEmail: () => mutation.mutate() };
}
