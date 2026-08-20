import { Check, ChevronDownIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';

import type { IOrderDetails } from '@/features/orders/lib/types/order';
import { useLocale } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { DELIVERY_CONFIG, ORDER_STATUS_CONFIG, PAYMENT_ICONS } from '@/features/orders/lib/constants/order-card.config';
import { formatOrderDate, formatOrderPrice } from '@/features/orders/lib/utils/order-card.utils';
import { OrderItems } from '@/features/orders/components';

interface IOrderCardProps {
  order: IOrderDetails;
}

function OrderCard({ order }: IOrderCardProps) {
  // Locale
  const locale = useLocale();

  // Order Status config
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const deliveryConfig = DELIVERY_CONFIG[order.status];

  // Payment config
  const PaymentIcon = PAYMENT_ICONS[order.paymentMethod];
  const DeliveryIcon = deliveryConfig.icon;

  // Check if order is paid
  const isPaid = order.paymentStatus === 'SUCCEEDED';

  // Format order price
  const totalPrice = formatOrderPrice(order.total, locale);

  // Format order date
  const createdAt = formatOrderDate(order.createdAt, locale);

  return (
    <Collapsible defaultOpen>
      <article className="bg-ds-bg-muted border-ds-border-muted mb-4 overflow-hidden rounded-xl border">
        {/* Order Header */}
        <CollapsibleTrigger className="w-full">
          <header className="bg-ds-bg-primary-saturated text-ds-text-inverse group flex min-h-14 w-full cursor-pointer flex-wrap items-center justify-between gap-4 p-4">
            {/* Order ID */}
            <h2 className="text-start text-lg font-semibold lg:text-xl xl:text-2xl">Order #{order.id}</h2>

            {/* Order Date */}
            <div className="flex items-center gap-3">
              <time dateTime={new Date(order.createdAt).toISOString()} className="text-sm md:text-base">
                Created: <span className="font-semibold">{createdAt}</span>
              </time>

              {/* Expand Icon */}
              <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
          </header>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Order Details */}
          <div className="p-4">
            {/* Price & Status Wrapper */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-3">
              {/* Price */}
              <div className="text-ds-text-plain flex flex-wrap items-center gap-2 text-base md:text-lg lg:text-xl xl:text-2xl">
                <span>Total Price:</span>

                <strong className="font-semibold">
                  {totalPrice.number} {totalPrice.currency}
                </strong>

                {isPaid && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    <Check className="size-3.5" />
                    Paid
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900">Status:</span>

                <span className={cn('rounded-full px-3 py-1 text-xs font-semibold text-white', statusConfig.className)}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            <div className="space-y-2 py-4 md:px-4">
              {/* Order Information */}
              <div className="space-y-2">
                {/* Payment */}
                <div className="flex items-center gap-1.5">
                  <span className="text-ds-text-plain font-semibold">Payment Method:</span>

                  <span className="text-ds-text-soft inline-flex items-center gap-1">
                    <PaymentIcon className="size-4" />

                    {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash' : 'Credit Card'}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-1.5">
                  <span className="text-ds-text-plain font-semibold">Delivery Status:</span>

                  <span className={cn('inline-flex items-center gap-1', deliveryConfig.className)}>
                    <DeliveryIcon className="size-4" />

                    {deliveryConfig.label}
                  </span>
                </div>
              </div>

              {/* Items */}
              <OrderItems orderItems={order.orderItems} totalPrice={totalPrice} />
            </div>
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}

export default OrderCard;
