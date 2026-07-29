import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { IApiResponse } from '@/shared/lib/types/api';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { IPaginatedProducts, IProductDetail, IProductsQueryParams } from '../types/product';

export const getProductsAction = async (params?: IProductsQueryParams) => {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.occasionId) query.set('occasionId', params.occasionId);
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.subCategoryId) query.set('subCategoryId', params.subCategoryId);

  const queryString = query.toString();

  return apiRequest<IApiResponse<IPaginatedProducts>>(`${BACKEND_URL}/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductByIdAction = async (id: string) => {
  return apiRequest<IApiResponse<{ product: IProductDetail }>>(`${BACKEND_URL}/products/${id}`);
};
