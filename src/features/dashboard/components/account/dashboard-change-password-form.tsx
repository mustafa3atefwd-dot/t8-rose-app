'use client';

import { useTranslations } from 'next-intl';

import { useDashboardChangePassword } from '@/features/dashboard/hooks/use-dashboard-change-password';
import { Button } from '@/shared/components/ui/button';
import { PasswordInput } from '@/shared/components/ui/inputs/password-input';

export function DashboardChangePasswordForm() {
  // Translations
  const t = useTranslations('account');

  // Form state and mutation
  const { form, mutation } = useDashboardChangePassword();
  const {
    register,
    formState: { errors },
  } = form;

  // Password field configuration
  const fields = [
    { name: 'oldPassword' as const, label: t('fields.currentPassword'), autoComplete: 'current-password' },
    { name: 'newPassword' as const, label: t('fields.newPassword'), autoComplete: 'new-password' },
    { name: 'confirmPassword' as const, label: t('fields.confirmPassword'), autoComplete: 'new-password' },
  ];

  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      className="bg-ds-bg-plain flex min-h-96 flex-col rounded-2xl p-4 sm:p-6 lg:min-h-112 lg:p-8"
      noValidate
    >
      {/* ===== Password Fields ===== */}
      <div className="space-y-5">
        {fields.map(({ name, label, autoComplete }) => {
          const error = errors[name];

          return (
            <div key={name} className="grid gap-2">
              <label htmlFor={`dashboard-${name}`} className="text-ds-text-plain text-sm font-medium">
                {label}
              </label>
              <PasswordInput
                id={`dashboard-${name}`}
                autoComplete={autoComplete}
                placeholder="********"
                invalid={Boolean(error)}
                disabled={mutation.isPending}
                aria-describedby={error ? `dashboard-${name}-error` : undefined}
                showLabel={t('password.showPassword')}
                hideLabel={t('password.hidePassword')}
                className="h-12.5"
                {...register(name)}
              />
              {error && (
                <p id={`dashboard-${name}-error`} role="alert" className="text-ds-text-danger text-sm">
                  {error.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== Submit Action ===== */}
      <div className="mt-8 flex sm:justify-end lg:mt-auto">
        <Button
          type="submit"
          loading={mutation.isPending}
          loadingText={t('actions.updating')}
          className="h-11 w-full px-8 text-base sm:w-auto sm:min-w-56"
        >
          {t('actions.updatePassword')}
        </Button>
      </div>
    </form>
  );
}
