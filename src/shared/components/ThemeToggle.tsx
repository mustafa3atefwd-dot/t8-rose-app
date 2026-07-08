"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/shared/i18n/config";
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

  if (!mounted) {
    return (
      <>
      {/* Mode Toggle */}
      <div className="bg-ds-bg-plain flex items-center border border-ds-border-soft p-0.75 rounded-full">
        {/* light */}
        <button
          onClick={() => setTheme('light')}
          className="size-8.5 bg-ds-bg-soft rounded-full flex items-center justify-center cursor-pointer"
        >
          <SunMedium className="size-6 text-text-plain" />
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
          className="size-8.5 rounded-full flex items-center justify-center cursor-pointer dark:bg-ds-bg-muted"
        >
          <Moon className="size-6 text-ds-text-plain" />
        </button>
      </div>
    </>
    );
  }
  return (
     <>
      {/* Mode Toggle */}
      <div className="bg-ds-bg-plain flex items-center border border-ds-border-soft p-0.75 rounded-full">
        {/* light */}
        <button
          onClick={() => setTheme('light')}
          className="size-8.5 bg-ds-bg-soft rounded-full flex items-center justify-center cursor-pointer"
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
          className="size-8.5 rounded-full flex items-center justify-center cursor-pointer dark:bg-ds-bg-muted"
        >
          <Moon className="size-6 text-ds-text-plain" />
        </button>
      </div>
    </>
  );
}
