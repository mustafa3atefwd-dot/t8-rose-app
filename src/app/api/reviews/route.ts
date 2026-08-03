import { NextRequest, NextResponse } from 'next/server';
import { createProductReviewAction } from '@/features/product-details/lib/actions';

export async function POST(req: NextRequest) {
  try {
    // ===== Parse request body =====
    const body = await req.json();

    // ===== Create product review =====
    const data = await createProductReviewAction(body);

    // ===== Return success response =====
    return NextResponse.json(data);
  } catch (error) {
    // ===== Handle OTP verification errors =====
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 400 }
    );
  }
}
