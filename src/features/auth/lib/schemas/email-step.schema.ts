import { z } from 'zod';

/**
 * Validation schema for email step (used in auth flows)
 * Ensures email is required and properly formatted
 */
export const emailStepSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t('required')).email(t('invalidEmail')),
  });
