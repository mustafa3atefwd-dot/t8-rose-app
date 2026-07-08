import { z } from 'zod';

/**
 * Validation schema for OTP verification step
 * Ensures valid email + 6-digit numeric code
 */
export const otpStepSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('invalidEmail')),

    code: z
      .string()
      .trim()
      .length(6, t('otpLength'))
      .regex(/^\d{6}$/, t('otpDigits')),
  });
