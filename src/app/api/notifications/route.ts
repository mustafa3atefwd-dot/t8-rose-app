import { NextRequest } from 'next/server';

import { createNotification, getNotifications } from '@/features/notifications/lib/apis/notifications.api';
import { toRouteResponse } from '@/features/notifications/lib/utils/route-response.util';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get('page')) || undefined;
  const limit = Number(searchParams.get('limit')) || undefined;

  return toRouteResponse(() => getNotifications({ page, limit }));
}

export async function POST(request: NextRequest) {
  return toRouteResponse(async () => createNotification(await request.json()));
}
