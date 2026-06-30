import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { InputShowcase } from "@/shared/components/InputShowcase";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/shared/i18n/config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface InputsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function InputsPage({ params }: InputsPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex max-w-3xl flex-col gap-2">
            <p className="text-body-sm font-semibold uppercase text-primary">
              Rose App Design System
            </p>
            <h1 className="text-display-sm font-bold leading-tight">
              Input Components
            </h1>
          </div>
          <ThemeToggle locale={locale as Locale} />
        </div>

        <InputShowcase />
      </section>
    </main>
  );
}
