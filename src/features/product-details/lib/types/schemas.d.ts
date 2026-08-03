import { reviewSchema } from '@/features/product-details/lib/schemas';
import { z } from 'zod';

export type IReviewSchema = z.infer<ReturnType<typeof reviewSchema>>;
