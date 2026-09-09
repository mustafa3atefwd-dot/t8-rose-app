import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { IApiResponse } from '@/shared/lib/types/api';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { IOccasionsQueryParams, IPaginatedOccasions } from '../types/occasion';

export const getOccasionsAction = async (params?: IOccasionsQueryParams) => {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const queryString = query.toString();

  return apiRequest<IApiResponse<IPaginatedOccasions>>(`${BACKEND_URL}/occasions${queryString ? `?${queryString}` : ''}`);
};
