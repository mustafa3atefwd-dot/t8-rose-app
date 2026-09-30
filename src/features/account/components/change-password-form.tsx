'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { PasswordInput } from '@/shared/components/ui/inputs/password-input';
import { useChangePassword } from '../hooks/use-change-password';

interface ChangePasswordFormProps {
  token: string;
}

export function ChangePasswordForm({ token }: ChangePasswordFormProps) {
  const t = useTranslations('account');
  const { form, mutation } = useChangePassword(token);
  const {
    register,
    formState: { errors },
  } = form;

  const fields = [
    { name: 'oldPassword' as const, label: t('fields.currentPassword') },
    { name: 'newPassword' as const, label: t('fields.newPassword') },
    { name: 'confirmPassword' as const, label: t('fields.confirmPassword') },
  ];

  return (
    <section className="sm:px-2">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">{t('password.title')}</h2>
        <p className="text-ds-text-soft mt-1 text-sm sm:text-base">{t('password.description')}</p>
      </div>

      <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-5">
        {fields.map(({ name, label }) => {
          const error = errors[name];

          return (
            <div key={name} className="grid gap-2">
              <label htmlFor={name} className="text-ds-text-plain text-sm font-medium">
                {label}
              </label>
              <PasswordInput
                id={name}
                autoComplete={name === 'oldPassword' ? 'current-password' : 'new-password'}
                placeholder="********"
                invalid={!!error}
                disabled={mutation.isPending}
                aria-describedby={error ? `${name}-error` : undefined}
                showLabel={t('password.showPassword')}
                hideLabel={t('password.hidePassword')}
                {...register(name)}
              />
              {error && (
                <p id={`${name}-error`} role="alert" className="text-ds-text-danger text-sm">
                  {error.message}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex pt-5 sm:justify-end sm:pt-8">
          <Button
            type="submit"
            variant="destructive"
            loading={mutation.isPending}
            disabled={!token}
            loadingText={t('actions.updating')}
            className="h-11 w-full px-8 text-base sm:w-auto sm:min-w-56"
          >
            {t('actions.updatePassword')}
          </Button>
        </div>
        {!token && <p className="text-ds-text-danger text-sm">{t('password.validation.missingToken')}</p>}
      </form>
    </section>
  );
}
