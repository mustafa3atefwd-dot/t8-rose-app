import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { cn } from '@/shared/lib/utils';

type ProductFormFieldProps = { label: string; children: React.ReactNode; error?: string; required?: boolean; className?: string };

export function ProductFormField({ label, children, error, required, className }: ProductFormFieldProps) {
  return <Field data-invalid={Boolean(error)} className={cn('min-w-0 gap-1.5', className)}>
    <FieldLabel className={error ? 'text-ds-text-danger' : undefined}>{label}{required && <span className="text-ds-text-danger" aria-hidden>*</span>}</FieldLabel>
    {children}
    <FieldError>{error}</FieldError>
  </Field>;
}
