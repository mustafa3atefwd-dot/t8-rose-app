import { IProduct } from '@/features/products/lib/types/product';

export const MOST_POPULAR_PRODUCTS_LIMIT = 12; // 4 cols x 3 rows
export const MOST_POPULAR_OCCASIONS_LIMIT = 100;

export interface IOccasionTab {
  id: string;
  title: string;
  products: IProduct[];
}
