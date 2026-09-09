import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
export default function EmptyCart() {
  const t = useTranslations('cart');
  return (
    <div className="flex flex-col items-center justify-center p-4 py-10">
      <Image src="/no-cart.svg" alt="Empty cart" width={300} height={300} />

      <Link href={'/products'} className="text-ds-text-muted text-lg">
        {t('empty')}, {t('continueShopping')}
      </Link>
    </div>
  );
}
