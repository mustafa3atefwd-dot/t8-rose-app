import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";


const AUTH_PAGES = ["/login", "/register", "/forgot-password"];
const PUBLIC_PAGES = ["/", "/login", "/forgot-password"]; 

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
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

 
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";
  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  const isPublicPage = PUBLIC_PAGES.some((page) => pathWithoutLocale === page);
  const isAuthPage = AUTH_PAGES.some((page) => pathWithoutLocale.startsWith(page));

 
  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  
  const hasToken = !!req.cookies.get("next-auth.session-token") || !!req.cookies.get("__Secure-next-auth.session-token");

  if (!hasToken && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    
    loginUrl.searchParams.set("returnUrl", pathWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};