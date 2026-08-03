import { getTranslations } from 'next-intl/server';
import type { IProductDetail } from '@/features/products/lib/types/product';
import { getProductImages } from '../lib/utils';
import { ProductGallery } from './product-gallery';
import { ProductInformation } from './product-information';

interface ProductDetailsProps {
  product: IProductDetail;
  locale: string;
}

export async function ProductDetails({ product, locale }: ProductDetailsProps) {
  const t = await getTranslations({ locale, namespace: 'productDetails' });
  const images = getProductImages(product.cover, product.gallery);

  return (
    <main className="bg-ds-bg-plain dark:bg-ds-bg-muted flex-1 py-6 sm:py-10">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            images={images}
            productTitle={product.title}
            galleryLabel={t('galleryLabel')}
            imageLabel={t('imageLabel')}
          />
          <ProductInformation product={product} locale={locale} />
        </div>
      </div>
    </main>
  );
}
