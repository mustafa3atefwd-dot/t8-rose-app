import { ThemeToggle } from "@/shared/components/ThemeToggle";
import type { Locale } from "@/shared/i18n/config";
import { messages } from "@/shared/i18n/messages";
import {
  colorPalettes,
  colorShades,
  effectTokens,
  semanticGroups,
  typographyScale,
} from "@/shared/lib/design-tokens";

const usageExamples = [
  ["Primitive color", "bg-maroon-500 text-white"],
  ["Semantic background", "bg-background-primary"],
  ["Semantic text", "text-text-default"],
  ["Semantic border", "border-border-subtle"],
  ["Focus ring", "ring-3 ring-ring-default"],
  ["Shadow", "shadow-soft"],
  ["Radius", "rounded-base"],
];

function cssVar(name: string) {
  return `var(--${name})`;
}

function PaletteGrid() {
  return (
    <div className="space-y-8">
      {colorPalettes.map((paletteName) => (
        <div key={paletteName} className="space-y-3">
          <h3 className="text-heading-md font-bold capitalize">
            {paletteName.replace("-", " ")}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {colorShades.map((shade) => {
              const tokenName = `color-${paletteName}-${shade}`;

              return (
                <div
                  key={tokenName}
                  className="rounded-lg border border-border-subtle bg-card p-3 text-card-foreground"
                >
                  <div
                    className="mb-3 h-12 rounded-base border border-border-subtle"
                    style={{ background: cssVar(tokenName) }}
                  />
                  <p className="text-body-sm font-semibold">
                    {paletteName}-{shade}
                  </p>
                  <p className="text-caption text-text-muted">
                    --{tokenName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function SemanticGrid({ title }: { title: string }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-heading-lg font-bold">{title}</h2>
        <p className="text-body-sm text-text-muted">
          Semantic tokens map the primitive palette to real UI decisions.
        </p>
      </div>

      {semanticGroups.map((group) => (
        <div key={group.name} className="space-y-3">
          <h3 className="text-heading-md font-bold capitalize">
            {group.name}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {group.tokens.map((token) => {
              const tokenName = `${group.name}-${token}`;

              return (
                <div
                  key={tokenName}
                  className="rounded-lg border border-border-subtle bg-card p-3 text-card-foreground"
                >
                  <div
                    className="mb-3 h-12 rounded-base border border-border-subtle"
                    style={{ background: cssVar(tokenName) }}
                  />
                  <p className="text-body-sm font-semibold">{tokenName}</p>
                  <p className="text-caption text-text-muted">
                    --{tokenName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function EffectsGrid() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-lg border border-border-subtle bg-card p-6">
        <h2 className="mb-5 text-heading-lg font-bold">Shadows</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {effectTokens.shadows.map((name) => (
            <div
              key={name}
              className={`${name} rounded-base border border-border-subtle bg-background-plain p-4`}
            >
              <p className="text-body-sm font-semibold">{name}</p>
              <p className="text-caption text-text-muted">
                --{name.replace("shadow-", "shadow-")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-card p-6">
        <h2 className="mb-5 text-heading-lg font-bold">Ring</h2>
        <div className="flex flex-wrap gap-4">
          {effectTokens.rings.map((name) => (
            <div
              key={name}
              className={`grid h-24 w-24 place-items-center rounded-full bg-background-plain text-center ring-3 ${
                name === "ring-danger" ? "ring-ring-danger" : "ring-ring-default"
              }`}
            >
              <div>
                <p className="text-body-sm font-semibold">{name}</p>
                <p className="text-caption text-text-muted">3px</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-card p-6">
        <h2 className="mb-5 text-heading-lg font-bold">Radius</h2>
        <div className="grid grid-cols-2 gap-4">
          {effectTokens.radius.map((name) => (
            <div
              key={name}
              className={`${name} border border-border-subtle bg-background-plain p-4 text-center`}
            >
              <p className="text-body-sm font-semibold">{name}</p>
              <p className="text-caption text-text-muted">
                --radius-{name.replace("rounded-", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DesignSystemPreview({ locale = "en" }: { locale?: Locale }) {
  const copy = messages[locale].designSystem;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-body-sm font-semibold uppercase text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="text-display-md font-bold leading-tight">
              {copy.title}
            </h1>
            <p className="max-w-2xl text-body-lg text-text-muted">
              {copy.description}
            </p>
          </div>

          <ThemeToggle locale={locale} />
        </div>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-heading-lg font-bold">Primitive Colors</h2>
            <p className="text-body-sm text-text-muted">
              Maroon, Red, Pink, Soft Pink, Blue, Emerald, Yellow, and Zinc.
              Each palette supports shades 50-950.
            </p>
          </div>
          <PaletteGrid />
        </section>

        <SemanticGrid title="Semantic Colors" />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-card p-6">
            <h2 className="mb-5 text-heading-lg font-bold">Typography</h2>
            <div className="space-y-4">
              {typographyScale.map(([name, size, className]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3 last:border-b-0"
                >
                  <div>
                    <span className="font-semibold">{name}</span>
                    <p className="text-caption text-text-muted">{className}</p>
                  </div>
                  <span className="text-text-muted">{size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-card p-6">
            <h2 className="mb-5 text-heading-lg font-bold">Font Families</h2>
            <div className="space-y-6">
              <div>
                <p className="text-body-sm font-semibold text-primary">
                  Sarabun
                </p>
                <p className="text-heading-lg font-bold">
                  Special Gifts For The People You Love
                </p>
                <p className="text-body text-text-muted">
                  English interface font with regular, medium, semibold, and
                  bold weights.
                </p>
              </div>
              <div className="font-arabic">
                <p className="text-body-sm font-bold text-primary">Tajawal</p>
                <p className="text-heading-lg font-bold" dir="rtl">
                  هدايا مميزة لكل لحظة جميلة
                </p>
                <p className="text-body text-text-muted" dir="rtl">
                  الخط العربي المستخدم في الصفحات العربية مع اتجاه من اليمين
                  لليسار.
                </p>
              </div>
            </div>
          </div>
        </section>

        <EffectsGrid />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-card p-6">
            <h2 className="mb-5 text-heading-lg font-bold">
              Component Preview
            </h2>
            <div className="space-y-4">
              <input
                className="h-11 w-full rounded-base border border-border-subtle bg-background-plain px-3 text-body outline-none focus:ring-3 focus:ring-ring-default"
                placeholder="Placeholder"
              />
              <button className="h-11 rounded-base bg-background-primary px-5 font-semibold text-text-inverse shadow-soft transition hover:bg-background-primary-saturated focus:ring-3 focus:ring-ring-default">
                Primary Button
              </button>
              <button className="h-11 rounded-base border border-border-primary bg-background-primary-faint px-5 font-semibold text-text-primary transition hover:border-border-primary">
                Secondary Button
              </button>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-base bg-background-primary-faint px-3 py-1 text-caption font-semibold text-text-primary">
                  Primary
                </span>
                <span className="rounded-base bg-background-success-faint px-3 py-1 text-caption font-semibold text-text-success">
                  Success
                </span>
                <span className="rounded-base bg-background-warning-faint px-3 py-1 text-caption font-semibold text-text-warning">
                  Warning
                </span>
              </div>
              <div className="rounded-base border border-border-success bg-background-success-fade px-4 py-3 text-body-sm text-text-success">
                Successful operation
              </div>
              <div className="rounded-base border border-border-danger bg-background-danger-fade px-4 py-3 text-body-sm text-text-danger">
                Unsuccessful operation
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-card p-6">
            <h2 className="mb-5 text-heading-lg font-bold">
              How The Team Uses It
            </h2>
            <div className="space-y-3">
              {usageExamples.map(([label, example]) => (
                <div
                  key={label}
                  className="rounded-base border border-border-subtle bg-background-plain p-3"
                >
                  <p className="text-body-sm font-semibold">{label}</p>
                  <code className="text-caption text-text-muted">
                    {example}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
