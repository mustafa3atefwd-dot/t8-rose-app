"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

// Which auth screens show a script heading, and the message key for each.
// `usePathname` (next-intl) returns the path without the locale prefix.
// Screens not listed here (e.g. forgot-password) render no heading.
const HEADING_BY_PATH: Record<string, "welcomeBack" | "joinFamily"> = {
  "/login": "welcomeBack",
  "/register": "joinFamily",
};

export function AuthHeading() {
  const t = useTranslations("auth");
  const pathname = usePathname();
  const key = HEADING_BY_PATH[pathname];

  if (!key) return null;

  return (
    <h1
      className="text-primary text-display-lg text-center align-middle leading-none font-normal tracking-normal not-italic"
      style={{ fontFamily: '"Edwardian Script ITC", cursive' }}
    >
      {t(key)}
    </h1>
  );
}
