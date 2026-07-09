import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { LoginForm } from "../../../../features/auth/components/LoginForm";

type LoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const supportedLocales = ["en", "ar"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = (
    await import(`../../../../i18n/messages/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LoginForm />
    </NextIntlClientProvider>
  );
}
