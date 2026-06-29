import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/shared/context/global/providers";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}:LocaleLayoutProps): Promise<Metadata> {
  const paramsData = await params;
  const locale = paramsData.locale;

  const t = await getTranslations({locale})
  const title = t("app-title") || "Rose App";
    return {
    title,
    }
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}:LocaleLayoutProps) {
    const paramsData = await params;
    const locale = paramsData.locale;

      if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

    setRequestLocale(locale)
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full"><Providers>{children}</Providers></body>
    </html>
  );
}
