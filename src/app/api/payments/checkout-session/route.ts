import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/shared/lib/utils/error.util';

import {
  createCheckoutSessionAction,
  getCheckoutSessionStatusAction,
} from '@/features/orders/lib/actions/checkout-session.action';

/**
 * Opens a Stripe Checkout session for an order created earlier in the flow.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId: unknown = body?.orderId;

    if (typeof orderId !== 'string' || !orderId) {
      return NextResponse.json({ status: false, message: 'An order id is required' }, { status: 400 });
    }

    const data = await createCheckoutSessionAction(orderId, {
      successUrl: typeof body?.successUrl === 'string' ? body.successUrl : undefined,
      cancelUrl: typeof body?.cancelUrl === 'string' ? body.cancelUrl : undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Failed to start the payment session';

    console.error('[POST /api/payments/checkout-session]', { status, message });

    return NextResponse.json({ status: false, code: status, message }, { status });
  }
}

/**
 * Reports whether a checkout session was actually paid, for the page Stripe
 * returns the buyer to.
 */
export async function GET(request: NextRequest) {
  // Stripe appends `session_id` to the success URL, so accept that spelling
  // first and fall back to the camelCase one for internal callers.
  const params = request.nextUrl.searchParams;
  const sessionId = (params.get('session_id') ?? params.get('sessionId'))?.trim();

  if (!sessionId) {
    return NextResponse.json({ status: false, message: 'A session id is required' }, { status: 400 });
  }

  try {
    const data = await getCheckoutSessionStatusAction(sessionId);

    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Failed to read the payment session';

    console.error('[GET /api/payments/checkout-session]', { status, message });

    return NextResponse.json({ status: false, code: status, message }, { status });
  }
}
