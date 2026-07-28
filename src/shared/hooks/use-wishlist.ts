'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { getWishlistAction, addToWishlistAction, removeFromWishlistAction } from '../actions/wishlist-actions';
import { WishlistItem } from '../lib/types/product';
import { Product } from '@/features/product-reviews/lib/types/product';

const GUEST_WISHLIST_KEY = 'guest_wishlist_items';

export function useWishlist(isLoggedIn: boolean) {
  const queryClient = useQueryClient();
  const [guestWishlist, setGuestWishlist] = useState<WishlistItem[]>([]);

  // 1. Initialize Guest Wishlist from LocalStorage
  useEffect(() => {
    if (!isLoggedIn) {
      const stored = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setGuestWishlist(parsed);
        } catch (error) {
          setGuestWishlist([]);
        }
      }
    }
  }, [isLoggedIn]);

  const saveGuestWishlist = (items: WishlistItem[]) => {
    setGuestWishlist(items);
    localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
  };

  // 2. Fetch Server Wishlist via Server Action
  const { data: serverWishlist = [], isLoading: isWishlistLoading } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: () => getWishlistAction(),
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Automatically switch between server data or guest local data
  const wishlistItems = isLoggedIn ? serverWishlist : guestWishlist;

  // 3. Sync Guest Wishlist to Server upon Login safely
  const syncGuestWishlist = useCallback(async () => {
    const stored = localStorage.getItem(GUEST_WISHLIST_KEY);
    if (!stored) return;

    try {
      const itemsToSync: WishlistItem[] = JSON.parse(stored);
      if (itemsToSync.length === 0) return;
      localStorage.removeItem(GUEST_WISHLIST_KEY);
      setGuestWishlist([]);

      for (const item of itemsToSync) {
        try {
          await addToWishlistAction(item.productId);
        } catch (itemError) {
          console.error(`❌ [Guest Sync] Failed to sync wishlist item (${item.productId}):`, itemError);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    } catch (error) {
      console.error('❌ [Guest Sync Error]:', error);
    }
  }, [queryClient]);

  // Run sync safely when user transitions to logged in
  useEffect(() => {
    if (isLoggedIn) {
      syncGuestWishlist();
    }
  }, [isLoggedIn, syncGuestWishlist]);

  // 4. Server Actions Mutations
  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlistAction(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (wishlistItemId: string) => removeFromWishlistAction(wishlistItemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const isWishlisted = (productId: string) => wishlistItems.some((item) => item.productId === productId);

  // 5. Unified Toggle Wishlist Function
  const toggleWishlist = async (productId: string, productDetails?: Product) => {
    const existingItem = wishlistItems.find((item) => item.productId === productId);

    if (isLoggedIn) {
      if (existingItem) {
        await removeMutation.mutateAsync(existingItem.id);
      } else {
        await addMutation.mutateAsync(productId);
      }
    } else {
      // Guest Logic
      let updatedGuestWishlist: WishlistItem[];

      if (existingItem) {
        // Remove item if it already exists
        updatedGuestWishlist = guestWishlist.filter((item) => item.productId !== productId);
      } else {
        // Add new item
        const newItem: WishlistItem = {
          id: `guest-wish-${Date.now()}`,
          productId,
          product: productDetails as any,
        };
        updatedGuestWishlist = [...guestWishlist, newItem];
      }

      saveGuestWishlist(updatedGuestWishlist);
    }
  };

  return {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    uniqueItemsCount: wishlistItems.length,
    isLoading: isWishlistLoading || addMutation.isPending || removeMutation.isPending,
  };
}
