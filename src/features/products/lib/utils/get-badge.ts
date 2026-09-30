import { IProduct } from '../types/product';

const NEW_THRESHOLD_DAYS = 14;
const HOT_RATINGS_THRESHOLD = 50;

export type ProductBadge = { label: 'new' | 'hot' | 'outOfStock'; variant: 'new' | 'hot' | 'outOfStock' };

export function getBadge(product: IProduct): ProductBadge | null {
  if (product.stock <= 0) return { label: 'outOfStock', variant: 'outOfStock' };

  const ageInDays = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageInDays <= NEW_THRESHOLD_DAYS) return { label: 'new', variant: 'new' };

  if (product.ratings >= HOT_RATINGS_THRESHOLD) return { label: 'hot', variant: 'hot' };

  return null;
}
