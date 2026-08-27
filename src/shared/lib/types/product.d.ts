import { IProduct } from '@/features/products/lib/types';
import { Product } from './product'; // Import your existing product types file

// Generic API wrapper matching the server's response format
export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  payload: T;
}

// Cart Item matching API & components
export interface CartItem {
  id: string; // Cart item UUID
  productId: string;
  product: IProduct;
  quantity: number;
}

// Wishlist Item matching API & components
export interface WishlistItem {
  id: string; // Wishlist item UUID
  productId: string;
  product: IProduct;
}

// Re-export for convenience across the app
export type { Product };