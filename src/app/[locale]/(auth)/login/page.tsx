import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LoginForm } from "@/features/auth/components/LoginForm";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

// Placeholder so `/[locale]/login` resolves inside the auth shell.
// The login form is delivered in its own story; this only proves the layout.
export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <LoginForm />;
}
