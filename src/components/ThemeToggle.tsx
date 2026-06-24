"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        className="h-11 rounded-md border border-border bg-card px-5 text-body-sm font-semibold text-card-foreground"
        type="button"
        aria-label="Toggle theme"
      >
        Theme
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="h-11 rounded-md border border-border bg-card px-5 text-body-sm font-semibold text-card-foreground transition hover:border-primary"
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
