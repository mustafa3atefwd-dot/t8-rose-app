import { ProductForm } from '@/features/products/admin';
import { getCategoriesAction, getOccasionsAction } from '@/features/products/lib/actions';
import { getTranslations } from 'next-intl/server';

export default async function NewProductPage() {
  // Translation
  const t = await getTranslations('productsAdmin');

  // Query
  const [categoriesResult, occasionsResult] = await Promise.all([
    getCategoriesAction({ limit: 100 }),
    getOccasionsAction({ limit: 100 }),
  ]);

  // Variables
  const categories = categoriesResult.status ? (categoriesResult.payload?.data ?? []) : [];
  const occasions = occasionsResult.status ? (occasionsResult.payload?.data ?? []) : [];

  return (
    <div className="bg-ds-bg-subtle min-h-screen">
      <main className="p-4 md:p-6">
        <h1 className="text-ds-text-plain mb-6 truncate text-2xl font-semibold">{t('form.addTitle')}</h1>
        <ProductForm mode="create" categories={categories} occasions={occasions} />
      </main>
    </div>
  );
}
