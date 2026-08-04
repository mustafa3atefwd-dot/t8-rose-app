import { NextRequest, NextResponse } from 'next/server';
import { createAddress, getAddresses } from '@/features/checkout/lib/actions/addresses.action';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createAddress(body);
    return NextResponse.json(data, { status: data.code });
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
