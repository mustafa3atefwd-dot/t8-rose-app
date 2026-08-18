import { MapPinPen } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function UserAddress() {
  const t = useTranslations();
  return (
    <div className="py-1.75 px-2.5 rtl:ml-2">
      <span className="text-sm text-zinc-500 rtl:text-nowrap">{t('home.header.deliverTo')}</span>
      <div className="flex items-center gap-1.5 text-ds-text-primary">
        <MapPinPen className="size-5"/>
        <span className="font-medium">Cairo</span>
      </div>
    </div>
  );
}
