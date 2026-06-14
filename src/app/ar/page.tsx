import { ThemeToggle } from "@/components/ThemeToggle";

export default function ArabicPage() {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      lang="ar"
      dir="rtl"
    >
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 font-arabic">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-body-sm font-bold uppercase text-primary">
              Rose App Design System
            </p>
            <h1 className="text-display-md font-bold leading-tight">
              هدايا مميزة لكل لحظة جميلة
            </h1>
            <p className="max-w-2xl text-body-lg text-muted-foreground">
              هذا المسار يثبت أن خط Tajawal يعمل مع اتجاه RTL في الصفحات
              العربية.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <h2 className="mb-4 text-heading-lg font-bold">تجربة الثيم</h2>
          <p className="mb-5 text-body text-muted-foreground">
            زر تبديل المظهر يحفظ الاختيار في المتصفح ويستمر بعد تحديث الصفحة.
          </p>
          <button className="h-11 rounded-md bg-primary px-5 font-bold text-white transition hover:bg-primary-hover">
            زر أساسي
          </button>
        </div>
      </section>
    </main>
  );
}
