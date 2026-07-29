import { IDocumentFields } from '@/shared/lib/types/base';
import { ProductSortBy, SortOrder } from '../constants/product.constant';

export const PRODUCT_DISCOUNT_TYPES = {
  percent: 'PERCENT',
  fixed: 'FIXED',
} as const;

export type ProductDiscountType = (typeof PRODUCT_DISCOUNT_TYPES)[keyof typeof PRODUCT_DISCOUNT_TYPES];

/** Lean relation shape returned for `category`/`subCategory` on list items. */
export interface ICategorySummary {
  id: string;
  title: string;
}

export interface IProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
}

export interface IProduct extends IDocumentFields {
  id: string;
  title: string;
  description: string | null;
  rating: number;
  ratings: number;
  stock: number;
  /** Numeric string, e.g. "25" — the backend serializes decimal fields as strings. */
  price: string;
  discountType: ProductDiscountType | null;
  /** Numeric string, e.g. "10" — same decimal-as-string serialization as `price`. */
  discountValue: string | null;
  cover: string | null;
  /** Raw JSON-encoded array of image URLs — parse with `JSON.parse` before use. */
  gallery: string;
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  deletedAt: string | null;
  category: ICategorySummary;
  subCategory: ICategorySummary | null;
  /** Shape unobserved so far — every sample response has an empty array. */
  occasions: unknown[];
  _count: IProductCount;
}

export interface IProductReview {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

/** `GET /products/{id}` returns the list shape plus `reviews` — list items don't include reviews. */
export interface IProductDetail extends IProduct {
  reviews: IProductReview[];
}

export interface IProductsQueryParams {
  page?: number;
  limit?: number;
  occasionId?: string;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  categoryId?: string;
  subCategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedProducts {
  data: IProduct[];
  metadata: IPaginationMeta;
}
