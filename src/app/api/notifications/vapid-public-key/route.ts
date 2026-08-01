import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  try {
    const response = await fetch(
      `${API_URL}/notifications/vapid-public-key`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Route Handler Error:', error);

    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch VAPID public key',
      },
      {
        status: 500,
      }
    );
  }
}