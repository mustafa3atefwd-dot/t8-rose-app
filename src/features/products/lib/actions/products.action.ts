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
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.subCategoryId) query.set('subCategoryId', params.subCategoryId);
  if (params?.minPrice != null) query.set('minPrice', String(params.minPrice));
  if (params?.maxPrice != null) query.set('maxPrice', String(params.maxPrice));
  if (params?.minRating != null) query.set('minRating', String(params.minRating));
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.subCategoryId) query.set('subCategoryId', params.subCategoryId);
  if (params?.minPrice !== undefined) query.set('minPrice', String(params.minPrice));
  if (params?.maxPrice !== undefined) query.set('maxPrice', String(params.maxPrice));
  if (params?.minRating !== undefined) query.set('minRating', String(params.minRating));
  if (params?.search) query.set('search', params.search);

  const queryString = query.toString();

  return apiRequest<IApiResponse<IPaginatedProducts>>(`${BACKEND_URL}/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductByIdAction = async (id: string) => {
  return apiRequest<IApiResponse<{ product: IProductDetail }>>(`${BACKEND_URL}/products/${id}`);
};
