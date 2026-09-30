import { NextRequest } from 'next/server';

import { deleteNotification, markNotificationRead } from '@/features/notifications/lib/apis/notifications.api';
import { toRouteResponse } from '@/features/notifications/lib/utils/route-response.util';

type NotificationRouteContext = {
  params: Promise<{ notificationId: string }>;
};

export async function PATCH(_request: NextRequest, { params }: NotificationRouteContext) {
  const { notificationId } = await params;

  return toRouteResponse(() => markNotificationRead(notificationId));
}

export async function DELETE(_request: NextRequest, { params }: NotificationRouteContext) {
  const { notificationId } = await params;

  return toRouteResponse(() => deleteNotification(notificationId));
}
