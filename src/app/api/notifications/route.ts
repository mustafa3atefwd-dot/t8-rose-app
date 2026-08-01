import { NextRequest, NextResponse } from 'next/server';
import { getNotifications } from '@/features/notifications/lib/services/notifications.service';
import { deleteAllNotifications, markAllRead } from '@/features/notifications/lib/actions/update-notification.action';

export async function GET() {
  try {
    const data = await getNotifications();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(_request: NextRequest) {
    const data = await markAllRead();
    return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest) {
    const data = await deleteAllNotifications();
    return NextResponse.json(data);
}
