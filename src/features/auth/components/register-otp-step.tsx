import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { FormError, SubmitButton } from '@/shared/components';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { useRegisterOtpStep } from '@/features/auth/hooks';
import { RegisterStepLayout } from '@/features/auth/layouts';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';

interface IRegisterOtpStepProps {
  setStep: Dispatch<SetStateAction<RegisterStep>>;
  email: string;
}

function RegisterOtpStep({ setStep, email }: IRegisterOtpStepProps) {
  const t = useTranslations('auth.registerOtp');

  const { form, timer, onSubmit, errorMessage, verifyOtpMutation, resendOtpMutation } = useRegisterOtpStep({
    email,
    setStep,
  });

  const isResendAvailable = timer === 0;

  return (
    <RegisterStepLayout headingId="register-otp-heading">
      {/* ===== Header ===== */}
      <RegisterStepLayout.Title id="register-otp-heading">{t('title')}</RegisterStepLayout.Title>

      {/* ===== Subtitle ===== */}
      <RegisterStepLayout.Subtitle>{t('subtitle')}</RegisterStepLayout.Subtitle>

      {/* ===== Description ===== */}
      <RegisterStepLayout.Description>
        {t('sentTo')} {email}{' '}
        <button
          type="button"
          className="cursor-pointer font-medium text-blue-600 hover:underline"
          onClick={() => setStep(REGISTER_STEPS.email)}
        >
          {t('edit')}
        </button>
      </RegisterStepLayout.Description>

      {/* ===== Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="border-ds-border-muted border-y">
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
              <InputOTPGroup className="mt-11 mb-7.5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} aria-invalid={!!errorMessage} className="mx-1.25" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {/* ===== Timer / Resend Section ===== */}
        {isResendAvailable ? (
          <p className="ms-auto w-fit text-gray-500">
            <button
              type="button"
              className="text-ds-text-plain cursor-pointer font-medium"
              onClick={() => resendOtpMutation.mutate()}
              disabled={resendOtpMutation.isPending}
            >
              {resendOtpMutation.isPending ? t('resending') : t('sendNewCode')}
            </button>
          </p>
        ) : (
          <p className="ms-auto w-fit text-gray-500">{t('requestCodeIn', { timer })}</p>
        )}

        {/* ===== Error Message ===== */}
        <FormError message={errorMessage} />

        {/* ===== Submit Button ===== */}
        <SubmitButton isLoading={verifyOtpMutation.isPending} loadingText={t('verifying')}>
          {t('verifyCode')}
        </SubmitButton>
      </form>

      {/* ===== Footer ===== */}
      <RegisterStepLayout.Footer>
        {t('needHelp')}{' '}
        <Link
          href="/contact"
          className="text-maroon-700 hover:text-maroon-700/90 dark:text-soft-pink-300 dark:hover:text-soft-pink-300/90 font-medium"
        >
          {t('contactUs')}
        </Link>
      </RegisterStepLayout.Footer>
    </RegisterStepLayout>
  );
}

export default RegisterOtpStep;
