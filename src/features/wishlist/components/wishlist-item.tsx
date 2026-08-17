'use client';

import Image from 'next/image';
import { Loader2, ShoppingCart, Star, Trash2 } from 'lucide-react';
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
    <article className="border-ds-border-soft bg-ds-bg-plain flex flex-col gap-4 rounded-2xl border p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
      <Link
        href={`/products/${product.id}`}
        className="bg-ds-bg-muted relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:size-32"
        aria-label={product.title}
      >
        {product.cover ? (
          <Image
            src={product.cover}
            alt={product.title}
            fill
            unoptimized
            className={`object-cover transition-transform duration-200 hover:scale-105 ${isOutOfStock ? 'opacity-55' : ''}`}
          />
        ) : (
          <div className="text-ds-text-muted flex h-full items-center justify-center text-sm">{t('noImage')}</div>
        )}
      </Link>

      <div className="min-w-0 flex-1 space-y-2">
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

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-ds-text-primary text-lg font-bold">
            {formatPrice(discountedPrice ?? product.price)}
          </span>
          {discountedPrice !== null && (
            <span className="text-ds-text-muted text-sm line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:flex-col-reverse lg:flex-row">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="text-ds-text-danger hover:text-ds-text-danger"
          aria-label={t('remove')}
          onClick={() => void handleRemove()}
        >
          <Trash2 className="size-5" />
        </Button>

        {isOutOfStock ? (
          <Button asChild variant="outline" className="min-w-0 flex-1 px-4 sm:flex-none">
            <Link href={`/products?${similarProductsParams.toString()}`}>{t('exploreSimilar')}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            className="min-w-0 flex-1 px-5 sm:flex-none"
            disabled={isCartLoading}
            onClick={handleAddToCart}
          >
            {isCartLoading ? <Loader2 className="size-4 animate-spin" /> : <ShoppingCart className="size-4" />}
            {t('addToCart')}
          </Button>
        )}
      </div>
    </article>
  );
}
