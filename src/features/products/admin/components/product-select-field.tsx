'use client';

import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import type { ProductAdminForm } from '../lib/product-form.schema';
import type { ProductFormOption } from '../lib/types';
import { ProductFormField } from './product-form-field';

type ProductSelectFieldProps = { form: ProductAdminForm; name: 'categoryId' | 'occasionId'; label: string; placeholder: string; options: ProductFormOption[]; error?: string };

export function ProductSelectField({ form, name, label, placeholder, options, error }: ProductSelectFieldProps) {
  // Variables
  const items = options.map(({ id, title }) => ({ value: id, label: title }));
  return <ProductFormField label={label} required error={error} className="md:col-span-3">
    <Controller control={form.control} name={name} render={({ field }) => <Select items={items} value={field.value || null} onValueChange={(value) => field.onChange(value ?? '')}>
      <SelectTrigger aria-invalid={Boolean(error)} className="bg-ds-bg-plain hover:border-ds-border-default data-popup-open:border-ds-border-primary data-popup-open:ring-ds-ring/50 w-full px-4 transition-shadow data-popup-open:ring-3"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent position="popper" align="start" className="border-ds-border-muted max-h-72 min-w-(--anchor-width) border shadow-lg">
        {options.map((option) => <SelectItem key={option.id} value={option.id} className="cursor-pointer rounded-md">{option.title}</SelectItem>)}
      </SelectContent>
    </Select>} />
  </ProductFormField>;
}
