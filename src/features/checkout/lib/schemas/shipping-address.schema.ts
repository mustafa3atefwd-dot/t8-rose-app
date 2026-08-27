import { z } from 'zod';

export const shippingAddressSchema = z.object({
  addressId: z
    .string({ message: 'Please select a shipping address to proceed' })
    .min(1, 'Please select a shipping address to proceed'),
});

export type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;