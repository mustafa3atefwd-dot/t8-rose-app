'use client';

import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { FieldGroup } from '@/shared/components/ui/field';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';
import { RegisterStepLayout } from '@/features/auth/layouts';
import { useRegisterUserInfoStep, useRegisterStepDirection } from '@/features/auth/hooks';
import { FormError, FormField, PasswordFormField, PhoneFormField, SubmitButton } from '@/shared/components';
import { RegisterStepTransition } from '@/features/auth/components';

interface IRegisterUserInfoStepProps {
  email: string;
}

function RegisterUserInfoStep({ email }: IRegisterUserInfoStepProps) {
  // Translations
  const t = useTranslations('auth');
  const tInput = useTranslations('input.placeholders');
  const tButton = useTranslations('button');

  const { form, mutation, currentStep, handleNextStep, handlePreviousStep, onSubmit } = useRegisterUserInfoStep({
    email,
  });

  const direction = useRegisterStepDirection(currentStep);
  const isPasswordStep = currentStep === REGISTER_STEPS.password;
  const subtitle = isPasswordStep ? t('createStrongPassword') : t('tellUsMore');
  const description = isPasswordStep ? t('securePassword') : t('detailsToStart');

  return (
    <RegisterStepLayout headingId="register-user-info-heading">
      {/* ===== Header ===== */}
      <RegisterStepLayout.Header>
        <RegisterStepLayout.Title id="register-user-info-heading">{t('createAccount')}</RegisterStepLayout.Title>

        {isPasswordStep && (
          <Button type="button" variant="outline" onClick={handlePreviousStep} className="my-3 w-fit gap-2.5">
            <MoveRight className="size-4.5 rotate-180 rtl:rotate-0" />
          </Button>
        )}
      </RegisterStepLayout.Header>

      {/* ===== Subtitle ===== */}
      <RegisterStepLayout.Subtitle>{subtitle}</RegisterStepLayout.Subtitle>

      {/* ===== Description ===== */}
      <RegisterStepLayout.Description>{description}</RegisterStepLayout.Description>

      {/* ===== Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <RegisterStepTransition step={currentStep} direction={direction}>
          {/* First Step - User Info (FirstName, LastName, Username, Phone) */}
          {currentStep === REGISTER_STEPS.userInfo && (
            <>
              {/* First Name & Last Name Wrapper */}
              <FieldGroup className="grid grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  control={form.control}
                  label={t('firstName')}
                  placeholder={tInput('firstName')}
                  required
                />

                <FormField
                  name="lastName"
                  control={form.control}
                  label={t('lastName')}
                  placeholder={tInput('lastName')}
                  required
                />
              </FieldGroup>

              {/* Username & Phone Wrapper */}
              <FieldGroup className="mt-4">
                <FormField
                  name="username"
                  control={form.control}
                  label={t('username')}
                  placeholder={tInput('username')}
                  required
                />

                <PhoneFormField name="phone" control={form.control} label={t('phoneNumber')} />
              </FieldGroup>

              {/* Error Message */}
              {mutation.isError && <FormError message={(mutation.error as Error).message} />}

              {/* Next Button */}
              <SubmitButton
                isLoading={false}
                loadingText={tButton('loading')}
                disabled={mutation.isPending}
                onClick={handleNextStep}
                type="button"
              >
                {tButton('next')}
                <MoveRight className="size-4.5 rtl:rotate-180" />
              </SubmitButton>
            </>
          )}

          {/* Second Step - Password */}
          {currentStep === REGISTER_STEPS.password && (
            <>
              {/* Password & Confirm Password Wrapper */}
              <FieldGroup className="mt-4">
                <PasswordFormField
                  name="password"
                  control={form.control}
                  label={t('password')}
                  placeholder={tInput('passwordPlaceholder')}
                />

                <PasswordFormField
                  name="confirmPassword"
                  control={form.control}
                  label={t('confirmPassword')}
                  placeholder={tInput('passwordPlaceholder')}
                />
              </FieldGroup>

              {/* Error Message */}
              {mutation.isError && <FormError message={(mutation.error as Error).message} />}

              {/* Create Account Button */}
              <SubmitButton isLoading={mutation.isPending} loadingText={tButton('creating')}>
                {t('createAccount')}
                <MoveRight className="size-4.5 rtl:rotate-180" />
              </SubmitButton>
            </>
          )}
        </RegisterStepTransition>
      </form>
    </RegisterStepLayout>
  );
}

export default RegisterUserInfoStep;
