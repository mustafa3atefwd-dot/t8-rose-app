import { notFound } from 'next/navigation';
import { ProductForm } from '@/features/products/admin';
import { getCategoriesAction, getOccasionsAction, getProductByIdAction } from '@/features/products/lib/actions';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumb';
import { getTranslations } from 'next-intl/server';

type PageProps = { params: Promise<{ locale: string; id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  // Translation
  const t = await getTranslations('productsAdmin');

  // Navigation
  const { locale, id } = await params;

  // Query
  const [productResult, categoriesResult, occasionsResult] = await Promise.all([
    getProductByIdAction(id), getCategoriesAction({ limit: 100 }), getOccasionsAction({ limit: 100 }),
  ]).catch(() => notFound());

  // Variables
  const product = productResult.status ? productResult.payload?.product : undefined;
  if (!product) notFound();
  const categories = categoriesResult.status ? (categoriesResult.payload?.data ?? []) : [];
  const occasions = occasionsResult.status ? (occasionsResult.payload?.data ?? []) : [];
  const pageTitle = t('form.updateTitle', { title: product.title });

  return <div className="min-h-screen bg-ds-bg-subtle">
    <header className="border-b border-ds-border-muted bg-ds-bg-plain px-4 py-6 md:px-6"><Breadcrumbs items={[{ label: t('breadcrumbs.dashboard'), href: `/${locale}/dashboard` }, { label: t('breadcrumbs.products'), href: `/${locale}/dashboard/products` }, { label: pageTitle }]} /></header>
    <main className="min-w-0 w-full p-4 md:p-6"><h1 title={pageTitle} className="mb-6 max-w-full truncate text-2xl font-semibold text-ds-text-plain">{pageTitle}</h1><ProductForm mode="edit" product={product} categories={categories} occasions={occasions} /></main>
  </div>;
}
