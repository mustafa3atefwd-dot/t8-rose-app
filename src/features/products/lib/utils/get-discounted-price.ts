import { IProduct } from '../types/product';

export function getDiscountedPrice(product: IProduct) {
  if (!product.discountType || !product.discountValue) return null;

  const price = Number(product.price);
  const discountValue = Number(product.discountValue);

  const discounted = product.discountType === 'PERCENT' ? price - (price * discountValue) / 100 : price - discountValue;

  return Math.max(discounted, 0);
}
