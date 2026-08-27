import type { Locale } from "./config";

export const messages = {
  en: {
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
    },
    designSystem: {
      eyebrow: "Rose App Design System",
      title: "Design Tokens Foundation",
      description:
        "Primitive colors, semantic colors, typography, rings, shadows, radius, and switchable light/dark theme tokens.",
    },
  },
  ar: {
    theme: {
      toggle: "تبديل المظهر",
      light: "فاتح",
      dark: "داكن",
    },
    designSystem: {
      eyebrow: "نظام تصميم Rose App",
      title: "أساس توكنز التصميم",
      description:
        "ألوان أساسية، ألوان معنوية، خطوط، حدود تركيز، ظلال، زوايا، ووضع فاتح وداكن.",
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;
