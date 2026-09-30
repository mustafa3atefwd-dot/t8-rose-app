'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { IProduct } from '@/features/products/lib/types';
import { useWishlist } from '@/shared/hooks/use-wishlist';

interface WishlistContextValue {
  products: IProduct[];
  count: number;
  isLoading: boolean;
  isError: boolean;
  removeProduct: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  retry: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { wishlistItems, toggleWishlist, isLoading, isError, retry } = useWishlist();
  const products = useMemo(
    () => wishlistItems.flatMap((item) => (item.product && !item.product.deletedAt ? [item.product] : [])),
    [wishlistItems]
  );

  const removeProduct = useCallback(
    async (productId: string) => {
      const item = wishlistItems.find((wishlistItem) => wishlistItem.productId === productId);
      if (!item) return;

      await toggleWishlist(productId, item.product);
    },
    [toggleWishlist, wishlistItems]
  );

  const clearWishlist = useCallback(async () => {
    for (const item of wishlistItems) {
      await toggleWishlist(item.productId, item.product);
    }
  }, [toggleWishlist, wishlistItems]);

  const value = useMemo(
    () => ({
      products,
      count: products.length,
      isLoading,
      isError,
      removeProduct,
      clearWishlist,
      retry: () => void retry(),
    }),
    [clearWishlist, isError, isLoading, products, removeProduct, retry]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlistPage() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlistPage must be used inside WishlistProvider');
  }

  return context;
}
