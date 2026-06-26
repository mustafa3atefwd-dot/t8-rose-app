import type { Metadata } from "next";
import { headers } from "next/headers";
import { Sarabun, Tajawal } from "next/font/google";
import Providers from "@/shared/context/global/providers";
import { getLocaleConfig } from "@/shared/i18n/config";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") === "ar" ? "ar" : "en";
  const { direction } = getLocaleConfig(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${sarabun.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
