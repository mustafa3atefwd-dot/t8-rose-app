import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { NextRequest, NextResponse } from 'next/server';

export async function proxyProductsRequest(request: NextRequest, backendPath: string) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return NextResponse.json({ status: false, message: 'Backend URL is not configured' }, { status: 500 });

  const token = await getNextAuthToken();
  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const response = await fetch(`${backendUrl}${backendPath}${request.nextUrl.search}`, {
    method: request.method,
    headers,
    body: hasBody ? await request.text() : undefined,
    cache: 'no-store',
  });

  return new NextResponse(await response.text(), {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('content-type') ?? 'application/json' },
  });
}
