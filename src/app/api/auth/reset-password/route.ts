import { NextResponse } from 'next/server';

import { BACKEND_URL } from '@/shared/lib/constants';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.token || !body?.newPassword || !body?.confirmPassword) {
    return NextResponse.json({ status: false, message: 'Missing reset password data.' }, { status: 400 });
  }

  const response = await fetch(`${BACKEND_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      token: body.token,
      newPassword: body.newPassword,
      confirmPassword: body.confirmPassword,
    }),
  });
  const data = await response.json().catch(() => ({ status: false, message: 'Invalid server response.' }));

  return NextResponse.json(data, { status: response.status });
}
