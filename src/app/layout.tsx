import './globals.css';

// The root layout is intentionally a pass-through. With next-intl i18n routing,
// the `<html>`/`<body>` shell, fonts and providers live in `app/[locale]/layout.tsx`
// so that `lang`/`dir` can be derived from the active locale. Keeping markup here
// too would render a duplicated (nested) document on every localized route.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
