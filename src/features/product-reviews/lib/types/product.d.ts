/**
 * Types for GET https://rose-app.elevate-bootcamp.cloud/api/products/{id}
 */

export type DiscountType = 'PERCENT' | 'FIXED' | (string & {});

export interface ProductResponse {
  status: boolean;
  code: number;
  payload: {
    product: Product;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: DiscountType;
  discountValue: string;
  cover: string;
  /** NOTE: `gallery` is a JSON-stringified array of image URL strings.
   *  Use JSON.parse(product.gallery) to get a string[]. */
  gallery: string;
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  subCategory: SubCategory;
  occasions: unknown[];
  reviews: Review[];
  _count: ProductCount;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

export interface ReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
}