import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/inputs";
import { CartItem } from "@/shared/lib/types/product";
import { cn } from "@/shared/lib/utils";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  itemCart: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
  isLast: boolean;
};

export default function ItemCard({
  itemCart,
  onRemove,
  onUpdate,
  isLast,
}: Props) {
  const { id, product, quantity } = itemCart;
  const { cover, title, price, rating, ratings } = product;
  const t = useTranslations('cart')
  const handleDecrease = () => {
    if (quantity === 1) return onRemove(id);

    onUpdate(id, quantity - 1);
  };

  const handleIncrease = () => {
    onUpdate(id, quantity + 1);
  };

  return (
    <div
      className={cn(
        "",
        !isLast && "border-b border-b-ds-border-muted mb-4 pb-5"
      )}
    >
      <div className="flex gap-4">
        {/* Item Image */}
        <div className="relative w-29.25 h-35">
          <Image
            src={cover!}
            fill
            alt={title}
            className="rounded-ds-lg"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-ds-text-primary">{title}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <Star className="size-5 text-[#FFA508] fill-[#FFA508]" />
                <span className="font-medium text-base">Rating: {rating}/5</span>
                <span className="font-medium text-base text-ds-text-info">({ratings} ratings)</span>
              </div>
            </div>

            {/* Remove */}
            <Button
              onClick={() => onRemove(id)}
              variant="destructive"
            >
              <Trash2 />
              {t('remove')}
            </Button>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            {/* Price */}
            <p className="font-medium text-sm">
              <span className="text-maroon-600">(×{quantity})</span> <span className="font-bold text-2xl">{price}</span> EGP
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDecrease}
                variant="secondary"
              >
                <Minus />
              </Button>

              <Input
                value={quantity}
                readOnly
                type="number"
                className="w-25.75 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <Button
                onClick={handleIncrease}
                variant="secondary"
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}