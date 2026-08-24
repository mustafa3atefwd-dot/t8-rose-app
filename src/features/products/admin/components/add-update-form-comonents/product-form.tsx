'use client';

import type { IProductDetail } from '@/features/products/lib/types';
import { Button } from '@/shared/components/ui/button';
import { useProductForm, type ProductFormMode } from '../../hooks/use-product-form';
import type { ProductFormOption } from '../../lib/types';
import { ProductDetailsFields } from './product-details-fields';
import { ProductMediaFields } from './product-media-fields';

type ProductFormProps = {
  mode: ProductFormMode;
  categories: ProductFormOption[];
  occasions: ProductFormOption[];
  product?: IProductDetail;
};

export default function ProductForm({ mode, categories, occasions, product }: ProductFormProps) {
  // Custom hooks
  const productForm = useProductForm({ mode, product });

  // Variables
  const { form, t } = productForm;

  return (
    <form
      onSubmit={productForm.submitProduct}
      noValidate
      className="bg-ds-bg-plain flex min-h-[calc(100vh-12rem)] w-full  flex-col rounded-2xl p-6"
    >
      <div className="grid gap-4 max-w-3/5 md:grid-cols-3">
        <ProductDetailsFields
          form={form}
          categories={categories}
          occasions={occasions}
          discountedPrice={productForm.discountedPrice}
          translateError={productForm.translateError}
        
        >
          <ProductMediaFields
            mode={mode}
            product={product}
            existingGallery={productForm.existingGallery}
            coverError={productForm.coverError}
            galleryError={productForm.galleryError}
            onCoverChange={productForm.handleCoverChange}
            onGalleryChange={productForm.handleGalleryChange}
            onCoverError={productForm.handleCoverError}
            onGalleryError={productForm.handleGalleryError}
          />
        </ProductDetailsFields>
      </div>

      <Button
        type="submit"
        loading={form.formState.isSubmitting}
        loadingText={t('actions.saving')}
        className="mt-12 max-w-3/5"
      >
        {mode === 'edit' ? t('actions.update') : t('actions.add')}
      </Button>
    </form>
  );
}
