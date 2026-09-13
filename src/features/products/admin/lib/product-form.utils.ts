import type { IProductDetail } from '@/features/products/lib/types';
import type { ProductFormInput, ProductFormValues } from './product-form.schema';
import { ProductMutationInput } from './types';



export function parseProductGallery(gallery?: unknown): string[] {
  if (!gallery) return [];
  if (Array.isArray(gallery)) return gallery.filter((img): img is string => typeof img === 'string');
  try {
    const parsed: unknown = JSON.parse(String(gallery));
    return Array.isArray(parsed) ? parsed.filter((img): img is string => typeof img === 'string') : [];
  } catch {
    return [];
  }
}

export function getProductFormDefaults(product?: IProductDetail): ProductFormInput {
  const occasion = Array.isArray(product?.occasions) && product.occasions.length > 0
    ? (product.occasions[0] as { id?: string })
    : undefined;

  return {
    title: product?.title ?? '',
    description: product?.description ?? '',
    price: product ? Number(product.price) : ('' as unknown as number),
    discountValue: product?.discountValue ? Number(product.discountValue) : '',
    stock: product?.stock ?? ('' as unknown as number),
    categoryId: product?.categoryId ?? '',
    occasionId: occasion?.id ?? '',
  };
}

export function buildProductPayload(
  values: ProductFormValues,
  cover: string | null,
  gallery: string[]
): ProductMutationInput {
  const discountVal =
    values.discountValue === '' || values.discountValue == null
      ? null
      : Number(values.discountValue);

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    stock: Number(values.stock),
    price: Number(values.price),
    discountType: discountVal && discountVal > 0 ? 'FIXED' : null,
    discountValue: discountVal,
    categoryId: values.categoryId,
    occasionId: values.occasionId || undefined,
    cover,
    gallery,
  };
}