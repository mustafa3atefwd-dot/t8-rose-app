import 'server-only';

import { BACKEND_URL } from '@/shared/lib/constants';
import type { ISuccessResponse } from '@/shared/lib/types/api';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { IDashboardStatistics } from '@/features/dashboard/lib/types/statistics';

const STATISTICS_PARAMS = new URLSearchParams({
  revenuePeriod: 'monthly',
  lowStockThreshold: '20',
  topProductsLimit: '10',
  lowStockLimit: '20',
});

export async function getDashboardStatistics(accessToken: string): Promise<IDashboardStatistics> {
  if (!BACKEND_URL) throw new Error('Backend URL is not configured');

  const response = await apiRequest<ISuccessResponse<IDashboardStatistics>>(
    `${BACKEND_URL}/admin/statistics?${STATISTICS_PARAMS}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    }
  );

  if (!response.payload) throw new Error('Dashboard statistics are unavailable');

  return response.payload;
}
