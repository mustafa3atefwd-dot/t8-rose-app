'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { getCartAction, addToCartAction, updateCartQuantityAction } from '../actions/cart-actions';
import { CartItem } from '../lib/types/product';
import { Product } from '@/features/product-reviews/lib/types/product';

const GUEST_CART_KEY = 'guest_cart_items';

export function useCart(isLoggedIn: boolean) {
  const queryClient = useQueryClient();
  const [guestCart, setGuestCart] = useState<CartItem[]>([]);

  // 1. Initialize Guest Cart from LocalStorage
  useEffect(() => {
    if (!isLoggedIn) {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setGuestCart(parsed);
        } catch (error) {
          setGuestCart([]);
        }
      }
    }
  }, [isLoggedIn]);

  const saveGuestCart = (items: CartItem[]) => {
    setGuestCart(items);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  };

  // 2. Query Server Cart via Server Action
  const { data: serverCart = [], isLoading: isCartLoading } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const data = await getCartAction();
      return data;
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });

  const cartItems = isLoggedIn ? serverCart : guestCart;

  // 3. Sync Guest Cart to Server upon Login safely
  const syncGuestCart = useCallback(async () => {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    if (!stored) return;

    try {
      const itemsToSync: CartItem[] = JSON.parse(stored);
      if (itemsToSync.length === 0) return;

      localStorage.removeItem(GUEST_CART_KEY);
      setGuestCart([]);

      for (const item of itemsToSync) {
        try {
          await addToCartAction(item.productId, item.quantity);
        } catch (itemError) {
          console.error(`❌ [Guest Sync] Failed to sync item (${item.productId}):`, itemError);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      console.error('❌ [Guest Sync Error]:', error);
    }
  }, [queryClient]);

  // Run sync safely when user transitions to logged in
  useEffect(() => {
    if (isLoggedIn) {
      syncGuestCart();
    }
  }, [isLoggedIn, syncGuestCart]);

  // 4. Server Actions Mutations
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => {
      return addToCartAction(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ [Mutation - Add Error] Failed to add item:', error);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      return updateCartQuantityAction(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ [Mutation - Update Error] Failed to update quantity:', error);
    },
  });

  // 5. Main Unified Add To Cart Function
  const addToCart = async (productId: string, quantityToAdd = 1, productDetails?: Product) => {
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (isLoggedIn) {
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;
        await updateQuantityMutation.mutateAsync({ id: existingItem.id, quantity: newQuantity });
      } else {
        await addToCartMutation.mutateAsync({ productId, quantity: quantityToAdd });
      }
    } else {
      let updatedGuestCart: CartItem[];
      if (existingItem) {
        updatedGuestCart = guestCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      } else {
        const newItem: CartItem = {
          id: `guest-${Date.now()}`,
          productId,
          product: productDetails!,
          quantity: quantityToAdd,
        };
        updatedGuestCart = [...guestCart, newItem];
      }
      saveGuestCart(updatedGuestCart);
    }
  };

  return {
    cartItems,
    addToCart,
    uniqueItemsCount: cartItems.length,
    isLoading: isCartLoading || addToCartMutation.isPending || updateQuantityMutation.isPending,
  };
}
