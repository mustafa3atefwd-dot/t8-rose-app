'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addToCartAction, updateCartQuantityAction } from '../actions/cart-actions';
import { CartItem } from '../lib/types/product';

const GUEST_CART_KEY = 'guest_cart_items';

export function useCart() {
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const queryClient = useQueryClient();

  const [guestCart, setGuestCart] = useState<CartItem[]>([]);

  // 1. Initialize guest cart state from localStorage
  useEffect(() => {
    if (!isLoggedIn) {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (stored) {
        try {
          setGuestCart(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse guest cart:', error);
          setGuestCart([]);
        }
      }
    }
  }, [isLoggedIn]);

  const saveGuestCart = (items: CartItem[]) => {
    setGuestCart(items);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  };

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
      let currentGuestCart: CartItem[] = [];
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (stored) {
        try {
          currentGuestCart = JSON.parse(stored);
        } catch {
          currentGuestCart = [];
        }
      }

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