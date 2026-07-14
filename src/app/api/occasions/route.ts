import { NextRequest, NextResponse } from 'next/server';
import { getOccasionsAction } from '@/features/products/lib/actions';
import { ApiError } from '@/shared/lib/utils/error.util';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const data = await getOccasionsAction({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: error instanceof ApiError ? error.status : 500 }
    );
  }
}
