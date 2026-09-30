'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';
import { userInfoStepSchema } from '@/features/auth/lib/schemas';
import { IUserInfoStepSchema } from '@/features/auth/lib/types/schemas';

interface IUseRegisterUserInfoStepProps {
  email: string;
}

export function useRegisterUserInfoStep({ email }: IUseRegisterUserInfoStepProps) {
  const t = useTranslations('validation');

  const [currentStep, setCurrentStep] = useState<RegisterStep>(REGISTER_STEPS.userInfo);

  const schema = useMemo(() => userInfoStepSchema(t), [t]);

  const form = useForm<IUserInfoStepSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      firstName: '',
      lastName: '',
      username: '',
      phone: {
        country: '',
        phone: '',
      },
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: IUserInfoStepSchema) => {
      const response = await fetch('/api/auth/register/user-info-step', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    },

    onSuccess: () => {
      window.location.href = '/login';
    },
  });

  async function handleNextStep() {
    const isValid = await form.trigger(['firstName', 'lastName', 'username', 'phone']);

    if (isValid) {
      setCurrentStep(REGISTER_STEPS.password);
    }
  }

  function handlePreviousStep() {
    setCurrentStep(REGISTER_STEPS.userInfo);
  }

  function onSubmit(values: IUserInfoStepSchema) {
    mutation.mutate({
      ...values,
      email,
    });
  }

  return {
    form,
    mutation,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    onSubmit,
  };
}
