import { NextRequest, NextResponse } from 'next/server';
import { confirmPaymentAction } from '@/features/checkout/lib/actions/confirm-payment.action';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await confirmPaymentAction(body);

    return NextResponse.json(res);
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
