'use client';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { changePasswordAction } from '../lib/actions/account.action';
import { changePasswordSchema, type ChangePasswordFormValues } from '../lib/schemas/change-password.schema';

export function useChangePassword() {
  const t = useTranslations('account');

  const schema = useMemo(
    () =>
      changePasswordSchema({
        oldPasswordRequired: t('password.validation.oldPasswordRequired'),
        newPasswordRequired: t('password.validation.newPasswordRequired'),
        passwordMin: t('password.validation.passwordMin'),
        confirmPasswordRequired: t('password.validation.confirmPasswordRequired'),
        passwordMismatch: t('password.validation.passwordMismatch'),
      }),
    [t]
  );

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const mutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }: ChangePasswordFormValues) =>
      changePasswordAction({ oldPassword, newPassword }),
    onSuccess: () => {
      form.reset();
      toast.success(t('messages.passwordChanged'));
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { form, mutation };
}
