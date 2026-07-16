import { authOptions } from "@/auth";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const handler = NextAuth(authOptions);

interface NextAuthRouteContext {
  params: Promise<{ nextauth: string[] }>;
}

function getSetCookieHeaders(headers: Headers) {
  const headersWithSetCookie = headers as Headers & {
    getSetCookie?: () => string[];
  };

  const cookies = headersWithSetCookie.getSetCookie?.() ?? [];

  if (cookies.length) {
    return cookies;
  }

  const combinedHeader = headers.get("set-cookie");

  return combinedHeader ? combinedHeader.split(/,(?=\s*[^;,\s]+=)/) : [];
}

function isSessionCookie(cookie: string) {
  return /^(?:__Secure-)?next-auth\.session-token(?:\.\d+)?=/i.test(cookie.trim());
}

function makeSessionCookieBrowserOnly(response: Response) {
  const responseHeaders = new Headers(response.headers);
  const setCookieHeaders = getSetCookieHeaders(response.headers);

  if (!setCookieHeaders.length) {
    return response;
  }

  responseHeaders.delete("set-cookie");

  for (const cookie of setCookieHeaders) {
    const nextCookie = isSessionCookie(cookie)
      ? cookie.replace(/;\s*Max-Age=\d+/gi, "").replace(/;\s*Expires=[^;]+/gi, "")
      : cookie;

    responseHeaders.append("set-cookie", nextCookie);
  }

  return new Response(response.body, {
    headers: responseHeaders,
    status: response.status,
    statusText: response.statusText,
  });
}

export async function GET(request: NextRequest, context: NextAuthRouteContext) {
  const response = await handler(request, context);

  if (!request.nextUrl.pathname.endsWith("/session")) {
    return response;
  }

  const session = (await response
    .clone()
    .json()
    .catch(() => null)) as { rememberMe?: boolean } | null;

  return session?.rememberMe === false ? makeSessionCookieBrowserOnly(response) : response;
}

export async function POST(request: NextRequest, context: NextAuthRouteContext) {
  const isCredentialsCallback = request.nextUrl.pathname.endsWith("/callback/credentials");
  const formData = isCredentialsCallback ? await request.clone().formData() : null;
  const response = await handler(request, context);

  if (!formData || formData.get("rememberMe") === "true") {
    return response;
  }

  return makeSessionCookieBrowserOnly(response);
}

