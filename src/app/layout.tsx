import type { Metadata } from "next";
import { Sarabun, Tajawal, Geist } from "next/font/google";
import { ThemeProvider } from "@/shared/context/global/providers/theme-provider";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import Providers from "@/shared/context/global/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
