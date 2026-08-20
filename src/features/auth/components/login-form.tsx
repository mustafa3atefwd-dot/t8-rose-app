'use client';

import {  useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { useLoginForm } from '@/features/auth/hooks';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { FormError, FormField, PasswordFormField } from '@/shared/components';

export function LoginForm() {
  const t = useTranslations('auth.loginForm');
  const { form, onSubmit, mutation } = useLoginForm();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="border-ds-border-subtle mx-auto flex w-full max-w-md flex-col gap-5 border-y pt-6 pb-9"
    >
      {/* Username field */}
      <FormField name="username" control={form.control} label={t('username')} placeholder={t('usernamePlaceholder')} />

      {/* Password field */}
      <PasswordFormField
        name="password"
        control={form.control}
        label={t('password')}
        placeholder={t('passwordPlaceholder')}
        hasForgotPassword
      />

      {/* Remember me checkbox */}
      <Controller
        control={form.control}
        name="rememberMe"
        render={({ field }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              id="remember-me"
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />

            <label htmlFor="remember-me" className="cursor-pointer text-sm">
              {t('rememberMe')}
            </label>
          </div>
        )}
      />

      {/* Error message */}
      {mutation.isError && <FormError message={(mutation.error as Error).message} />}

      {/* Submit button */}
      <Button type="submit" loading={mutation.isPending} loadingText={t('loading')} className="h-12 w-full">
        {t('button')}
      </Button>
    </form>
  );
}
