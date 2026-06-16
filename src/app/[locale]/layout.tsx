import type { Metadata } from "next";
import { Sarabun, Tajawal, Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { cn } from "@/shared/lib/utils";
import Providers from "@/shared/context/global/providers";
import { routing, getDirection } from "@/i18n/routing";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

export const metadata: Metadata = {
  title: "Rose App Design System",
  description: "Color tokens, typography, and light/dark mode for Rose App.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure the incoming `locale` is valid.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this request.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={cn(
        "h-full",
        "antialiased",
        sarabun.variable,
        tajawal.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
