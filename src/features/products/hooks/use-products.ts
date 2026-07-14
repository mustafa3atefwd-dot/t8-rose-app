'use client';

import { useQuery } from '@tanstack/react-query';
import { productKeys } from '../lib/constants/query-keys.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { IPaginatedProducts, IProductsQueryParams } from '../lib/types/product';

export function useProducts(params?: IProductsQueryParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: async () => {
      const response = await fetch(`/api/products?page=${params?.page}&limit=${params?.limit}`);
      const data: IApiResponse<IPaginatedProducts> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
  });
}
