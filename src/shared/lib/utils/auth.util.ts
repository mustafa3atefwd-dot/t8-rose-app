"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getNextAuthToken() {
  const cookiestore = await cookies();

  const cookieNames = [
    process.env.NEXTAUTH_SESSION_COOKIE as string,
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
    "next-auth.session-token",
  ].filter(Boolean);

  let tokenValue: string | undefined;
  for (const name of cookieNames) {
    const c = cookiestore.get(name);
    if (c?.value) {
      tokenValue = c.value;
      break;
    }
  }
  if (!tokenValue) return null;

  try {
    const jwt = await decode({
      token: tokenValue,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    return null;
  }
}
