import { NextRequest, NextResponse } from "next/server";
import { confirmOtpStepAction } from "@/features/auth/lib/actions/register.action";

export async function POST(req: NextRequest) {
  try {
    // ===== Parse request body =====
    const body = await req.json();

    // ===== Verify OTP step (registration flow) =====
    const data = await confirmOtpStepAction(body);

    // ===== Return success response =====
    return NextResponse.json(data);
  } catch (error) {
    // ===== Handle OTP verification errors =====
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 400 },
    );
  }
}
