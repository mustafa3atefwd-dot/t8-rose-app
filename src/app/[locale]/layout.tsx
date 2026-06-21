import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/shared/providers/global";
import { hasLocale, Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



interface LocalLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}


export async function generateMetadata({params}: {params: LocalLayoutProps["params"]}): Promise<Metadata> {

  const paramsResult = await params;
  const locale = paramsResult.locale;

  const t = await getTranslations({locale});
  const title = t("app-title");

  return {
    title,
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}




export default async function LocalLayout({
  children,
  params,
}: LocalLayoutProps) {
  const paramsResult = await params;
  const  locale  = paramsResult.locale;

   if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


    // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir= {locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

