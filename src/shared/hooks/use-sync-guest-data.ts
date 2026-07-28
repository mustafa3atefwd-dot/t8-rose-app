'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { addToCartAction } from '../actions/cart-actions';
import { addToWishlistAction } from '../actions/wishlist-actions';

interface GuestCartItem {
  productId: string;
  quantity: number;
}

export function useSyncGuestData() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only run if user is authenticated and hasn't synced in this session lifecycle
    if (status !== 'authenticated' || !session || hasSynced.current) {
      return;
    }

    const syncGuestData = async () => {
      hasSynced.current = true; // Guard against duplicate execution

      try {
        //  Sync Guest Cart
        const rawGuestCart = localStorage.getItem('guest_cart');
        if (rawGuestCart) {
          const guestCart: GuestCartItem[] = JSON.parse(rawGuestCart);

          if (guestCart.length > 0) {
            await Promise.all(guestCart.map((item) => addToCartAction(item.productId, item.quantity)));
            localStorage.removeItem('guest_cart');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
          }
        }

        // 2. Sync Guest Wishlist
        const rawGuestWishlist = localStorage.getItem('guest_wishlist');
        if (rawGuestWishlist) {
          const guestWishlist: string[] = JSON.parse(rawGuestWishlist); // List of product IDs

          if (guestWishlist.length > 0) {
            await Promise.all(guestWishlist.map((productId) => addToWishlistAction(productId)));
            localStorage.removeItem('guest_wishlist');
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
          }
        }
      } catch (error) {
        console.error('❌ Error syncing guest data on login:', error);
      }
    };

    syncGuestData();
  }, [status, session, queryClient]);
}
