import type { z } from 'zod';

import { createCheckoutSchema } from '@/features/checkout/lib/schemas/checkout.schema';

export type ICheckoutFormSchema = z.infer<ReturnType<typeof createCheckoutSchema>>;
