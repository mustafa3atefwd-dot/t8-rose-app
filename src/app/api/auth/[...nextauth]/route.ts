import NextAuth from "next-auth";
import { authOptions } from "../../../../auth";

const handler = NextAuth(authOptions);

export { handler as GET };

function getSetCookieHeaders(headers: Headers) {
  const headersWithSetCookie = headers as Headers & {
    getSetCookie?: () => string[];
  };

  const setCookieHeaders = headersWithSetCookie.getSetCookie?.();

  if (setCookieHeaders?.length) {
    return setCookieHeaders;
  }

  const setCookieHeader = headers.get("set-cookie");

  return setCookieHeader ? [setCookieHeader] : [];
}

function makeCookiesBrowserSessionOnly(response: Response) {
  const responseHeaders = new Headers(response.headers);
  const setCookieHeaders = getSetCookieHeaders(response.headers);

  responseHeaders.delete("set-cookie");

  // NextAuth's maxAge is static, so Remember Me is applied by removing
  // persistent cookie attributes only for non-remembered credentials logins.
  for (const cookie of setCookieHeaders) {
    responseHeaders.append(
      "set-cookie",
      cookie
        .replace(/;\s*Max-Age=\d+/gi, "")
        .replace(/;\s*Expires=[^;]+/gi, ""),
    );
  }

  return new Response(response.body, {
    headers: responseHeaders,
    status: response.status,
    statusText: response.statusText,
  });
}

export async function POST(request: Request) {
  const formData = request.url.includes("/callback/credentials")
    ? await request.clone().formData()
    : null;
  const response = await handler(request);

  if (!formData) {
    return response;
  }

  const rememberMe = formData.get("rememberMe") === "true";

  return rememberMe ? response : makeCookiesBrowserSessionOnly(response);
}
