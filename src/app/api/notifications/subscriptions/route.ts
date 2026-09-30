import { NextRequest } from 'next/server';

import {
  createPushSubscription,
  deletePushSubscription,
} from '@/features/notifications/lib/apis/notifications.api';
import { toRouteResponse } from '@/features/notifications/lib/utils/route-response.util';

export async function POST(request: NextRequest) {
  return toRouteResponse(async () => createPushSubscription(await request.json()));
}

export async function DELETE(request: NextRequest) {
  return toRouteResponse(async () => deletePushSubscription(await request.json()));
}
