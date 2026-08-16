import { z } from 'zod';

import type { PaymentMethod } from '@/features/orders/lib/types';
import { PAYMENT_METHOD } from '@/features/checkout/lib/constants/checkout.constants';

const paymentMethods = Object.values(PAYMENT_METHOD) as [PaymentMethod, ...PaymentMethod[]];

export const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    addressId: z.string().min(1, t('validation.addressRequired')).uuid(t('validation.addressInvalid')),

    paymentMethod: z.enum(paymentMethods, {
      message: t('validation.paymentRequired'),
    }),

    couponCode: z.string().optional(),

    notes: z.string().max(500, t('validation.notesMaxLength')).optional(),

    successUrl: z.string().min(1, t('validation.urlRequired')),
  });
