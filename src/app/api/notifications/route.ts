import { NextResponse } from 'next/server';
import { getNotifications } from '@/features/notifications/lib/services/notifications.service';

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