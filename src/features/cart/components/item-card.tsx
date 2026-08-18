'use client';

import { useEffect, useState } from 'react';
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

  // Keep input synchronized with cart quantity
  useEffect(() => {
    setInputQuantity(String(quantity));
  }, [quantity]);

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
    <div className={cn('', !isLast && 'border-b-ds-border-muted mb-4 border-b pb-5')}>
      <div className="flex gap-4">
        {/* Item Image */}
        <div className="relative h-35 w-29.25">
          <Image src={cover!} fill alt={title} className="rounded-ds-lg" />
        </div>

        {/* Item Details */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-ds-text-primary text-lg font-semibold">{title}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <Star className="size-5 fill-[#FFA508] text-[#FFA508]" />

                <span className="text-base font-medium">Rating: {rating.toFixed(1)}/5</span>

                <span className="text-ds-text-info text-base font-medium">({ratings} ratings)</span>
              </div>
            </div>

            {/* Remove */}
            <Button onClick={() => onRemove(id)} variant="destructive">
              <Trash2 />
              {t('remove')}
            </Button>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            {/* Price */}
            <p className="text-sm font-medium">
              <span className="text-maroon-600">(×{quantity})</span> <span className="text-2xl font-bold">{price}</span>{' '}
              EGP
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              {/* Decrease */}
              <Button onClick={handleDecrease} variant="secondary">
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
                className="w-25.75 appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              {/* Increase */}
              <Button disabled={quantity >= product.stock} onClick={handleIncrease} variant="secondary">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
