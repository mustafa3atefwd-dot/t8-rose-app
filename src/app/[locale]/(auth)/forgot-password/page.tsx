import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
}

// Placeholder so `/[locale]/login` resolves inside the auth shell.
// The login form is delivered in its own story; this only proves the layout.
export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <>
      <ForgotPasswordForm/>
    </>
  );
}
