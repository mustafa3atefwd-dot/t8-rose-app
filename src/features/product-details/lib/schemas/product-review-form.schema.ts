import { z } from 'zod';

/**
 * Validation schema for the product review form
 */
export const reviewSchema = (t: (key: string) => string) =>
  z.object({
    productId: z.string().min(1, t('validation.review.productIdRequired')),
    headline: z.string().min(1, t('validation.review.headlineRequired')),
    content: z.string(),
    rating: z
      .number()
      .min(1, t('validation.review.ratingRequired'))
      .max(5, t('validation.review.ratingInvalid')),
  });
