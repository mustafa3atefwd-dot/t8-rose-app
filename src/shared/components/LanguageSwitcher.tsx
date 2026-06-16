"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const labels: Record<string, string> = { en: "EN", ar: "ع" };

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border p-1">
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          type="button"
          size="sm"
          variant={loc === locale ? "outline" : "ghost"}
          aria-pressed={loc === locale}
          onClick={() => router.replace(pathname, { locale: loc })}
        >
          {labels[loc] ?? loc.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
