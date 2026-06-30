import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex h-screen min-h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-400">{t('Not Found page ')}</h1>
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        {t('Go Back home')}
      </Link>
    </div>
  );
}
