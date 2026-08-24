import { ProductsAdminTable } from '@/features/products/admin';

export default async function DashboardProductsPage() {
  return (
    <div className="bg-ds-bg-subtle min-h-screen">
      <main className="p-0 md:p-6">
        <ProductsAdminTable />
      </main>
    </div>
  );
}
