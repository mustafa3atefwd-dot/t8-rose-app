import { z } from 'zod';

interface ChangePasswordValidationMessages {
  oldPasswordRequired: string;
  newPasswordRequired: string;
  passwordMin: string;
  confirmPasswordRequired: string;
  passwordMismatch: string;
}

export function changePasswordSchema(messages: ChangePasswordValidationMessages) {
  return z
    .object({
      oldPassword: z.string().min(1, messages.oldPasswordRequired),
      newPassword: z.string().min(1, messages.newPasswordRequired).min(8, messages.passwordMin),
      confirmPassword: z.string().min(1, messages.confirmPasswordRequired),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      message: messages.passwordMismatch,
      path: ['confirmPassword'],
    });
}

export type ChangePasswordFormValues = z.infer<ReturnType<typeof changePasswordSchema>>;
