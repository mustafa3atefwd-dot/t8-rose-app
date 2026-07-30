import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { IPaginatedProducts, IProductDetail, IProductsQueryParams } from '../types/product';

export const getProducts = async (params?: IProductsQueryParams) => {
  const query = new URLSearchParams();

  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.occasionId) query.set('occasionId', params.occasionId);
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);

  const queryString = query.toString();

  return apiRequest<IApiResponse<IPaginatedProducts>>(`${BACKEND_URL}/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductById = async (id: string) => {
  return apiRequest<IApiResponse<{ product: IProductDetail }>>(`${BACKEND_URL}/products/${id}`);
};
