'use client';

import Image from 'next/image';
import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { IProduct } from '@/features/products/lib/types';
import { getDiscountedPrice } from '@/features/products';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { toast } from '@/shared/components/ui/toast';
import { useCart } from '@/shared/hooks/use-cart';
import { useWishlistPage } from '../context/wishlist-provider';

interface WishlistItemProps {
  product: IProduct;
}

export function WishlistItem({ product }: WishlistItemProps) {
  const t = useTranslations('wishlist');
  const locale = useLocale();
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { removeProduct } = useWishlistPage();
  const isOutOfStock = product.stock <= 0;
  const discountedPrice = getDiscountedPrice(product);

  const formatPrice = (value: number | string) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 2,
    }).format(Number(value));

  const similarProductsParams = new URLSearchParams({ categoryId: product.categoryId });
  if (product.subCategoryId) similarProductsParams.set('subCategoryId', product.subCategoryId);

  const handleRemove = async () => {
    try {
      await removeProduct(product.id);
      toast.success(t('removed'));
    } catch {
      toast.error(t('removeError'));
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    try {
      await addToCart(product.id, 1, product);
      toast.success(t('addedToCart'));
    } catch {
      toast.error(t('addToCartError'));
    }
  };

  return (
    <article className="border-ds-border-soft grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b py-5 sm:grid-cols-[7.25rem_minmax(0,1fr)_auto] sm:gap-5">
      <Link
        href={`/products/${product.id}`}
        className="bg-ds-bg-muted relative aspect-[5/6] w-24 shrink-0 overflow-hidden rounded-lg sm:w-[7.25rem]"
        aria-label={product.title}
      >
        {product.cover ? (
          <Image
            src={product.cover}
            alt={product.title}
            fill
            sizes="(max-width: 639px) 6rem, 7.25rem"
            className={`object-cover transition-transform duration-200 hover:scale-105 ${isOutOfStock ? 'opacity-55' : ''}`}
          />
        ) : (
          <div className="text-ds-text-muted flex h-full items-center justify-center text-sm">{t('noImage')}</div>
        )}
      </Link>

      <div className="flex min-w-0 flex-col gap-1.5">
        <p className={`text-sm font-medium ${isOutOfStock ? 'text-ds-text-danger' : 'text-ds-text-success'}`}>
          {isOutOfStock ? t('outOfStock') : t('inStock', { count: product.stock })}
        </p>

        <Link href={`/products/${product.id}`} className="hover:text-ds-text-primary block w-fit">
          <h2 className="text-ds-text-plain line-clamp-2 text-lg font-semibold sm:text-xl">{product.title}</h2>
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="bg-ds-bg-warning-faint text-ds-text-warning flex items-center gap-1 rounded-md px-2 py-1 font-semibold">
            <Star className="size-4 fill-current" aria-hidden="true" />
            {product.rating.toFixed(1)}
          </span>
          <span className="text-ds-text-info">{t('ratings', { count: product.ratings })}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
          <span className="text-ds-text-plain text-2xl font-bold">{formatPrice(discountedPrice ?? product.price)}</span>
          {discountedPrice !== null && (
            <span className="text-ds-text-muted text-sm line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      <div className="col-span-2 flex shrink-0 items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          className="text-ds-text-danger hover:text-ds-text-danger sm:order-none"
          aria-label={t('remove')}
          onClick={() => void handleRemove()}
        >
          <Trash2 className="size-5" />
        </Button>

        {isOutOfStock ? (
          <Button asChild variant="secondary" className="min-w-0 flex-1 px-5 sm:mt-auto sm:flex-none">
            <Link href={`/products?${similarProductsParams.toString()}`}>{t('exploreSimilar')}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            className="min-w-0 flex-1 px-6 sm:mt-auto sm:flex-none"
            loading={isCartLoading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4" />
            {t('addToCart')}
          </Button>
        )}
      </div>
    </article>
  );
}
