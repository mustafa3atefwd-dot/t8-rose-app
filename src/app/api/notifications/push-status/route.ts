import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://rose-app.elevate-bootcamp.cloud';

export async function GET() {
  try {
    const token = await getNextAuthToken();

    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${BASE_URL}/api/notifications/push-status`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        data,
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      'Failed to get push status:',
      error
    );

    return NextResponse.json(
      {
        status: false,
        message: 'Failed to get push status',
      },
      { status: 500 }
    );
  }
}