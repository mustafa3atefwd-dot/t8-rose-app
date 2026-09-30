import { useId } from 'react';

import { Input } from '@/shared/components/ui/inputs/input';
import { cn } from '@/shared/lib/utils';

type AccountFieldProps = Omit<React.ComponentProps<typeof Input>, 'className'> & {
  label: string;
  className?: string;
  inputClassName?: string;
  error?: string;
};

export function AccountField({ label, className, inputClassName, error, id, ...props }: AccountFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn('grid gap-2', className)}>
      <label htmlFor={inputId} className="text-ds-text-plain text-sm font-medium">
        {label}
      </label>
      <Input
        id={inputId}
        className={inputClassName}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-ds-text-danger text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
