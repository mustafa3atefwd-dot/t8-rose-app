import { createOrderAction } from '@/features/checkout/lib/actions/create-order.action';
import { ApiError } from '@/shared/lib/utils/error.util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Extract body
    const body = await req.json();

    // Call domain logic (create order)
    const res = await createOrderAction(body);

    return NextResponse.json(res);
  } catch (error) {
    // The backend's own status matters to the caller: a 401 (expired session)
    // and a 400 (rejected payload) need different handling, and collapsing
    // both into a 500 hides which one actually happened.
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    console.error('[POST /api/orders]', { status, message });

    return NextResponse.json({ status: false, code: status, message }, { status });
  }
}
