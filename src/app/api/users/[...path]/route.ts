import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';

const allowedRoutes = new Set(['profile', 'change-password', 'email/request', 'email/confirm', 'account']);

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const path = (await context.params).path.join('/');
    if (!allowedRoutes.has(path)) {
      return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
    }

    const token = await getNextAuthToken();
    if (!token) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = request.method === 'GET' ? undefined : await request.text();
    const response = await fetch(`${BACKEND_URL}/users/${path}`, {
      method: request.method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body,
      cache: 'no-store',
    });

    const text = await response.text();
    return new NextResponse(text || null, {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Users API proxy failed:', error);
    return NextResponse.json({ status: false, message: 'Unable to reach the users service' }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
