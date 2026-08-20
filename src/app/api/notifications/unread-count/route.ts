import { NextResponse } from 'next/server';
import { getUnreadCount } from '@/features/notifications/lib/apis/push-status.api';

export async function GET() {
  try {
    const data = await getUnreadCount();

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
