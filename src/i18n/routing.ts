import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales supported by the app.
  locales: ["en", "ar"],

  // Used when no locale matches.
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ["ar"];

export function getDirection(locale: string): "ltr" | "rtl" {
  return rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
}
