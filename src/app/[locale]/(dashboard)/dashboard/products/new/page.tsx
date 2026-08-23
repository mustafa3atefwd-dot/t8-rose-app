import { ProductForm } from '@/features/products/admin';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumb';
import { getTranslations } from 'next-intl/server';

type PageProps = { params: Promise<{ locale: string }> };

export default async function NewProductPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('productsAdmin');
  const [categoriesResult, occasionsResult] = await Promise.all([
    getCategoriesAction({ limit: 100 }), getOccasionsAction({ limit: 100 }),
  ]);
  const categories = categoriesResult.status ? (categoriesResult.payload?.data ?? []) : [];
  const occasions = occasionsResult.status ? (occasionsResult.payload?.data ?? []) : [];

  return <div className="min-h-screen bg-ds-bg-subtle">
    <header className="border-b border-ds-border-muted bg-ds-bg-plain px-4 py-6 md:px-6"><Breadcrumbs items={[{ label: t('breadcrumbs.dashboard'), href: `/${locale}/dashboard` }, { label: t('breadcrumbs.products'), href: `/${locale}/dashboard/products` }, { label: t('breadcrumbs.add') }]} /></header>
    <main className="p-4 md:p-6"><h1 className="mb-6 truncate text-2xl font-semibold text-ds-text-plain">{t('form.addTitle')}</h1><ProductForm mode="create" categories={categories} occasions={occasions} /></main>
  </div>;
}
