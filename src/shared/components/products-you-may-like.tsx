import { getTranslations } from 'next-intl/server';
import ProductCarousel from '@/features/home/components/product-carousel';
import { IProduct } from '@/features/products/lib/types';
import SectionTitle from './section-title';

interface IProductsYouMayLikeProps {
  products: IProduct[] | null;
}

export default async function ProductsYouMayLike({ products }: IProductsYouMayLikeProps) {
  const t = await getTranslations('cart');

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="container">
        <div className="mb-6">
          <SectionTitle className="mx-0! w-fit!">{t('mayLike')}</SectionTitle>
        </div>

        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
