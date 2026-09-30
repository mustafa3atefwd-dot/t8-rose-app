import { ProductsAdminTable } from '@/features/products/admin';
import { getInitialAdminProducts } from '@/features/products/admin/lib/products-admin.server';

export default async function DashboardProductsPage() {
  // Query
  const initialProducts = await getInitialAdminProducts();

  return (
    <div className="bg-ds-bg-subtle min-h-screen">
      <main className="p-0 md:p-6">
        <ProductsAdminTable initialProducts={initialProducts} />
      </main>
    </div>
  );
}
