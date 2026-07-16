import * as z from 'zod';

// step1
export const forgotPasswordStep1Schema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .pipe(z.email(t('validation.invalidEmail'))),

    redirectUrl: z
      .string(),
  });

export type TForgotPasswordStep1Schema = z.infer<
  ReturnType<typeof forgotPasswordStep1Schema>
>;

// step3
export const forgotPasswordStep3Schema = (t: (key: string) => string) =>
  z.object({
    newPassword: z
  .string()
  .nonempty(t('validation.newPasswordRequired'))
  .min(8, t('validation.passwordMin'))
  .regex(/[A-Z]/, t('validation.passwordUppercase'))
  .regex(/[a-z]/, t('validation.passwordLowercase'))
  .regex(/\d/, t('validation.passwordNumber'))
  .regex(
    /[@$!%*?&^#()_\-+=]/,
    t('validation.passwordSpecialCharacter')
  ),

confirmPassword: z
  .string()
  .nonempty(t('validation.confirmPasswordRequired')),
    token: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
  message: t('validation.passwordsDoNotMatch'),
  path: ['confirmPassword'],
});

export type TForgotPasswordStep3Schema = z.infer<ReturnType<typeof forgotPasswordStep3Schema>>;
