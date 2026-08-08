'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSession } from 'next-auth/react';
import { addToWishlistAction, removeFromWishlistAction } from '../actions/wishlist-actions';
import { WishlistItem } from '../lib/types/product';
import { createGuestStore } from '../lib/utils/guest-storage.util';

const GUEST_WISHLIST_KEY = 'guest_wishlist_items';

const guestWishlistStore = createGuestStore<WishlistItem>(GUEST_WISHLIST_KEY);

export function useWishlist() {
  // Session status can resolve before a deferred/streamed subtree (e.g. behind
  // a Suspense boundary) hydrates, so gate it on mount: the hydration render
  // then always matches the server's always-logged-out pass, and only after
  // mount do we trust the live session status.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { status } = useSession();
  const isLoggedIn = mounted && status === 'authenticated';
  const queryClient = useQueryClient();

  // 1. Guest wishlist is read straight from localStorage (an external store),
  // so every consumer of this hook sees the same items.
  const guestWishlist = useSyncExternalStore(
    guestWishlistStore.subscribe,
    guestWishlistStore.getSnapshot,
    guestWishlistStore.getServerSnapshot
  );

  // 2. Fetch Server Wishlist for Authenticated Users
  const { data: serverWishlist = [], isLoading: isWishlistLoading } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch('/api/wishlist');
      if (!res.ok) return [];
      const data = await res.json();
      return data.payload?.wishlistItems || [];
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });

  const wishlistItems = isLoggedIn ? serverWishlist : guestWishlist;

  // 3. Mutations for Authenticated Users
  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlistAction(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (wishlistItemId: string) => removeFromWishlistAction(wishlistItemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const isWishlisted = (productId: string) => wishlistItems.some((item) => item.productId === productId);

  // 4. Unified Toggle Wishlist Handler
  const toggleWishlist = async (productId: string, productDetails?: WishlistItem['product']) => {
    if (isLoggedIn) {
      const existingItem = serverWishlist.find((item) => item.productId === productId);
      if (existingItem) {
        await removeMutation.mutateAsync(existingItem.id);
      } else {
        await addMutation.mutateAsync(productId);
      }
    } else {
      const currentGuestWishlist = guestWishlistStore.read();

      const existingItem = currentGuestWishlist.find((item) => item.productId === productId);
      let updatedGuestWishlist: WishlistItem[];

      if (existingItem) {
        updatedGuestWishlist = currentGuestWishlist.filter((item) => item.productId !== productId);
      } else {
        if (!productDetails) return;

        const newItem: WishlistItem = {
          id: `guest-wish-${Date.now()}`,
          productId,
          product: productDetails,
        };
        updatedGuestWishlist = [...currentGuestWishlist, newItem];
      }

      guestWishlistStore.save(updatedGuestWishlist);
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