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

    // Stripe redirect targets. The API accepts these for CREDIT_CARD orders
    // only, so they are optional here and stripped for cash on delivery.
    successUrl: z.string().optional(),

    cancelUrl: z.string().optional(),
  });
