import { z } from 'zod';
import type { UseFormReturn } from 'react-hook-form';

export const productFormSchema = z
  .object({
    title: z.string().trim().min(1, 'validation.titleRequired').max(120, 'validation.titleLong'),
    description: z
      .string()
      .trim()
      .min(1, 'validation.descriptionRequired')
      .max(1000, 'validation.descriptionLong'),
    price: z.coerce.number({ message: 'validation.priceInvalid' }).positive('validation.priceInvalid'),
    discountValue: z
      .union([
        z.coerce.number().min(0, 'validation.discountInvalid'),
        z.literal(''),
      ])
      .optional(),
    stock: z.coerce
      .number({ message: 'validation.quantityInvalid' })
      .int('validation.quantityInteger')
      .min(0, 'validation.quantityInvalid'),
    categoryId: z.string().min(1, 'validation.categoryRequired'),
    occasionId: z.string().optional().default(''),
  })
  .refine(
    (data) => {
      const price = Number(data.price) || 0;
      const discount = Number(data.discountValue) || 0;
      return discount <= price;
    },
    {
      message: 'validation.discountExceedsPrice',
      path: ['discountValue'],
    }
  );

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductAdminForm = UseFormReturn<ProductFormInput, unknown, ProductFormValues>;