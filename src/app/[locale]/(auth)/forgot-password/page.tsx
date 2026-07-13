import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function ForgotPasswordPage({ params, searchParams }: ForgotPasswordPageProps) {
  const { locale } = await params;
  const {token} = await searchParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

 return <ForgotPasswordForm token={token ?? ''}/>;
}
