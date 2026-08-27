import type { IPaginationMeta } from '@/features/products/lib/types/product';

export interface ICouponsQuery {
  search: string;
  isActive: boolean;
}

export interface ICoupon {
  id: string;
  code: string;
  /** Numeric string, e.g. "10" — the backend serializes decimal fields as strings. */
  value: string;
  type: 'PERCENT' | 'FIXED';
  minPurchase: string;
  maxDiscount: string;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedCoupons {
  data: ICoupon[];
  metadata: IPaginationMeta;
}
