import { getNextAuthToken } from "@/shared/lib/utils/get-token.util";
import { NextRequest, NextResponse } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://rose-app.elevate-bootcamp.cloud/api";
export async function POST(request: NextRequest) {
  try {
    const token = await getNextAuthToken();

    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const res = await fetch(`${BASE_URL}/notifications/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("Push subscription error:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Failed to subscribe to push notifications",
      },
      { status: 500 }
    );
  }
}