import { Banknote, CheckCheck, CreditCard, TriangleAlert, Truck, type LucideIcon } from 'lucide-react';
import type { DeliveryStatus, OrderStatus, PaymentMethod } from '@/features/orders/lib/types';

export const ORDER_STATUS_CONFIG = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-500',
  },

  PROCESSING: {
    label: 'In Progress',
    className: 'bg-blue-500',
  },

  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-green-500',
  },

  SHIPPED: {
    label: 'Shipped',
    className: 'bg-purple-500',
  },

  DELIVERED: {
    label: 'Done',
    className: 'bg-emerald-500',
  },

  CANCELLED: {
    label: 'Canceled',
    className: 'bg-red-600',
  },

  REFUNDED: {
    label: 'Refunded',
    className: 'bg-orange-600',
  },
} satisfies Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
>;

export const DELIVERY_CONFIG = {
  PENDING: {
    label: 'Pending',
    className: 'text-amber-500',
    icon: Truck,
  },

  PROCESSING: {
    label: 'In Progress',
    className: 'text-blue-500',
    icon: Truck,
  },

  SHIPPED: {
    label: 'Shipped',
    className: 'text-purple-500',
    icon: Truck,
  },

  DELIVERED: {
    label: 'Delivered',
    className: 'text-emerald-600',
    icon: CheckCheck,
  },

  CANCELLED: {
    label: 'Canceled',
    className: 'text-maroon-500',
    icon: TriangleAlert,
  },
} satisfies Record<
  DeliveryStatus,
  {
    label: string;
    className: string;
    icon: LucideIcon;
  }
>;

export const PAYMENT_ICONS = {
  CASH_ON_DELIVERY: Banknote,
  CREDIT_CARD: CreditCard,
} satisfies Record<PaymentMethod, LucideIcon>;
