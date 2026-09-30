'use client';

import { Dispatch, SetStateAction, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';
import { emailStepSchema } from '@/features/auth/lib/schemas';
import { IEmailStepSchema } from '@/features/auth/lib/types/schemas';

interface IUseRegisterEmailStepProps {
  setStep: Dispatch<SetStateAction<RegisterStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export function useRegisterEmailStep({ setStep, setEmail }: IUseRegisterEmailStepProps) {
  const t = useTranslations('validation');

  const schema = useMemo(() => emailStepSchema(t), [t]);

  const form = useForm<IEmailStepSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: IEmailStepSchema) => {
      const response = await fetch('/api/auth/register/send-email-step', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess: (_, values) => {
      setEmail(values.email);
      setStep(REGISTER_STEPS.otp);
    },
  });

  function onSubmit(values: IEmailStepSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
