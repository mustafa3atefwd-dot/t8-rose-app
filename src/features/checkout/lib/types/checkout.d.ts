import type { PaymentMethod } from '@/features/orders/lib/types/payment';
import { CHECKOUT_STEPS } from '@/features/checkout/lib/constants';

export type CheckoutStep = (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];

export interface IPaymentMethodItem {
  value: PaymentMethod;
  iconSrc: string;
  titleKey: string;
  descriptionKey: string;
}
