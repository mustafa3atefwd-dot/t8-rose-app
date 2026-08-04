import { getTranslations } from 'next-intl/server';
import { getCategoriesAction } from '@/features/products/lib/actions';
import { BrowseEntityGrid } from '@/features/products/components/browse-entity-grid';

const CATEGORIES_LIMIT = 50;

export default async function CategoriesPage() {
  const t = await getTranslations('browse');

  const result = await getCategoriesAction({ limit: CATEGORIES_LIMIT }).catch(() => null);
  const categories = result?.status ? (result.payload?.data ?? []) : [];

  const items = categories.map((category) => ({
    id: category.id,
    title: category.title,
    image: category.image,
    countLabel: t('productsCount', { count: category._count.products }),
  }));

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <h1 className="text-ds-text-plain text-2xl font-bold">{t('categoriesTitle')}</h1>
      <BrowseEntityGrid
        items={items}
        getHref={(item) => `/products?categoryId=${item.id}`}
        emptyLabel={t('noCategories')}
      />
    </div>
  );
}
