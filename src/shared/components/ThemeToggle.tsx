"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/shared/i18n/config";
import { messages } from "@/shared/i18n/messages";
import { Monitor, Moon, SunMedium } from "lucide-react";

function subscribe() {
  return () => {};
}

export function ThemeToggle({ locale = "en" }: { locale?: Locale }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
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

  // const isDark = resolvedTheme === "dark";

  return (
    // <button
    //   className="h-11 rounded-base border border-border-subtle bg-card px-5 text-body-sm font-semibold text-card-foreground transition hover:border-border-primary focus:outline-none focus:ring-3 focus:ring-ring-default"
    //   type="button"
    //   aria-label={labels.toggle}
    //   onClick={() => setTheme(isDark ? "light" : "dark")}
    // >
    //   {isDark ? labels.light : labels.dark}
    // </button>
     <>
      {/* Mode Toggle */}
      <div className="bg-background-plain flex items-center border border-ds-border-soft p-0.75 rounded-full">
        {/* light */}
        <button
          onClick={() => setTheme('light')}
          className="size-8.5 bg-background-soft rounded-full flex items-center justify-center cursor-pointer"
        >
          <SunMedium className="size-6 text-ds-text-plain" />
        </button>
        {/* system */}
        <button
          onClick={() => setTheme('system')}
          className="size-8.5 rounded-full flex items-center justify-center cursor-pointer"
        >
          <Monitor className="size-6 text-ds-text-plain" />
        </button>
        {/* dark */}
        <button
          onClick={() => setTheme('dark')}
          className="size-8.5 rounded-full flex items-center justify-center cursor-pointer dark:bg-background-muted"
        >
          <Moon className="size-6 text-ds-text-plain" />
        </button>
      </div>
    </>
  );
}
