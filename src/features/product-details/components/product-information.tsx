import { Box, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { IProductDetail } from '@/features/products/lib/types/product';
import { getDiscountedPrice } from '@/features/products/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { ProductActions } from './product-actions';

interface ProductInformationProps {
  product: IProductDetail;
  locale: string;
}

export async function ProductInformation({ product, locale }: ProductInformationProps) {
  // Translations
  const t = await getTranslations({ locale, namespace: 'productDetails' });

  // Product price and currency formatting
  const discountedPrice = getDiscountedPrice(product);
  const priceFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 2,
  });

  return (
    <section aria-labelledby="product-title" className="flex flex-col lg:min-h-130.5">
      {/* Product title, price, and stock */}
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0 sm:flex-1">
          <h1 id="product-title" className="text-ds-text-plain text-2xl font-bold sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            {discountedPrice !== null ? (
              <>
                <span className="text-ds-text-soft text-lg line-through">
                  {priceFormatter.format(Number(product.price))}
                </span>
                <span className="text-ds-text-plain text-2xl font-bold">{priceFormatter.format(discountedPrice)}</span>
              </>
            ) : (
              <span className="text-ds-text-plain text-2xl font-bold">
                {priceFormatter.format(Number(product.price))}
              </span>
            )}
          </div>
        </div>

        <Badge variant={product.stock > 0 ? 'outline' : 'error'} className="h-8 px-3 text-sm font-normal">
          <Box aria-hidden="true" className="size-4" />
          {t('stock', { count: product.stock })}
        </Badge>
      </div>

      <div className="border-ds-border-soft my-4 border-t" />

      {/* Product rating */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Star aria-hidden="true" className="text-ds-text-warning size-5 fill-current" />
        <span className="text-ds-text-default font-medium">{t('rating', { rating: product.rating })}</span>
        <span className="text-ds-text-info">{t('ratings', { count: product.ratings })}</span>
      </div>

      <div className="border-ds-border-soft my-4 border-t" />

      {/* Scrollable product description */}
      <div>
        <h2 className="sr-only">{t('description')}</h2>
        <div className="text-ds-text-default h-32 overflow-y-auto pe-2 text-sm leading-relaxed">
          {product.description || t('noDescription')}
        </div>
      </div>

      {/* Product actions */}
      <div className="mt-auto">
        <ProductActions 
          productId={product.id}
          product={product}
          addToCartLabel={t('addToCart')} 
          addToWishlistLabel={t('addToWishlist')} 
        />
      </div>
    </section>
  );
}
