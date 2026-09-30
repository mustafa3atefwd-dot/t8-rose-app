import { z } from 'zod';
import { reviewSchema } from '../schemas/product-review-form.schema';

export type IReviewSchema = z.infer<ReturnType<typeof reviewSchema>>;
