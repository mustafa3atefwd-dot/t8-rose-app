'use server';

import { ApiResponse, CartItem } from '../lib/types/product';
import { getNextAuthToken } from '../lib/utils/auth.util';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rose-app.elevate-bootcamp.cloud/api';

/**
 * Fetch cart items for the authenticated user
 */
export async function getCartAction(): Promise<CartItem[]> {
  const token = await getNextAuthToken();
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch cart');
  }

  return data.payload?.cartItems || data.payload || [];
}

/**
 * Add item to cart
 */
export async function addToCartAction(productId: string, quantity: number): Promise<ApiResponse<CartItem>> {
  const token = await getNextAuthToken();

  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to add item to cart');
  }

  return data;
}

/**
 * Update cart item quantity
 */
export async function updateCartQuantityAction(id: string, quantity: number): Promise<ApiResponse<CartItem>> {
  const token = await getNextAuthToken();
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to update cart item quantity');
  }

  return data;
}

/**
 * Remove item from cart
 */
export async function removeFromCartAction(id: string): Promise<ApiResponse<void>> {
  const token = await getNextAuthToken();

  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to remove item from cart');
  }

  return data;
}
