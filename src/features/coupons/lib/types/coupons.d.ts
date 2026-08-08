export interface CouponsQuery{
    isActive: boolean,
    search: string
}

export interface Coupons{
    id: string;
    code: string;
    type: string;
    value: string;
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


export interface CouponsResponse {
    status: boolean;
    code: number;
    payload: {
      data: Coupon[];
      metadata: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    };
  }