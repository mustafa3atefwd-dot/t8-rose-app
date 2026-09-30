import type { PaymentStatus } from '@/features/orders/lib/types';

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
} as const;

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS) as readonly PaymentStatus[];
