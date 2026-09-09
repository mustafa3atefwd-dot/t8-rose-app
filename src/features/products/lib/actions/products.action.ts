import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { IApiResponse } from '@/shared/lib/types/api';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { IPaginatedProducts, IProductDetail, IProductsQueryParams } from '../types/product';
import { buildProductsQuery } from '../utils/build-products-query';

export const getProductsAction = async (params?: IProductsQueryParams) => {
  const queryString = buildProductsQuery(params);

  return apiRequest<IApiResponse<IPaginatedProducts>>(`${BACKEND_URL}/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductByIdAction = async (id: string) => {
  return apiRequest<IApiResponse<{ product: IProductDetail }>>(`${BACKEND_URL}/products/${id}`);
};
