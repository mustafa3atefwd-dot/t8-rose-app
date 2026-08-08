import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { IPaginatedProducts, IProductDetail, IProductsQueryParams } from '../types/product';
import { buildProductsQuery } from '../utils/build-products-query';

export const getProducts = async (params?: IProductsQueryParams) => {
  const queryString = buildProductsQuery(params);

  return apiRequest<IApiResponse<IPaginatedProducts>>(`${BACKEND_URL}/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductById = async (id: string) => {
  return apiRequest<IApiResponse<{ product: IProductDetail }>>(`${BACKEND_URL}/products/${id}`);
};
