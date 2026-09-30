import { getPushStatus } from '@/features/notifications/lib/apis/notifications.api';
import { toRouteResponse } from '@/features/notifications/lib/utils/route-response.util';

export async function GET() {
  return toRouteResponse(getPushStatus);
}
