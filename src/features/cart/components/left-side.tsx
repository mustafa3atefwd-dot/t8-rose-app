import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { MoveLeft } from 'lucide-react';
import Items from './items';
import ClearCartButton from './clear-cart-button';
import ItemQuantity from './item-quantity';
import { getTranslations } from 'next-intl/server';
export default async function LeftSide() {
  //  translation
  const t = await getTranslations('cart');
  return (
    <>
      {/* header */}
      <header className="flex items-center justify-between">
        {/* title */}
        <div className="flex gap-2.5">
          <h2 className="text-ds-text-plain text-5xl font-bold">{t('title')}</h2>
          <ItemQuantity />
        </div>
        {/* clear all products button */}
        <ClearCartButton />
      </header>
      {/* items */}
      <div className="border-ds-border-muted rounded-xl border px-5 pt-5 pb-7.5">
        {/* item card */}
        <Items />
      </div>
      {/* continue shopping button */}
      <Button>
        <Link href={'/products'} className="flex items-center justify-center gap-2.5">
          <MoveLeft className="rtl:rotate-180" />
          {t('continueShopping')}
        </Link>
      </Button>
    </>
  );
}
