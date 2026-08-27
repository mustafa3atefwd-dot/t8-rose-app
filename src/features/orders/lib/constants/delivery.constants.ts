import type { DeliveryStatus } from '@/features/orders/lib/types';

export const DELIVERY_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export const DELIVERY_STATUS_LIST = Object.values(DELIVERY_STATUS) as readonly DeliveryStatus[];
