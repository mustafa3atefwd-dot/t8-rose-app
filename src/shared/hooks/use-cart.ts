'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSession } from 'next-auth/react';
import { addToCartAction, removeCartAction, removeFromCartAction, updateCartQuantityAction } from '../actions/cart-actions';
import { CartItem } from '../lib/types/product';
import { createGuestStore } from '../lib/utils/guest-storage.util';

const GUEST_CART_KEY = 'guest_cart_items';

const guestCartStore = createGuestStore<CartItem>(GUEST_CART_KEY);

export function useCart() {
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

  // 1. Guest cart is read straight from localStorage (an external store), so
  // every consumer of this hook sees the same items.
  const guestCart = useSyncExternalStore(
    guestCartStore.subscribe,
    guestCartStore.getSnapshot,
    guestCartStore.getServerSnapshot
  );

  // 2. Fetch Server Cart for Authenticated Users
  const { data: serverCart = [], isLoading: isCartLoading } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart');
      if (!res.ok) return [];
      const data = await res.json();
      return data.payload?.cartItems || data.payload || [];
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });

  const cartItems = isLoggedIn ? serverCart : guestCart;

  // 3. Server Action Mutations
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => {
      return addToCartAction(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      return updateCartQuantityAction(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

    const removeCartMutation = useMutation({
    mutationFn: () => {
      return removeCartAction();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

    const removeFromCartMutation = useMutation({
    mutationFn: ({ id }: { id: string; }) => {
      return removeFromCartAction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // 4. Unified Add To Cart Handler
  const addToCart = async (productId: string, quantityToAdd = 1, productDetails?: CartItem['product']) => {
    if (isLoggedIn) {
      const existingItem = serverCart.find((item) => item.productId === productId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;
        await updateQuantityMutation.mutateAsync({ id: existingItem.id, quantity: newQuantity });
      } else {
        await addToCartMutation.mutateAsync({ productId, quantity: quantityToAdd });
      }
    } else {
      const currentGuestCart = guestCartStore.read();

      const existingItem = currentGuestCart.find((item) => item.productId === productId);
      let updatedGuestCart: CartItem[];

      if (existingItem) {
        updatedGuestCart = currentGuestCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      } else {
        if (!productDetails) return;

        const newItem: CartItem = {
          id: `guest-${Date.now()}`,
          productId,
          product: productDetails,
          quantity: quantityToAdd,
        };
        updatedGuestCart = [...currentGuestCart, newItem];
      }

      guestCartStore.save(updatedGuestCart);
    }
  };

  // Unified Remove Item
const removeFromCart = async (id: string) => {
  if (isLoggedIn) {
    await removeFromCartMutation.mutateAsync({ id });
    return;
  }

  const currentGuestCart = guestCartStore.read();

  const updatedGuestCart = currentGuestCart.filter(
    (item) => item.id !== id
  );

  guestCartStore.save(updatedGuestCart);
};

// Unified Update Quantity
const updateQuantity = async (
  id: string,
  quantity: number
) => {
  if (quantity <= 0) {
    return removeFromCart(id);
  }

  if (isLoggedIn) {
    await updateQuantityMutation.mutateAsync({
      id,
      quantity,
    });

    return;
  }

  const currentGuestCart = guestCartStore.read();

  const updatedGuestCart = currentGuestCart.map((item) =>
    item.id === id
      ? { ...item, quantity }
      : item
  );

  guestCartStore.save(updatedGuestCart);
};

// Unified Clear Cart
const clearCart = async () => {
  if (isLoggedIn) {
    await removeCartMutation.mutateAsync();
    return;
  }

  guestCartStore.save([]);
};

  return {
    removeCartMutation,
    removeFromCartMutation,
    updateQuantityMutation,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItems,
    addToCart,
    uniqueItemsCount: cartItems.length,
    isLoading: isCartLoading || addToCartMutation.isPending || updateQuantityMutation.isPending,
  };
}