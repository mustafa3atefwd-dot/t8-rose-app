'use client';

import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

import { Product } from '@/features/product-reviews/lib/types/product';
import { useCart } from '@/shared/hooks/use-cart';
import { useWishlist } from '@/shared/hooks/use-wishlist';

interface ProductActionsProps {
  productId: string;
  isLoggedIn: boolean;
  addToCartLabel: string;
  addToWishlistLabel: string;
  product?: Product; // Needed for guest mode details
}

export function ProductActions({
  productId,
  isLoggedIn,
  addToCartLabel,
  addToWishlistLabel,
  product,
}: ProductActionsProps) {
  const { addToCart, isLoading: isCartLoading } = useCart(isLoggedIn);
  const { toggleWishlist, isWishlisted, isLoading: isWishlistLoading } = useWishlist(isLoggedIn);

  const activeWishlist = isWishlisted(productId);

  const handleAddToCart = async () => {
    await addToCart(productId, 1, product);
  };

  const handleToggleWishlist = async () => {
    await toggleWishlist(productId, product);
  };

  return (
    <div className="flex gap-3 pt-6">
      {/* Wishlist Button */}
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label={addToWishlistLabel}
        title={addToWishlistLabel}
        className="h-12 w-12 shrink-0"
        onClick={handleToggleWishlist}
        disabled={isWishlistLoading}
      >
        <Heart
          aria-hidden="true"
          className={`size-5 transition-colors ${
            activeWishlist ? 'fill-red-500 text-red-500' : ''
          }`}
        />
      </Button>

      {/* Add to Cart Button */}
      <Button
        type="button"
        className="h-12 flex-1 text-base"
        onClick={handleAddToCart}
        disabled={isCartLoading}
      >
        {isCartLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <ShoppingCart aria-hidden="true" className="size-5" />
        )}
        {addToCartLabel}
      </Button>
    </div>
  );
}