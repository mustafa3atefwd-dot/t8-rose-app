import 'server-only';

import { NextResponse } from 'next/server';

import { IErrorResponse } from '@/shared/lib/types/api';
import { ApiError } from '@/shared/lib/utils/error.util';

/**
 * Runs a backend call inside a route handler and mirrors the backend status,
 * so a 401/404 from the API reaches the client as-is instead of a generic 500.
 */
export async function toRouteResponse<T>(request: () => Promise<T>) {
  try {
    return NextResponse.json(await request());
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const body: IErrorResponse = {
      status: false,
      code: error instanceof ApiError ? (error.code ?? status) : status,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };

    return NextResponse.json(body, { status });
  }
}
