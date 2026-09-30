import cash from '@/assets/images/cash-icon.svg';
import credit from '@/assets/images/credit-icon.svg';
import type { IPaymentMethodItem } from '@/features/checkout/lib/types';
import { PAYMENT_METHOD } from './checkout.constants';

export const PAYMENT_METHODS_CONFIG = [
  {
    value: PAYMENT_METHOD.CASH,
    iconSrc: cash,
    titleKey: 'payment.methods.cash.title',
    descriptionKey: 'payment.methods.cash.description',
  },
  {
    value: PAYMENT_METHOD.CARD,
    iconSrc: credit,
    titleKey: 'payment.methods.card.title',
    descriptionKey: 'payment.methods.card.description',
  },
] satisfies readonly IPaymentMethodItem[];