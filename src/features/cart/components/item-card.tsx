'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs';
import { CartItem } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { Minus, Plus, Star, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  itemCart: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
  isLast: boolean;
};

export default function ItemCard({ itemCart, onRemove, onUpdate, isLast }: Props) {
  const { id, product, quantity } = itemCart;
  const { cover, title, price, rating, ratings } = product;
  // Translations
  const t = useTranslations('cart');
  // state
  const [inputQuantity, setInputQuantity] = useState(String(quantity));
  const [syncedQuantity, setSyncedQuantity] = useState(quantity);

  // Keep input synchronized with cart quantity
  if (quantity !== syncedQuantity) {
    setSyncedQuantity(quantity);
    setInputQuantity(String(quantity));
  }

  const handleDecrease = () => {
    if (quantity === 1) {
      return onRemove(id);
    }

    onUpdate(id, quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= product.stock) return;

    onUpdate(id, quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuantity(e.target.value);
  };

  const handleQuantityBlur = () => {
    const value = Number(inputQuantity);

    // Invalid or empty value
    if (!value || value < 1) {
      setInputQuantity(String(quantity));
      return;
    }

    // Prevent quantity from exceeding stock
    const newQuantity = Math.min(value, product.stock);

    setInputQuantity(String(newQuantity));

    // Only update if the quantity actually changed
    if (newQuantity !== quantity) {
      onUpdate(id, newQuantity);
    }
  };

  return (
    <article className={cn('', !isLast && 'border-b-ds-border-muted mb-4 border-b pb-4 sm:pb-5')}>
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[7.3125rem_minmax(0,1fr)] sm:gap-4">
        {/* Item Image */}
        <div className="bg-ds-bg-muted relative aspect-[4/5] w-full overflow-hidden rounded-lg sm:h-35 sm:w-29.25">
          {cover && <Image src={cover} fill alt={title} className="object-cover" />}
        </div>

        {/* Item Details */}
        <div className="flex min-w-0 flex-col justify-between gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-ds-text-primary line-clamp-2 text-sm font-semibold sm:text-lg">{title}</h3>

              {/* Rating */}
              <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-1.5">
                <Star className="size-4 fill-[#FFA508] text-[#FFA508] sm:size-5" />

                <span className="text-xs font-medium sm:text-base">{rating.toFixed(1)}/5</span>

                <span className="text-ds-text-info hidden text-xs font-medium sm:inline sm:text-base">
                  ({ratings} ratings)
                </span>
              </div>
            </div>

            {/* Remove */}
            <Button
              onClick={() => onRemove(id)}
              variant="ghost"
              size="icon-sm"
              className="text-ds-text-danger shrink-0 sm:h-9 sm:w-auto sm:px-3"
            >
              <Trash2 />
              <span className="sr-only sm:not-sr-only">{t('remove')}</span>
            </Button>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
            {/* Price */}
            <p className="text-xs font-medium sm:text-sm">
              <span className="text-maroon-600">(×{quantity})</span>{' '}
              <span className="text-lg font-bold sm:text-2xl">{price}</span> EGP
            </p>

            {/* Quantity */}
            <div className="flex w-full items-center gap-1.5 sm:w-auto sm:gap-2">
              {/* Decrease */}
              <Button onClick={handleDecrease} variant="secondary" size="icon-sm" className="size-8 sm:size-10">
                <Minus />
              </Button>

              {/* Quantity Input */}
              <Input
                type="number"
                value={inputQuantity}
                min={1}
                max={product.stock}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                className="h-8 min-w-0 flex-1 appearance-none text-center sm:h-10 sm:w-20 sm:flex-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              {/* Increase */}
              <Button
                disabled={quantity >= product.stock}
                onClick={handleIncrease}
                variant="secondary"
                size="icon-sm"
                className="size-8 sm:size-10"
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
