'use client';

import Image from 'next/image';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import RatingStars from './rating-stars';
import { getBadge, getDiscountedPrice } from '../lib/utils';
import { IProduct } from '../lib/types/product';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
  onToggleWishlist?: (product: IProduct) => void;
}

const ProductCard = ({ product, onAddToCart, onToggleWishlist }: ProductCardProps) => {
  const t = useTranslations('products.card');
  const locale = useLocale();

  const discountedPrice = getDiscountedPrice(product);
  const badge = getBadge(product);
  const isOutOfStock = product.stock <= 0;

  const formatPrice = (value: number | string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(
      Number(value)
    );

  return (
    <div className="rounded-ds-lg border-ds-border-soft mx-auto flex w-full max-w-75 flex-col overflow-hidden">
      <div className="bg-ds-bg-muted group relative aspect-square w-full overflow-hidden rounded-xl">
        {badge && (
          <Badge variant={badge.variant} className="absolute inset-e-2 top-2 z-10">
            {t(badge.label)}
          </Badge>
        )}

        {product.cover ? (
          <Image src={product.cover} alt={product.title} fill unoptimized className="object-cover" />
        ) : (
          <div className="text-ds-text-muted flex h-full w-full items-center justify-center">{t('noImage')}</div>
        )}

        <div className="bg-ds-bg-primary-overlay absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            className="rounded-full bg-white"
            size="icon-sm"
            variant="secondary"
            aria-label={t('wishlist')}
            onClick={() => onToggleWishlist?.(product)}
          >
            <Heart />
          </Button>

          <Button
            className="rounded-full bg-white"
            size="icon-sm"
            variant="secondary"
            aria-label={t('quickView')}
            asChild
          >
            <Link href={`/products/${product.id}`}>
              <Eye />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-3">
        <h3 className="text-ds-bg-primary line-clamp-1 font-medium">{product.title}</h3>

        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} label={t('rating', { rating: product.rating })} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-body-lg text-ds-text-primary font-semibold">
              {formatPrice(discountedPrice ?? product.price)}
            </span>
            {discountedPrice !== null && (
              <span className="text-caption text-ds-text-muted line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <Button
            className="bg-maroon-500 hover:bg-maroon-600 size-12 rounded-full text-white"
            size="icon-lg"
            variant="default"
            disabled={isOutOfStock}
            aria-label={t('addToCart')}
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
