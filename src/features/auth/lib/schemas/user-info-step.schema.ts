import { z } from 'zod';
import { USER_GENDERS } from '../constants/user.constant';
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js/max';

/**
 * Validation schema for user registration info step
 * Includes personal data + authentication credentials
 */
export const userInfoStepSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.email(t('invalidEmail')),

      firstName: z.string().min(2, t('firstName')),

      lastName: z.string().min(2, t('lastName')),

      username: z.string().min(2, t('username')),

      phone: z
        .object({
          phone: z.string().trim(),
          country: z.string(),
        })
        .refine((val) => isValidPhoneNumber(val.phone), {
          message: t('invalidPhone'),
        })
        .refine((val) => /^\+20(10|11|12|15)\d{8}$/.test(val.phone), {
          message: t('invalidEgyptPhone'),
        }),

      gender: z
        .enum(USER_GENDERS, {
          error: () => t('invalidGender'),
        })
        .optional(),

      password: z
        .string()
        .min(8, t('passwordMin'))
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, t('passwordWeak')),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });
