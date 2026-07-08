"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";

// Which auth screens show a script heading, and the message key for each.
// `usePathname` (next-intl) returns the path without the locale prefix.
// Screens not listed here (e.g. forgot-password) render no heading.
const HEADING_BY_PATH: Record<string, "welcomeBack" | "joinFamily"> = {
  "/login": "welcomeBack",
  "/register": "joinFamily",
};

export function AuthHeading() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const pathname = usePathname();
  const key = HEADING_BY_PATH[pathname];

  if (!key) return null;

  // The decorative script font (Great Vibes) has no Arabic glyphs, so apply it
  // only to Latin locales. Arabic headings render with Tajawal (`font-arabic`).
  const isArabic = locale === "ar";

  return (
    <h1
      className={cn(
        "text-ds-bg-primary text-4xl text-center align-middle leading-none font-normal tracking-normal not-italic",
        isArabic ? "font-arabic" : "font-script",
      )}
    >
      {t(key)}
    </h1>
  );
}
