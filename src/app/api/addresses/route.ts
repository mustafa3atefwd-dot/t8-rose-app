import "server-only";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const BASE_URL = process.env.BACKEND_URL;


if (!BASE_URL) {
  throw new Error("FATAL: Missing required server-side environment variable 'BACKEND_URL'.");
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.token && !token?.accessToken) {
      return NextResponse.json(
        {
          code: 401,
          message: "Unauthorized",
          status: false,
        },
        { status: 401 }
      );
    }

    const bearerToken = token.token || token.accessToken;

    const response = await fetch(`${BASE_URL}/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${bearerToken}`,
      },
      cache: "no-store",
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        message: "Failed to fetch addresses",
        status: false,
      },
      { status: 500 }
    );
  }
}