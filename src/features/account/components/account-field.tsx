import { Input } from '@/shared/components/ui/inputs/input';
import { cn } from '@/shared/lib/utils';

type AccountFieldProps = Omit<React.ComponentProps<typeof Input>, 'className'> & {
  label: string;
  className?: string;
  inputClassName?: string;
};

export function AccountField({ label, className, inputClassName, ...props }: AccountFieldProps) {
  return (
    <label className={cn('text-ds-text-plain grid gap-2 text-sm font-medium', className)}>
      {label}
      <Input className={inputClassName} {...props} />
    </label>
  );
}
