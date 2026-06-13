"use client";

import { useState } from "react";

const lightTokens = [
  ["primary", "#cd2e33"],
  ["primary-hover", "#a6252a"],
  ["primary-light", "#fbeaea"],
  ["secondary", "#ff668b"],
  ["background", "#ffffff"],
  ["foreground", "#18181b"],
  ["card", "#ffffff"],
  ["muted", "#f4f4f5"],
  ["border", "#d4d4d8"],
  ["danger", "#ef4444"],
  ["success", "#00bc7d"],
  ["warning", "#facc15"],
];

const darkTokens = [
  ["primary", "#ff668b"],
  ["primary-hover", "#ff85a2"],
  ["primary-light", "#590414"],
  ["secondary", "#ff82a9"],
  ["background", "#27272a"],
  ["foreground", "#fafafa"],
  ["card", "#3f3f46"],
  ["muted", "#52525b"],
  ["border", "#52525b"],
  ["danger", "#ef4444"],
  ["success", "#00bc7d"],
  ["warning", "#facc15"],
];

const typeScale = [
  ["Display 2XL", "72px", "text-display-2xl"],
  ["Display XL", "60px", "text-display-xl"],
  ["Display LG", "48px", "text-display-lg"],
  ["Display MD", "36px", "text-display-md"],
  ["Display SM", "30px", "text-display-sm"],
  ["Heading LG", "24px", "text-heading-lg"],
  ["Heading MD", "20px", "text-heading-md"],
  ["Body LG", "18px", "text-body-lg"],
  ["Body", "16px", "text-body"],
  ["Body SM", "14px", "text-body-sm"],
  ["Caption", "12px", "text-caption"],
];

const usageExamples = [
  ["Page background", "bg-background text-foreground"],
  ["Card", "bg-card text-card-foreground border-border"],
  ["Primary button", "bg-primary hover:bg-primary-hover text-white"],
  ["Input", "border-input bg-background focus:border-primary"],
  ["Muted text", "text-muted-foreground"],
  ["Success message", "border-success bg-success/10 text-success"],
];

function TokenGrid({ tokens }: { tokens: string[][] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tokens.map(([name, value]) => (
        <div
          key={name}
          className="rounded-lg border border-border bg-card p-4 text-card-foreground"
        >
          <div
            className="mb-4 h-16 rounded-md border border-border"
            style={{ backgroundColor: value }}
          />
          <p className="text-body-sm font-semibold">{name}</p>
          <p className="text-caption text-muted-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemPreview() {
  const [isDark, setIsDark] = useState(false);
  const activeTokens = isDark ? darkTokens : lightTokens;

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex max-w-3xl flex-col gap-3">
              <p className="text-body-sm font-semibold uppercase text-primary">
                Rose App Design System
              </p>
              <h1 className="text-display-md font-bold leading-tight">
                Color Tokens, Typography, and Light/Dark Mode
              </h1>
              <p className="max-w-2xl text-body-lg text-muted-foreground">
                This page is the first task foundation for Team 8. It keeps the
                project colors and fonts in one clean place.
              </p>
            </div>

            <button
              className="h-11 rounded-md border border-border bg-card px-5 text-body-sm font-semibold text-card-foreground transition hover:border-primary"
              type="button"
              onClick={() => setIsDark((value) => !value)}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <section className="flex flex-col gap-4">
            <div>
              <h2 className="text-heading-lg font-bold">
                {isDark ? "Dark Mode Tokens" : "Light Mode Tokens"}
              </h2>
              <p className="text-body-sm text-muted-foreground">
                These names are what the team should use in Tailwind classes.
              </p>
            </div>
            <TokenGrid tokens={activeTokens} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-5 text-heading-lg font-bold">Typography</h2>
              <div className="space-y-4">
                {typeScale.map(([name, size, className]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0"
                  >
                    <div>
                      <span className="font-semibold">{name}</span>
                      <p className="text-caption text-muted-foreground">
                        {className}
                      </p>
                    </div>
                    <span className="text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-5 text-heading-lg font-bold">Font Families</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-body-sm font-semibold text-primary">
                    Sarabun
                  </p>
                  <p className="text-heading-lg font-bold">
                    Special Gifts For The People You Love
                  </p>
                  <p className="text-body text-muted-foreground">
                    Used for English interface text and product content.
                  </p>
                </div>
                <div className="font-arabic">
                  <p className="text-body-sm font-bold text-primary">Tajawal</p>
                  <p className="text-heading-lg font-bold" dir="rtl">
                    هدايا مميزة لكل لحظة جميلة
                  </p>
                  <p className="text-body text-muted-foreground" dir="rtl">
                    يستخدم للنص العربي واتجاه الكتابة من اليمين لليسار.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-5 text-heading-lg font-bold">
                Component Preview
              </h2>
              <div className="space-y-4">
                <input
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-body outline-none focus:border-primary"
                  placeholder="Placeholder"
                />
                <button className="h-11 rounded-md bg-primary px-5 font-semibold text-white transition hover:bg-primary-hover">
                  Primary Button
                </button>
                <button className="h-11 rounded-md border border-primary bg-primary-light px-5 font-semibold text-primary transition hover:border-primary-hover">
                  Secondary Button
                </button>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-primary-light px-3 py-1 text-caption font-semibold text-primary">
                    Badge
                  </span>
                  <span className="rounded-md bg-muted px-3 py-1 text-caption font-semibold text-muted-foreground">
                    Muted
                  </span>
                  <span className="rounded-md bg-warning/20 px-3 py-1 text-caption font-semibold text-foreground">
                    Warning
                  </span>
                </div>
                <div className="rounded-md border border-success bg-success/10 px-4 py-3 text-body-sm text-success">
                  Successful operation
                </div>
                <div className="rounded-md border border-danger bg-danger/10 px-4 py-3 text-body-sm text-danger">
                  Unsuccessful operation
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-5 text-heading-lg font-bold">
                How The Team Uses It
              </h2>
              <div className="space-y-3">
                {usageExamples.map(([label, example]) => (
                  <div
                    key={label}
                    className="rounded-md border border-border bg-background p-3"
                  >
                    <p className="text-body-sm font-semibold">{label}</p>
                    <code className="text-caption text-muted-foreground">
                      {example}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
