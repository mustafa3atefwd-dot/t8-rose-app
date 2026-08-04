import { NextRequest, NextResponse } from 'next/server';
import { createAddress, getAddresses } from '@/features/checkout/lib/actions/addresses.action';

export async function GET() {
  try {
    const data = await getAddresses();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createAddress(body);
    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
