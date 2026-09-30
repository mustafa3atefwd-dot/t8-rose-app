"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Plain-text locale switcher shown at the top of the auth form column.
 * `usePathname` from next-intl returns the path without the locale prefix, and
 * `router.replace(..., { locale })` re-adds the target prefix — turning
 * `/en/login` into `/ar/login` (and vice-versa) while preserving query params.
 */
export function LanguageToggle() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function handleSwitch() {
    // Read the query string at click time (client-only) so we don't pull
    // `useSearchParams` into render, which would force a Suspense boundary on
    // statically rendered auth pages. Preserves params like `?callbackUrl=`.
    const search = typeof window !== "undefined" ? window.location.search : "";

    startTransition(() => {
      router.replace(`${pathname}${search}`, { locale: nextLocale });
    });
  }

  return (
    <button
      type="button"
      lang={nextLocale}
      aria-label={t("langLabel")}
      disabled={isPending}
      onClick={handleSwitch}
      className="text-body-sm text-text-default hover:text-text-primary cursor-pointer rounded-sm transition-colors focus:outline-none focus-visible:ring-3 focus-visible:ring-ring-default disabled:opacity-60"
    >
      {t("switchLang")}
    </button>
  );
}
