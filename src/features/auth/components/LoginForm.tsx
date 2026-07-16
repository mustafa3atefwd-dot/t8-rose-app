'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input, PasswordInput } from '@/shared/components/ui/inputs';
import { loginSchema, type LoginSchema } from '@/features/auth/lib/schemas';
import { Link } from '@/i18n/navigation';

function getSafeReturnUrl(returnUrl: string | null, locale: string) {
  const fallbackUrl = `/${locale}`;

  if (!returnUrl?.startsWith('/') || returnUrl.startsWith('//')) {
    return fallbackUrl;
  }

  return returnUrl;
}

export function LoginForm() {
  // Translation
  const t = useTranslations('auth.loginForm');
  const locale = useLocale();
  const schema = loginSchema({
    required: t('validation.required'),
  });

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = getSafeReturnUrl(searchParams.get('returnUrl'), locale);

  // Form
  const {
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    handleSubmit,
    register,
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  // Functions
  async function handleLogin(values: LoginSchema) {
    clearErrors('root');

    try {
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        rememberMe: values.rememberMe ? 'true' : 'false',
        redirect: false,
      });

      if (!result?.ok || result.error) {
        setError('root', { message: t('invalidCredentials') });
        return;
      }

      router.push(returnUrl);
      router.refresh();
    } catch {
      setError('root', { message: t('networkError') });
    }
  }

  return (
    <form className="mx-auto flex w-full max-w-md flex-col gap-5" noValidate onSubmit={handleSubmit(handleLogin)}>
      <Field data-invalid={Boolean(errors.username)}>
        <FieldLabel htmlFor="username">{t('username')}</FieldLabel>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          placeholder={t('usernamePlaceholder')}
          aria-invalid={Boolean(errors.username)}
          aria-describedby={errors.username ? 'username-error' : undefined}
          {...register('username')}
        />
        <FieldError id="username-error" errors={[errors.username]} />
      </Field>

      <Field data-invalid={Boolean(errors.password)}>
        <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder={t('passwordPlaceholder')}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
          invalid={Boolean(errors.password)}
          showLabel={t('showPassword')}
          hideLabel={t('hidePassword')}
          {...register('password')}
        />
        <FieldError id="password-error" errors={[errors.password]} />
        <Link
          className="ms-auto text-sm font-medium text-ds-text-primary transition-colors hover:underline"
          href="/forgot-password"
        >
          {t('forgotPassword')}
        </Link>
      </Field>

      <Controller
        control={control}
        name="rememberMe"
        render={({ field }) => (
          <label className="flex w-fit items-center gap-3 text-sm text-ds-text-plain">
            <Checkbox checked={Boolean(field.value)} onCheckedChange={(checked) => field.onChange(checked === true)} />
            {t('rememberMe')}
          </label>
        )}
      />

      {errors.root?.message ? (
        <p className="text-center text-sm font-medium text-ds-text-danger" role="alert">
          {errors.root.message}
        </p>
      ) : null}

      <Button type="submit" className="h-12 w-full" loading={isSubmitting} loadingText={t('loading')}>
        {t('button')}
      </Button>

      <footer className="border-t border-ds-border-muted pt-6 text-center text-sm text-ds-text-muted">
        {t('noAccount')}{' '}
        <Link className="font-semibold text-ds-text-primary hover:underline" href="/register">
          {t('register')}
        </Link>
      </footer>
    </form>
  );
}
