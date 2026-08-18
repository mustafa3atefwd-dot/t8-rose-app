import { getTranslations } from 'next-intl/server';
import { getOccasionsAction } from '@/features/products/lib/actions';
import { BrowseEntityGrid } from '@/features/products/components/browse-entity-grid';

const OCCASIONS_LIMIT = 50;

export default async function OccasionsPage() {
  const t = await getTranslations('browse');

  const result = await getOccasionsAction({ limit: OCCASIONS_LIMIT }).catch(() => null);
  const occasions = result?.status ? (result.payload?.data ?? []) : [];

  const items = occasions.map((occasion) => ({
    id: occasion.id,
    title: occasion.title,
    image: occasion.image,
  }));

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <h1 className="text-ds-text-plain text-2xl font-bold">{t('occasionsTitle')}</h1>
      <BrowseEntityGrid
        items={items}
        getHref={(item) => `/products?occasionId=${item.id}`}
        emptyLabel={t('noOccasions')}
      />
    </div>
  );
}
