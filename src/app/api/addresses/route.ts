import { NextResponse } from 'next/server';
import { getAddresses } from '@/features/checkout/lib/actions/addresses.action';

export async function GET() {
  try {
    const data = await getAddresses();
    return NextResponse.json(data);
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'Unauthorized';
    return NextResponse.json(
      {
        status: false,
        code: unauthorized ? 401 : 500,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: unauthorized ? 401 : 500 }
    );
  }
}
