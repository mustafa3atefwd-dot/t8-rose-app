'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { toast } from '@/shared/components/ui/toast';
import { forgotPasswordStep3Schema, TForgotPasswordStep3Schema } from '../lib/schemas/forgot-password.schema';
import { ForgotPasswordStep3Response } from '../lib/types/forgot-password';
import { forgetPasswordStep3 } from '../lib/actions/forgot-password.action';

export function useForgotPasswordStep3(token: string) {
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<TForgotPasswordStep3Schema>({
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(forgotPasswordStep3Schema(t)),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  async function handleForgotPasswordStep3(values: TForgotPasswordStep3Schema) {
    try {
      const payload: ForgotPasswordStep3Response = await forgetPasswordStep3(values);

      if (payload?.status) {
        toast.success(t('forgotPw.step3.success'));
        router.push('/login');
      }
    } catch {
      toast.error(t('toast.error'));
    }
  }

  return {
    t,
    form,
    handleForgotPasswordStep3,
  };
}
