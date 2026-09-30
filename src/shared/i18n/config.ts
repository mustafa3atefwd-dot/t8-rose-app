export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export function getLocaleConfig(locale: Locale) {
  return {
    locale,
    direction: locale === "ar" ? "rtl" : "ltr",
  } as const;
}
