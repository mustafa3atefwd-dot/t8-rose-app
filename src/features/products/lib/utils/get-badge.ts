import { IProduct } from '../types/product';

const NEW_THRESHOLD_DAYS = 14;
const HOT_RATINGS_THRESHOLD = 50;

<<<<<<< HEAD
export type ProductBadge = { label: 'new' | 'hot' | 'outOfStock'; variant: 'error' | 'info' | 'warning' };

export function getBadge(product: IProduct): ProductBadge | null {
  if (product.stock <= 0) return { label: 'outOfStock', variant: 'error' };

  const ageInDays = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageInDays <= NEW_THRESHOLD_DAYS) return { label: 'new', variant: 'info' };

  if (product.ratings >= HOT_RATINGS_THRESHOLD) return { label: 'hot', variant: 'warning' };
=======
export type ProductBadge = { label: 'new' | 'hot' | 'outOfStock'; variant: 'new' | 'hot' | 'outOfStock' };

export function getBadge(product: IProduct): ProductBadge | null {
  if (product.stock <= 0) return { label: 'outOfStock', variant: 'outOfStock' };

  const ageInDays = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageInDays <= NEW_THRESHOLD_DAYS) return { label: 'new', variant: 'new' };

  if (product.ratings >= HOT_RATINGS_THRESHOLD) return { label: 'hot', variant: 'hot' };
>>>>>>> sprint/products-page

  return null;
}
