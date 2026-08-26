import type { IProduct, IPaginatedProducts } from '@/features/products/lib/types';
import type { IApiResponse, ISuccessResponse } from '@/shared/lib/types/api';

export type AdminProductsResponse = IApiResponse<IPaginatedProducts>;

export interface AdminProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

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

/** `apiRequest` throws on a failed response, so a resolved body is always the success shape. */
export type ProductMutationResponse = ISuccessResponse<{ product: IProduct }>;

/** Mutations that resolve without a payload, e.g. delete and restore. */
export type ProductAckResponse = ISuccessResponse;

/**
 * Next.js redacts a thrown Server Action error's message in production, so the
 * product mutations resolve to this result instead of throwing. The caller reads
 * `message` for the backend's own validation text and falls back to a translated
 * string when there is none.
 */
export type ProductActionResult<TPayload = void> =
  | { status: true; payload: TPayload }
  | { status: false; message: string };
