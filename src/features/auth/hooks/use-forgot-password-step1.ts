'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/shared/components/ui/toast';
import {
  forgotPasswordStep1Schema,
  TForgotPasswordStep1Schema,
} from '../lib/schemas/forgot-password.schema';
import { useTranslations } from 'next-intl';
import { forgetPasswordStep1 } from '../lib/actions/forgot-password.action';

export function useForgotPasswordStep1(
  email: string,
  setEmail: (email: string) => void,
  onNext: () => void
) {
  const t = useTranslations();

  const form = useForm<TForgotPasswordStep1Schema>({
    defaultValues: {
      email,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password`
    },
    resolver: zodResolver(forgotPasswordStep1Schema(t)),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleForgotPassword = async (
    values: TForgotPasswordStep1Schema
  ) => {
    try {
      await forgetPasswordStep1(values);
      setEmail(values.email);
      onNext();
    } catch {
      toast.error(t('toast.error'));
    }
  };

  return {
    form,
    handleForgotPassword,
  };
}