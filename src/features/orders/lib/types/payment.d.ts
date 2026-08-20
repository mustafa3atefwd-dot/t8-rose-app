import type { IApiResponse } from '@/shared/lib/types/api';
import { PAYMENT_METHOD } from '@/features/checkout/lib/constants';
import { PAYMENT_STATUS } from '@/features/orders/lib/constants';

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface ICreatePaymentIntentRequest {
  orderId: string;
}

export interface IConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface ICreatePaymentIntentPayload {
  clientSecret: string;
  paymentIntentId: string;
}

export type ICreatePaymentIntentResponse = IApiResponse<ICreatePaymentIntentPayload>;
