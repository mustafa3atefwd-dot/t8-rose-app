'use client';

import { Button } from '@/shared/components/ui/button';
import { Field, FieldError } from '@/shared/components/ui/field';
import { Input, InputField } from '@/shared/components/ui/inputs';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ForgotPasswordStep1Props } from '../lib/types/forgot-password';
import { useForgotPasswordStep1 } from '../lib/hooks/use-forgot-password-step1';
export default function ForgotPasswordStep1({ onNext, setEmail, email }: ForgotPasswordStep1Props) {
  const t = useTranslations();
  const { form, handleForgotPassword } = useForgotPasswordStep1(email, setEmail, onNext);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid, errors },
  } = form;
  return (
    <>
      {/* forgot password form */}
      <div className="w-full max-w-101.5">
        {/* header */}
        <header className="text-text-plain border-ds-border-muted border-b pb-4">
          <h3 className="text-2xl font-semibold">{t('forgotPw.step1.title')}</h3>
          <p>{t('forgotPw.step1.subtitle')}</p>
        </header>
        <form className="mt-6" onSubmit={handleSubmit(handleForgotPassword)}>
          <Field data-invalid={!!errors.email}>
            <InputField label={t('input.labels.email')} htmlFor="email">
              <Input
                autoFocus
                id="email"
                type="email"
                inputMode="email"
                placeholder={t('input.placeholders.email')}
                {...register('email')}
              />
            </InputField>

            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            size={'lg'}
            className="bg-maroon-500 dark:bg-soft-pink-300 my-9 w-full py-5 text-base"
          >
            {t('button.next')}
            <MoveRight className="text-base rtl:rotate-180" />
          </Button>
        </form>
        {/* create account */}
        <div className="border-ds-border-muted border-t pt-5 text-center text-sm">
          <span className="text-ds-text-plain font-medium">{t('forgotPw.step1.notHaveAccount')}</span>
          <Link href={'/login'} className="text-maroon-700 dark:text-soft-pink-300 font-bold">
            {' '}
            {t('forgotPw.step1.toRegister')}
          </Link>
        </div>
      </div>
    </>
  );
}
