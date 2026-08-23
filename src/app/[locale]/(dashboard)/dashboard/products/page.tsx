import { ProductsAdminTable } from '@/features/products/admin';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumb';
import { getTranslations } from 'next-intl/server';

export default async function DashboardProductsPage() {
  // Translation
  const t = await getTranslations('productsAdmin');
  return (
    <div className="bg-ds-bg-subtle min-h-screen">
      <header className="border-ds-border-muted bg-ds-bg-plain border-b px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: t('breadcrumbs.dashboard'), href: '/dashboard' }, { label: t('breadcrumbs.products') }]} />
      </header>
      <main className="p-0 md:p-6">
        <ProductsAdminTable />
      </main>
    </div>
  );
}
