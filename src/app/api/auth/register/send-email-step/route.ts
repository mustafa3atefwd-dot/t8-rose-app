import { NextRequest, NextResponse } from 'next/server';
import { sendEmailStepAction } from '@/features/auth/lib/actions';

export async function POST(req: NextRequest) {
  try {
    // ===== Extract email from request body =====
    const { email } = await req.json();

    console.log({ email });

    // ===== Trigger email verification step (registration flow) =====
    const data = await sendEmailStepAction(email);

    // ===== Return success response =====
    return NextResponse.json(data);
  } catch (error) {
    console.log({ error });
    // ===== Handle email step errors =====
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 }
    );
  }
}
