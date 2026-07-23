import { z } from 'zod';

/**
 * Validation schema for the product review form.
 *
 * Ensures:
 * - productId is required
 * - headline is required
 * - content is optional
 * - rating is between 1 and 5
 */
export const reviewSchema = (t: (key: string) => string) =>
  z.object({
    productId: z.string().min(1, t('validation.review.productIdRequired')),

    headline: z.string().trim().min(1, t('validation.review.headlineRequired')),

    content: z.string().optional(),

    rating: z.number().min(1, t('validation.review.ratingRequired')).max(5, t('validation.review.ratingInvalid')),
  });
