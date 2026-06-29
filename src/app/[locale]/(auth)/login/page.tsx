import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
  const t = await getTranslations("auth");

  return (
    <div className="text-center">
      <h2 className="text-heading-md font-bold text-foreground">
        {t("pageTitle")}
      </h2>
    </div>
  );
}
