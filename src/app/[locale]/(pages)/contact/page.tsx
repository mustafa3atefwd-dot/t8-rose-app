import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return <h1>{t('title')}</h1>;
}
