import type { IApiResponse } from '@/shared/lib/types/api';
import type { IUser } from '@/shared/lib/types/auth';
import type { IDocumentFields } from '@/shared/lib/types/base';

import type { IPaginationMeta, IProduct } from '@/features/products/lib/types';

import type { IAddress } from '@/features/checkout/lib/types';

import { PaymentStatus, PaymentMethod } from '@/features/orders/lib/types';
import { DELIVERY_STATUS, ORDER_STATUS } from '@/features/orders/lib/constants';

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type DeliveryStatus = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];

export interface IOrder extends IDocumentFields {
  id: string;
  userId: string;
  addressId: string;
  couponId: string | null;

  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;

  subtotal: number | string;
  discount: number | string;
  shipping: number | string;
  total: number | string;

  trackingNumber: string | null;
  notes: string | null;

  orderItems: IOrderItem[];
}

export interface IOrderItem extends IDocumentFields {
  id: string;
  orderId: string;
  productId: string;

  quantity: number;
  price: number | string;

  product: IProduct;
}

export interface IOrderDetails extends IOrder {
  user: IUser;
  address: IAddress;
}

export interface IStripeCheckoutSession {
  checkoutUrl: string;
  sessionId: string;
  expiresAt: string;
  reused: boolean;
}

export interface ICreateOrderPayload {
  order: IOrder;
  checkout: IStripeCheckoutSession | null;
}

export type ICreateOrderResponse = IApiResponse<ICreateOrderPayload>;

export interface IGetOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
}

export interface IOrdersPayload {
  data: IOrderDetails[];
  metadata: IPaginationMeta;
}

export type IOrdersResponse = IApiResponse<IOrdersPayload>;
