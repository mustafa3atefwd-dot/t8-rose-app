import { IDocumentFields } from '@/shared/lib/types/base';
import { ProductSortBy, SortOrder } from '../constants/product.constant';

export const PRODUCT_DISCOUNT_TYPES = {
  percent: 'PERCENT',
  fixed: 'FIXED',
} as const;

export type ProductDiscountType = (typeof PRODUCT_DISCOUNT_TYPES)[keyof typeof PRODUCT_DISCOUNT_TYPES];

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
  price: string;
  discountType: ProductDiscountType | null;
  discountValue: string | null;
  cover: string | null;
  gallery: string;
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  deletedAt: string | null;
  category: ICategorySummary;
  subCategory: ICategorySummary | null;
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

export interface IProductDetail extends IProduct {
  reviews: IProductReview[];
}

export interface IProductsQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  occasionId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
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
