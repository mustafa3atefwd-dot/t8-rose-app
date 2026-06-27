"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/shared/i18n/config";
import { messages } from "@/shared/i18n/messages";

function subscribe() {
  return () => {};
}

export function ThemeToggle({ locale = "en" }: { locale?: Locale }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const labels = messages[locale].theme;

  if (!mounted) {
    return (
      <button
        className="h-11 rounded-base border border-border-subtle bg-card px-5 text-body-sm font-semibold text-card-foreground"
        type="button"
        aria-label={labels.toggle}
      >
        {labels.toggle}
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="h-11 rounded-base border border-border-subtle bg-card px-5 text-body-sm font-semibold text-card-foreground transition hover:border-border-primary focus:outline-none focus:ring-3 focus:ring-ring-default"
      type="button"
      aria-label={labels.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? labels.light : labels.dark}
    </button>
  );
}
