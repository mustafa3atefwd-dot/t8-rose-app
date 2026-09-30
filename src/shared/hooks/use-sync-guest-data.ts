'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { addToCartAction } from '../actions/cart-actions';
import { addToWishlistAction } from '../actions/wishlist-actions';
import { CartItem, WishlistItem } from '../lib/types/product';

const GUEST_CART_KEY = 'guest_cart_items';
const GUEST_WISHLIST_KEY = 'guest_wishlist_items';

export function useSyncGuestData() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session || hasSynced.current) {
      return;
    }

    const syncGuestData = async () => {
      hasSynced.current = true;

      // 1. Sync Guest Cart
      const rawGuestCart = localStorage.getItem(GUEST_CART_KEY);
      if (rawGuestCart) {
        try {
          const guestCart: CartItem[] = JSON.parse(rawGuestCart);

          if (guestCart.length > 0) {
            const cartResults = await Promise.allSettled(
              guestCart.map((item) => addToCartAction(item.productId, item.quantity))
            );

            const remainingCartItems = guestCart.filter(
              (_, index) => cartResults[index].status === 'rejected'
            );

            if (remainingCartItems.length === 0) {
              localStorage.removeItem(GUEST_CART_KEY);
            } else {
              localStorage.setItem(GUEST_CART_KEY, JSON.stringify(remainingCartItems));
            }

            await queryClient.invalidateQueries({ queryKey: ['cart'] });
          }
        } catch (error) {
          console.error('Failed to sync guest cart:', error);
        }
      }

      // 2. Sync Guest Wishlist
      const rawGuestWishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (rawGuestWishlist) {
        try {
          const guestWishlist: WishlistItem[] = JSON.parse(rawGuestWishlist);

          if (guestWishlist.length > 0) {
            const wishlistResults = await Promise.allSettled(
              guestWishlist.map((item) => addToWishlistAction(item.productId))
            );

            const remainingWishlistItems = guestWishlist.filter(
              (_, index) => wishlistResults[index].status === 'rejected'
            );

            if (remainingWishlistItems.length === 0) {
              localStorage.removeItem(GUEST_WISHLIST_KEY);
            } else {
              localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(remainingWishlistItems));
            }

            await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
          }
        } catch (error) {
          console.error('Failed to sync guest wishlist:', error);
        }
      }
    };

    syncGuestData();
  }, [status, session, queryClient]);
}