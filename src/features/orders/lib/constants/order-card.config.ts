import { Banknote, CheckCheck, CreditCard, TriangleAlert, Truck, type LucideIcon } from 'lucide-react';
import type { DeliveryStatus, OrderStatus, PaymentMethod } from '@/features/orders/lib/types';

export const ORDER_STATUS_CONFIG = {
  PENDING: {
    labelKey: 'pending',
    className: 'bg-amber-500',
  },

  PROCESSING: {
    labelKey: 'processing',
    className: 'bg-blue-500',
  },

  CONFIRMED: {
    labelKey: 'confirmed',
    className: 'bg-green-500',
  },

  SHIPPED: {
    labelKey: 'shipped',
    className: 'bg-purple-500',
  },

  DELIVERED: {
    labelKey: 'delivered',
    className: 'bg-emerald-500',
  },

  CANCELLED: {
    labelKey: 'cancelled',
    className: 'bg-red-600',
  },

  REFUNDED: {
    labelKey: 'refunded',
    className: 'bg-orange-600',
  },
} satisfies Record<
  OrderStatus,
  {
    labelKey: string;
    className: string;
  }
>;

export const DELIVERY_CONFIG = {
  PENDING: {
    labelKey: 'pending',
    className: 'text-amber-500',
    icon: Truck,
  },

  PROCESSING: {
    labelKey: 'processing',
    className: 'text-blue-500',
    icon: Truck,
  },

  CONFIRMED: {
    labelKey: 'processing',
    className: 'text-blue-500',
    icon: Truck,
  },

  SHIPPED: {
    labelKey: 'shipped',
    className: 'text-purple-500',
    icon: Truck,
  },

  DELIVERED: {
    labelKey: 'delivered',
    className: 'text-emerald-600',
    icon: CheckCheck,
  },

  CANCELLED: {
    labelKey: 'cancelled',
    className: 'text-maroon-500',
    icon: TriangleAlert,
  },

  REFUNDED: {
    labelKey: 'cancelled',
    className: 'text-red-500',
    icon: TriangleAlert,
  },
} satisfies Record<
  OrderStatus,
  {
    labelKey: string;
    className: string;
    icon: LucideIcon;
  }
>;

export const PAYMENT_ICONS = {
  CASH_ON_DELIVERY: Banknote,
  CREDIT_CARD: CreditCard,
} satisfies Record<PaymentMethod, LucideIcon>;
