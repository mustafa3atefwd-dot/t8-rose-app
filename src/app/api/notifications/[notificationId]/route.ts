import { deleteNotification, updateNotification } from "@/features/notifications/lib/actions/update-notification.action";
import { NextRequest, NextResponse } from "next/server";
 
type NotificationRouteContext = {
  params: Promise<{
    notificationId: string;
  }>;
};

export async function PATCH(_request: NextRequest, { params }: NotificationRouteContext) {
    const { notificationId } = await params
    console.log(notificationId);
    const data = await updateNotification(notificationId);
    return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: NotificationRouteContext) {
    const { notificationId } = await params
    console.log(notificationId);
    const data = await deleteNotification(notificationId);
    return NextResponse.json(data);
}