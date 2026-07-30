'use client';

import Image from 'next/image';
import { Eye, Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import RatingStars from './rating-stars';
import { getBadge, getDiscountedPrice } from '../lib/utils';
import { useCart } from '@/shared/hooks/use-cart';
import { useWishlist } from '@/shared/hooks/use-wishlist';
import { IProduct } from '../lib/types';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
  onToggleWishlist?: (product: IProduct) => void;
}

const ProductCard = ({ product, onAddToCart, onToggleWishlist }: ProductCardProps) => {
  const t = useTranslations('products.card');
  const locale = useLocale();

  // 1. Initialize custom hooks (session status checked internally)
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { toggleWishlist, isWishlisted, isLoading: isWishlistLoading } = useWishlist();

  const discountedPrice = getDiscountedPrice(product);
  const badge = getBadge(product);
  const isOutOfStock = product.stock <= 0;
  const savedInWishlist = isWishlisted(product.id);

  const formatPrice = (value: number | string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(
      Number(value)
    );

  // 2. Button Action Handlers
  const handleAddToCart = async () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      await addToCart(product.id, 1, product);
    }
  };

  const handleToggleWishlist = async () => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      await toggleWishlist(product.id, product);
    }
  };
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

        {/* Hover Overlay Actions */}
        <div className="bg-ds-bg-primary-overlay absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {/* Wishlist Heart Button */}
          <Button
            className="rounded-full bg-white"
            size="icon-sm"
            variant="secondary"
            aria-label={t('wishlist')}
            disabled={isWishlistLoading}
            onClick={handleToggleWishlist}
          >
            {isWishlistLoading ? (
              <Loader2 className="size-4 animate-spin text-gray-600" />
            ) : (
              <Heart
                className={`size-4 transition-colors ${
                  savedInWishlist ? 'fill-maroon-500 text-maroon-500' : 'hover:text-maroon-500 text-gray-700'
                }`}
              />
            )}
          </Button>

          {/* Quick View Button */}
          <Button
            className="rounded-full bg-white"
            size="icon-sm"
            variant="secondary"
            aria-label={t('quickView')}
            asChild
          >
            <Link href={`/products/${product.id}`}>
              <Eye className="size-4" />
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

          {/* Add to Cart Button */}
          <Button
            className="bg-maroon-500 hover:bg-maroon-600 size-12 rounded-full text-white disabled:bg-gray-300"
            size="icon-lg"
            variant="default"
            disabled={isOutOfStock || isCartLoading}
            aria-label={t('addToCart')}
            onClick={handleAddToCart}
          >
            {isCartLoading ? <Loader2 className="size-5 animate-spin" /> : <ShoppingCart className="size-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
