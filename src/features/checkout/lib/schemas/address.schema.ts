import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js/max';

export function addressSchema(messages: { required: string; invalidPhone: string }) {
  return z.object({
    city: z.string().min(1, messages.required),
    street: z.string().min(1, messages.required),
    phone: z
      .object({
        phone: z.string().trim(),
        country: z.string(),
      })
      .refine((val) => isValidPhoneNumber(val.phone), {
        message: messages.invalidPhone,
      }),
    latitude: z.string(),
    longitude: z.string(),
  });
}

export type AddressSchema = z.infer<ReturnType<typeof addressSchema>>;
