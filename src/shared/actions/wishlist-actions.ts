'use server';

import { ApiResponse, WishlistItem } from '../lib/types/product';
import { getNextAuthToken } from '../lib/utils/auth.util';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rose-app.elevate-bootcamp.cloud/api';

/**
 * Fetch wishlist items for authenticated user
 */
export async function getWishlistAction(): Promise<WishlistItem[]> {
  const token = await getNextAuthToken();
  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch wishlist');
  }

  return data.payload?.wishlistItems || data.payload || [];
}

/**
 * Add product to wishlist
 */
export async function addToWishlistAction(productId: string): Promise<ApiResponse<WishlistItem>> {
  const token = await getNextAuthToken();
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to add product to wishlist');
  }

  return data;
}

/**
 * Remove product from wishlist
 */
export async function removeFromWishlistAction(wishlistItemId: string): Promise<ApiResponse<void>> {
  const token = await getNextAuthToken();
  const res = await fetch(`${BASE_URL}/wishlist/${wishlistItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to remove product from wishlist');
  }

  return data;
}
