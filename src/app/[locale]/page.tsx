import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-maroon-400 text-4xl font-bold">{t('title')}</h1>
    </div>
  );
}
