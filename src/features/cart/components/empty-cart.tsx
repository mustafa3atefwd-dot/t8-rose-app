import { useTranslations } from "next-intl";
import Image from "next/image";
export default function EmptyCart() {
  const t = useTranslations('cart');
  return (
    <div className="flex flex-col items-center justify-center py-10 p-4">
      <Image
        src="/no-cart.svg"
        alt="Empty cart"
        width={300}
        height={300}
      />

      <p className="text-lg text-ds-text-muted">{t('empty')}, {t('continueShopping')}</p>
    </div>
  );
}