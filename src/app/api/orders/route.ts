import { createOrderAction } from '@/features/checkout/lib/actions/create-order.action';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Extract body
    const body = await req.json();

    // Call domain logic (create order)
    const res = await createOrderAction(body);

    return NextResponse.json(res);
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
