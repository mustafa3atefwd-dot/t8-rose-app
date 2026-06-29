import type { Metadata } from "next";
import { Sarabun, Tajawal } from "next/font/google";
import Providers from "@/shared/context/global/providers";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";


// Keep your clean brand design tokens and typography setup
const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const paramsData = await params;
  const locale = paramsData.locale;

  const t = await getTranslations({ locale });
  return {
    title: t("app-title") || "Rose App Design System",
    description: "Color tokens, typography, and light/dark mode for Rose App.",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const paramsData = await params;
  const locale = paramsData.locale;

  // Validate that the incoming route segment is a supported locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${sarabun.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full  flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}