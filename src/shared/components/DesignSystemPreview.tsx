import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { colorPalettes, typographyScale } from "@/shared/lib/design-tokens";

const usageExamples = [
  ["Maroon token", "bg-maroon-500 text-white"],
  ["Zinc text", "text-zinc-100"],
  ["Page background", "bg-background text-foreground"],
  ["Card", "bg-card text-card-foreground border-border"],
  ["Primary button", "bg-primary hover:bg-primary-hover text-white"],
  ["Input", "border-input bg-background focus:border-primary"],
  ["Success message", "border-success bg-success/10 text-success"],
];

function PaletteGrid() {
  return (
    <div className="space-y-8">
      {Object.entries(colorPalettes).map(([paletteName, shades]) => (
        <div key={paletteName} className="space-y-3">
          <h3 className="text-heading-md font-bold capitalize">
            {paletteName.replace("-", " ")}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {Object.entries(shades).map(([shade, value]) => (
              <div
                key={`${paletteName}-${shade}`}
                className="rounded-lg border border-border bg-card p-3 text-card-foreground"
              >
                <div
                  className="mb-3 h-12 rounded-md border border-border"
                  style={{ backgroundColor: value }}
                />
                <p className="text-body-sm font-semibold">
                  {paletteName}-{shade}
                </p>
                <p className="text-caption text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemPreview() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
              Foundation tokens for Team 8. Colors are available as Tailwind
              classes, fonts load through Next.js, and the theme is controlled
              globally with persistence.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-heading-lg font-bold">Color Tokens</h2>
            <p className="text-body-sm text-muted-foreground">
              Required palettes: Maroon, Red, Pink, Soft Pink, Blue, Emerald,
              Yellow, and Zinc. Each palette supports shades 50-950.
            </p>
          </div>
          <PaletteGrid />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-5 text-heading-lg font-bold">Typography</h2>
            <div className="space-y-4">
              {typographyScale.map(([name, size, className]) => (
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
                  English interface font with regular, medium, semibold, and
                  bold weights.
                </p>
              </div>
              <div className="font-arabic">
                <p className="text-body-sm font-bold text-primary">Tajawal</p>
                <p className="text-heading-lg font-bold" dir="rtl">
                  هدايا مميزة لكل لحظة جميلة
                </p>
                <p className="text-body text-muted-foreground" dir="rtl">
                  الخط العربي المستخدم في مسار /ar مع اتجاه من اليمين لليسار.
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
                <span className="rounded-md bg-maroon-50 px-3 py-1 text-caption font-semibold text-maroon-500">
                  Maroon Badge
                </span>
                <span className="rounded-md bg-zinc-100 px-3 py-1 text-caption font-semibold text-zinc-600">
                  Zinc Badge
                </span>
                <span className="rounded-md bg-yellow-200 px-3 py-1 text-caption font-semibold text-zinc-900">
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
    </main>
  );
}
