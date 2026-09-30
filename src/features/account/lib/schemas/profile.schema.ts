import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js/max';

interface ProfileValidationMessages {
  firstName: string;
  lastName: string;
  invalidEmail: string;
  invalidPhone: string;
  invalidEgyptPhone: string;
}

export function profileSchema(messages: ProfileValidationMessages) {
  return z.object({
    firstName: z.string().trim().min(2, messages.firstName),
    lastName: z.string().trim().min(2, messages.lastName),
    email: z.string().trim().min(1, messages.invalidEmail).email(messages.invalidEmail),
    phone: z
      .string()
      .trim()
      .refine((value) => value === '' || isValidPhoneNumber(value), { message: messages.invalidPhone })
      .refine((value) => value === '' || /^\+20(10|11|12|15)\d{8}$/.test(value), {
        message: messages.invalidEgyptPhone,
      }),
  });
}

export type ProfileFormValues = z.infer<ReturnType<typeof profileSchema>>;
