import { z } from 'zod';

export const productFormSchema = z.object({
  title: z.string().trim().min(1, 'validation.titleRequired').max(120, 'validation.titleLong'),
  description: z.string().trim().min(1, 'validation.descriptionRequired').max(1000, 'validation.descriptionLong'),
  price: z.coerce.number().positive('validation.priceInvalid'),
  discountValue: z.union([z.coerce.number().min(0, 'validation.discountInvalid'), z.literal('')]).optional(),
  stock: z.coerce.number().int('validation.quantityInteger').min(0, 'validation.quantityInvalid'),
  categoryId: z.string().min(1, 'validation.categoryRequired'),
  occasionId: z.string().min(1, 'validation.occasionRequired'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductFormInput = z.input<typeof productFormSchema>;
