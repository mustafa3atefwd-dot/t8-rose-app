import { NextRequest } from 'next/server';
import { proxyProductsRequest } from '../_proxy';

export function GET(request: NextRequest) {
  return proxyProductsRequest(request, '/products/deleted');
}
