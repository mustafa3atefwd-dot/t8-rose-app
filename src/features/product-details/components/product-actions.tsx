import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ProductActionsProps {
  addToCartLabel: string;
  addToWishlistLabel: string;
}

export function ProductActions({ addToCartLabel, addToWishlistLabel }: ProductActionsProps) {
  return (
    <div className="flex gap-3 pt-6">
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label={addToWishlistLabel}
        title={addToWishlistLabel}
        className="h-12 w-12 shrink-0"
      >
        <Heart aria-hidden="true" className="size-5" />
      </Button>

      <Button type="button" className="h-12 flex-1 text-base">
        <ShoppingCart aria-hidden="true" className="size-5" />
        {addToCartLabel}
      </Button>
    </div>
  );
}
