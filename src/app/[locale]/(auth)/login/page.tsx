import { Suspense } from "react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LoginForm } from "@/features/auth/components/LoginForm";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div
          className="h-96 w-full max-w-md animate-pulse rounded-lg bg-ds-bg-muted"
          aria-hidden
        />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
