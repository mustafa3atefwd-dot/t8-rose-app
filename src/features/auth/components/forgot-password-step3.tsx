'use client';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError } from '@/shared/components/ui/field';
import { InputField, PasswordInput } from '@/shared/components/ui/inputs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordStep3Schema, TForgotPasswordStep3Schema } from '../lib/schemas/forgot-password.schema';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ForgotPasswordStep3Response } from '../lib/types/forgot-password.type';
import { forgetPasswordStep3 } from '../lib/actions/forgot-password.action';
import { useRouter } from '@/i18n/navigation';
import { toast } from '@/shared/components/ui/toast';

export default function ForgotPasswordStep3() {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm<TForgotPasswordStep3Schema>({
    defaultValues: {
      token: 'dfgg',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(forgotPasswordStep3Schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid, errors },
  } = form;
  async function handleForgotPasswordStep3(values: TForgotPasswordStep3Schema) {
    try {
      const payload: ForgotPasswordStep3Response = await forgetPasswordStep3(values);
      if (payload?.status) {
        toast.success(t('forgotPw.step3.success'));
        router.push('/login');
      }
    } catch (error) {
      toast.error(t('toast.error'));
    }
  }
  return (
    <>
      {/* forgot password form */}
      <div className="w-full max-w-101.5">
        {/* header */}
        <header className="text-text-plain border-ds-border-muted border-b pb-4">
          <h3 className="text-2xl font-semibold">{t('forgotPw.step3.title')}</h3>
          <p>{t('forgotPw.step3.subtitle')}</p>
        </header>
        <form className="mt-6" onSubmit={handleSubmit(handleForgotPasswordStep3)}>
          <Field data-invalid={!!errors.newPassword}>
            <InputField label={t('input.labels.password')} htmlFor="newPassword">
              <PasswordInput
                id="newPassword"
                placeholder={t('input.placeholders.password')}
                showLabel={t('input.showPassword')}
                hideLabel={t('input.hidePassword')}
                {...register('newPassword')}
              />
            </InputField>

            {errors.newPassword && <FieldError errors={[errors.newPassword]} />}
          </Field>

          <Field data-invalid={!!errors.confirmPassword} className="mt-4">
            <InputField label={t('input.labels.confirmPassword')} htmlFor="confirmPassword">
              <PasswordInput
                id="confirmPassword"
                placeholder={t('input.placeholders.password')}
                showLabel={t('input.showPassword')}
                hideLabel={t('input.hidePassword')}
                {...register('confirmPassword')}
              />
            </InputField>

            {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]} />}
          </Field>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            size={'lg'}
            className="bg-maroon-500 dark:bg-soft-pink-300 my-9 w-full py-5 text-base"
          >
            {t('forgotPw.step3.reset')}
          </Button>
        </form>
        {/* create account */}
        <div className="border-ds-border-muted border-t pt-5 text-center text-sm">
          <span className="text-ds-text-plain font-medium">{t('forgotPw.step3.contact')}</span>
          <Link href={'/'} className="text-maroon-700 dark:text-soft-pink-300 font-bold">
            {' '}
            {t('forgotPw.step3.toContact')}
          </Link>
        </div>
      </div>
    </>
  );
}
