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
    <section className="flex min-w-0 flex-col gap-5 sm:gap-6">
      {/* header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        {/* title */}
        <div className="flex items-center gap-2">
          <h1 className="text-ds-text-plain text-3xl font-bold sm:text-4xl lg:text-5xl">{t('title')}</h1>
          <ItemQuantity />
        </div>
        {/* clear all products button */}
        <ClearCartButton />
      </header>
      {/* items */}
      <div className="border-ds-border-muted rounded-xl border px-3 py-4 sm:px-5 sm:pt-5 sm:pb-7.5">
        {/* item card */}
        <Items />
      </div>
      {/* continue shopping button */}
      <Button asChild className="h-11 w-full rounded-xl sm:w-fit sm:px-5">
        <Link href="/products" className="flex items-center justify-center gap-2.5">
          <MoveLeft className="rtl:rotate-180" />
          {t('continueShopping')}
        </Link>
      </Button>
    </section>
  );
}
