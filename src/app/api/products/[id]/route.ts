import { NextRequest } from 'next/server';
import { proxyProductsRequest } from '../_proxy';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyProductsRequest(request, `/products/${encodeURIComponent(id)}`);
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyProductsRequest(request, `/products/${encodeURIComponent(id)}`);
}
