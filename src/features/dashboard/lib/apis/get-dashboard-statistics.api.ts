import 'server-only';

import { BACKEND_URL } from '@/shared/lib/constants';
import type { ISuccessResponse } from '@/shared/lib/types/api';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { IDashboardStatistics, TRevenuePeriod } from '@/features/dashboard/lib/types/statistics';

// Dashboard statistics query configuration
const STATISTICS_PARAMS = {
  lowStockThreshold: '20',
  topProductsLimit: '10',
  lowStockLimit: '20',
};

// Fetch the authenticated admin dashboard statistics
// revenuePeriod: 'monthly' = last 12 months, 'week' = last 7 days
export async function getDashboardStatistics(
  accessToken: string,
  revenuePeriod: TRevenuePeriod = 'monthly'
): Promise<IDashboardStatistics> {
  if (!BACKEND_URL) throw new Error('Backend URL is not configured');

  const params = new URLSearchParams({ ...STATISTICS_PARAMS, revenuePeriod });

  // Backend request
  const response = await apiRequest<ISuccessResponse<IDashboardStatistics>>(
    `${BACKEND_URL}/admin/statistics?${params}`,
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
