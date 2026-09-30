'use client';

import { Dispatch, SetStateAction, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';
import { otpStepSchema } from '@/features/auth/lib/schemas';
import { IOtpStepSchema } from '@/features/auth/lib/types/schemas';
import { useCountdownTimer } from '@/shared/hooks';

interface IUseRegisterOtpStepProps {
  email: string;
  setStep: Dispatch<SetStateAction<RegisterStep>>;
}

export function useRegisterOtpStep({ email, setStep }: IUseRegisterOtpStepProps) {
  const t = useTranslations('validation');
  const tAuth = useTranslations('auth');

  const { timer, resetTimer } = useCountdownTimer();

  const schema = useMemo(() => otpStepSchema(t), [t]);

  const form = useForm<IOtpStepSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      code: '',
    },
  });

  const getOtpErrorMessage = (message: string) => {
    if (message.toLowerCase().includes('expired')) {
      return tAuth('registerOtp.otpExpired');
    }

    return tAuth('registerOtp.otpInvalid');
  };

  const verifyOtpMutation = useMutation({
    mutationFn: async (values: IOtpStepSchema) => {
      const response = await fetch('/api/auth/register/confirm-otp-step', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Invalid OTP');
      }

      return data;
    },

    onSuccess: () => {
      setStep(REGISTER_STEPS.userInfo);
    },

    onError: () => {
      form.resetField('code');
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/register/send-email-step', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      return data;
    },

    onSuccess: () => {
      resetTimer();
    },
  });

  function onSubmit(values: IOtpStepSchema) {
    verifyOtpMutation.mutate({
      email,
      code: values.code,
    });
  }

  const errorMessage =
    form.formState.errors.code?.message ||
    (verifyOtpMutation.isError ? getOtpErrorMessage(verifyOtpMutation.error.message) : undefined);

  return {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  };
}
