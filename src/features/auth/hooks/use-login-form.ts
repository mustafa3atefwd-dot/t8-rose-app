'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../lib/schemas/login.schema';
import { REMEMBER_ME_SESSION_MAX_AGE_SECONDS } from '../lib/constants/session.constant';

export function useLoginForm() {
  const t = useTranslations('auth.loginForm');
  const locale = useLocale();

  const router = useRouter();

  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || `/${locale}`;

  const schema = loginSchema({
    required: t('validation.required'),
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        rememberMe: values.rememberMe ? 'true' : 'false',

        ...(values.rememberMe && {
          maxAge: String(REMEMBER_ME_SESSION_MAX_AGE_SECONDS),
        }),

        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(t('invalidCredentials'));
      }

      return result;
    },

    onSuccess: () => {
      router.push(returnUrl);
      router.refresh();
    },

    onError: (error) => {
      if (error instanceof TypeError) {
        throw new Error(t('networkError'));
      }
    },
  });

  function onSubmit(values: LoginSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
