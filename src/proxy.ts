import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse, type NextFetchEvent } from "next/server";
import { routing } from "./i18n/routing";

const AUTH_PAGES = ["/login", "/register", "/reset-password"];
const PUBLIC_PAGES = ["/","/cart","/products"];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    const { pathname } = req.nextUrl;
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";

    if (AUTH_PAGES.some((page) => pathWithoutLocale.startsWith(page))) {
      const locale = pathname.startsWith("/ar") ? "ar" : "en";
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";
  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  const isPublicPage =
    PUBLIC_PAGES.some((page) => pathWithoutLocale === page) ||
    pathWithoutLocale.startsWith("/products");
  const isAuthPage = AUTH_PAGES.some((page) => pathWithoutLocale.startsWith(page));

  const hasToken = 
    !!req.cookies.get("next-auth.session-token") || 
    !!req.cookies.get("__Secure-next-auth.session-token");

  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  if (!hasToken && isAuthPage) {
    return handleI18nRouting(req);
  }

  if (!hasToken && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("returnUrl", pathWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  const response = authMiddleware(req as NextRequestWithAuth, event);

  if (response instanceof NextResponse && response.headers.get("location")) {
    const redirectUrl = new URL(response.headers.get("location")!, req.url);
    const callbackUrl = redirectUrl.searchParams.get("callbackUrl");
    
    if (callbackUrl) {
      redirectUrl.searchParams.delete("callbackUrl");
      redirectUrl.searchParams.set("returnUrl", callbackUrl);
      redirectUrl.pathname = `/${locale}${redirectUrl.pathname}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
