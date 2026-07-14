'use client';

import { useQuery } from '@tanstack/react-query';
import { productKeys } from '../lib/constants/query-keys.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { IProductDetail } from '../lib/types/product';

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      const data: IApiResponse<{ product: IProductDetail }> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload?.product;
    },
    enabled: !!id,
  });
}
