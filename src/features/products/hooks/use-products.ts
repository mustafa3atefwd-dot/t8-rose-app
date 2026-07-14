'use client';

import { useQuery } from '@tanstack/react-query';
import { productKeys } from '../lib/constants/query-keys.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { IPaginatedProducts, IProductsQueryParams } from '../lib/types/product';

interface UseProductsOptions {
  enabled?: boolean;
}

export function useProducts(params?: IProductsQueryParams, options?: UseProductsOptions) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: async () => {
      const query = new URLSearchParams();
      if (params?.page) query.set('page', String(params.page));
      if (params?.limit) query.set('limit', String(params.limit));
      if (params?.occasionId) query.set('occasionId', params.occasionId);

      const queryString = query.toString();
      const response = await fetch(`/api/products${queryString ? `?${queryString}` : ''}`);
      const data: IApiResponse<IPaginatedProducts> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    enabled: options?.enabled,
  });
}
