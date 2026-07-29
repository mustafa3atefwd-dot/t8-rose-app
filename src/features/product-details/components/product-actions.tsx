'use client';

import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/shared/hooks/use-cart';
import { useWishlist } from '@/shared/hooks/use-wishlist';
import type { IProductDetail } from '@/features/products/lib/types/product';

interface ProductActionsProps {
  productId: string;
  addToCartLabel: string;
  addToWishlistLabel: string;
  product?: IProductDetail;
}

export function ProductActions({ productId, addToCartLabel, addToWishlistLabel, product }: ProductActionsProps) {
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { toggleWishlist, isWishlisted, isLoading: isWishlistLoading } = useWishlist();

  const activeWishlist = isWishlisted(productId);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(productId, 1, product);
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
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
          className={`size-5 transition-colors ${activeWishlist ? 'fill-red-500 text-red-500' : ''}`}
        />
      </Button>

      {/* Add to Cart Button */}
      <Button type="button" className="h-12 flex-1 text-base" onClick={handleAddToCart} disabled={isCartLoading}>
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
