import 'server-only';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { IApiResponse } from '@/shared/lib/types/api';
import { ICouponsQuery, IPaginatedCoupons } from '../types/coupons';

export const getCoupons = async ({ search, isActive }: ICouponsQuery) => {
  const query = new URLSearchParams({ search, isActive: String(isActive) });

  return apiRequest<IApiResponse<IPaginatedCoupons>>(`${BACKEND_URL}/coupons?${query.toString()}`, {
    cache: 'no-store',
  });
};
