'use client';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/features/account/lib/schemas/change-password.schema';
import { changePasswordAction } from '@/features/account/lib/actions/account.action';

export function useDashboardChangePassword() {
  // Translations
  const t = useTranslations('account');

  // Validation schema
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

  // Form state
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  // Change password mutation
  const mutation = useMutation({
    mutationFn: changePasswordAction,
    onSuccess: () => {
      form.reset();
      toast.success(t('messages.passwordChanged'));
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { form, mutation };
}
