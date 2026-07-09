import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];
const PUBLIC_PAGES = ["/"];
const LOCALES = ["en", "ar"] as const;

function getLocale(pathname: string) {
  return pathname.startsWith("/ar") ? "ar" : "en";
}

function getPathWithoutLocale(pathname: string) {
  return pathname.replace(/^\/(en|ar)/, "") || "/";
}

function hasSessionCookie(request: NextRequest) {
  return (
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token")
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const locale = getLocale(pathname);
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const isLocaleRoute = LOCALES.some((currentLocale) =>
    pathname.startsWith(`/${currentLocale}`),
  );
  const isPublicPage = PUBLIC_PAGES.includes(pathWithoutLocale);
  const isAuthPage = AUTH_PAGES.some((page) =>
    pathWithoutLocale.startsWith(page),
  );
  const isAuthenticated = hasSessionCookie(request);

  if (!isLocaleRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (!isAuthenticated && !isPublicPage && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("returnUrl", pathWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
