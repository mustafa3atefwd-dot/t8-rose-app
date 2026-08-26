import { NextRequest } from 'next/server';
import { proxyProductsRequest } from './_proxy';

// Reads only — creating a product goes through `createProductAction`.
export function GET(request: NextRequest) {
  return proxyProductsRequest(request, '/products');
}
