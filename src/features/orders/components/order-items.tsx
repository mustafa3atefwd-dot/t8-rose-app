'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { ImageWithSkeleton } from '@/shared/components';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import type { IOrderDetails } from '@/features/orders/lib/types/order';
import { formatOrderNumber } from '../lib/utils/order-card.utils';

interface IOrderItemsProps {
  orderItems: IOrderDetails['orderItems'];

  totalPrice: {
    number: string;
    currency: string;
  };

  locale: string;
}

function OrderItems({ orderItems, totalPrice, locale }: IOrderItemsProps) {
  // State
  const [showAllOrderItems, setShowAllOrderItems] = useState(false);

  // Translations
  const t = useTranslations('orders.items');

  return (
    <div className="pt-2">
      {/* Order Items Header */}
      <div className="text-ds-text-plain flex items-center justify-between py-2">
        <span className="font-semibold">{t('title', { count: orderItems.length })}</span>
      </div>

      {/* Order Items List */}
      <div className="relative">
        <div
          className={cn(
            'bg-ds-bg-plain grid grid-cols-1 gap-2 overflow-y-hidden rounded-lg p-4 md:grid-cols-2',
            showAllOrderItems ? 'max-h-none' : 'max-h-75'
          )}
        >
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-2.5 overflow-hidden rounded-lg">
              {/* Item Image */}
              <div className="relative h-25 w-25 shrink-0 md:h-35.5 md:w-29">
                <ImageWithSkeleton src={item.product.cover ?? ''} alt={item.product.title} fill />
              </div>

              {/* Item Details */}
              <div className="flex flex-col justify-between gap-1 py-2">
                {/* Item Title */}
                <h3 className="text-ds-text-primary text-base font-semibold md:text-lg">{item.product.title}</h3>

                {/* Item Rating */}
                {item.product.rating > 0 && (
                  <div className="inline-flex items-center gap-1">
                    <Star className="size-4 text-[#ffa508]" />

                    <span className="text-ds-text-plain">{t('rating', { rating: item.product.rating })}</span>

                    <span className="text-ds-text-info">({item.product.ratings})</span>
                  </div>
                )}

                {/* Item Price with Quantity */}
                <p className="text-ds-text-primary/90 mb-2 flex items-center gap-1 text-sm">
                  <span>(×{formatOrderNumber(item.quantity, locale)})</span>

                  <span className="text-ds-text-plain text-base md:text-lg lg:text-xl xl:text-2xl">
                    <strong className="font-bold">{totalPrice.number}</strong>{' '}
                    <span className="text-base font-normal">{totalPrice.currency}</span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        {orderItems.length > 4 && !showAllOrderItems && (
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0 flex justify-center',
              'rounded-b-lg pt-8 pb-2',
              'from-ds-bg-plain via-ds-bg-plain/90 bg-linear-to-t to-transparent'
            )}
          >
            <button
              type="button"
              onClick={() => setShowAllOrderItems(true)}
              className="text-ds-text-primary hover:text-ds-text-primary/90 flex cursor-pointer flex-col items-center gap-0.5 font-medium transition-colors"
            >
              {t('showAll')}
              <ChevronDown className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* Show Less Button */}
      {orderItems.length > 4 && showAllOrderItems && (
        <button
          type="button"
          onClick={() => setShowAllOrderItems(false)}
          className="text-ds-text-primary hover:text-ds-text-primary/90 mx-auto mt-2 flex cursor-pointer flex-col items-center gap-0.5 font-medium transition-colors"
        >
          {t('showLess')}
          <ChevronUp className="size-5" />
        </button>
      )}
    </div>
  );
}

export default OrderItems;
