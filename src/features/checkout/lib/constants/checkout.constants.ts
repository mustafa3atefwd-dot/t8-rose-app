import type { CheckoutStep } from '@/features/checkout/lib/types';

export const CHECKOUT_STEPS = {
  SHIPPING: 'SHIPPING',
  PAYMENT: 'PAYMENT',
} as const;

export const CHECKOUT_STEPS_LIST = Object.values(CHECKOUT_STEPS) as readonly CheckoutStep[];

export const PAYMENT_METHOD = {
  CASH: 'CASH_ON_DELIVERY',
  CARD: 'CREDIT_CARD',
} as const;
