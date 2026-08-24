import type { IProduct, IPaginatedProducts } from '@/features/products/lib/types';
import type { IApiResponse } from '@/shared/lib/types/api';

export type AdminProductsResponse = IApiResponse<IPaginatedProducts>;

export interface ProductMutationInput {
  title: string;
  description: string;
  stock: number;
  price: number;
  discountType: 'PERCENT' | 'FIXED' | null;
  discountValue: number | null;
  categoryId: string;
  cover: string | null;
  gallery: string[];
}

export interface ProductFormOption {
  id: string;
  title: string;
}

export type ProductMutationResponse = IApiResponse<{ product: IProduct }>;
