import { NextRequest, NextResponse } from 'next/server';
import { getProductByIdAction } from '@/features/products/lib/actions';
import { ApiError } from '@/shared/lib/utils/error.util';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const data = await getProductByIdAction(id);

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
