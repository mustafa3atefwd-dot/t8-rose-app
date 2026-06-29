import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AuthLayout } from "@/features/auth/layouts/AuthLayout";

interface AuthGroupLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Every screen inside the (auth) route group is wrapped in the branded
// two-column shell. NextAuth middleware (S2-01) redirects logged-in users away.
export default async function AuthGroupLayout({
  children,
  params,
}: AuthGroupLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <AuthLayout>{children}</AuthLayout>;
}
