import { ProductsAdminTable } from '@/features/products/admin';
import { Breadcrumbs } from '@/shared/components/ui/breadcrumb';
import { getTranslations } from 'next-intl/server';

export default async function DashboardProductsPage() {
  // Translation
  const t = await getTranslations('productsAdmin');
  return (
    <div className="bg-ds-bg-subtle min-h-screen">
      <main className="p-0 md:p-6">
        <ProductsAdminTable />
      </main>
    </div>
  );
}
