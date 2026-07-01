import { notFound } from "next/navigation";
import { LoginForm } from "../../../../features/auth/components/LoginForm";
import type { LoginLocale } from "../../../../features/auth/lib/login-messages";

type LoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const supportedLocales: LoginLocale[] = ["en", "ar"];

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as LoginLocale)) {
    notFound();
  }

  return <LoginForm locale={locale as LoginLocale} />;
}
