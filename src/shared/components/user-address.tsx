import { MapPinPen } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function UserAddress() {
  const t = useTranslations();
  return (
    <div className="px-2.5 py-1.75 rtl:ml-2">
      <span className="text-sm text-zinc-500 rtl:text-nowrap">{t('home.header.deliverTo')}</span>
      <div className="text-ds-text-primary flex items-center gap-1.5">
        <MapPinPen className="size-5" />
        <span className="font-medium">Cairo</span>
      </div>
    </div>
  );
}
