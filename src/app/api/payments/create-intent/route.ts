import { createPaymentIntentAction } from '@/features/checkout/lib/actions/create-payment-intent.action';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await createPaymentIntentAction(body);

    return NextResponse.json(res, {
      status: 201,
    });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
