import { useTranslations } from 'next-intl';

export default function Favorite() {
  const t = useTranslations('favorite');

  return <h1>{t('title')}</h1>;
}
