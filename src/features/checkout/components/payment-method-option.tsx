import { PaymentMethod } from '@/features/orders/lib/types';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface IPaymentMethodOptionProps {
  id: string;
  name: string;
  value: PaymentMethod;
  checked: boolean;
  disabled?: boolean;

  title: string;
  description: string;
  icon: ReactNode;

  onChange: (value: PaymentMethod) => void;
}

export function PaymentMethodOption({
  id,
  name,
  value,
  checked,
  disabled = false,
  title,
  description,
  icon,
  onChange,
}: IPaymentMethodOptionProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'border-ds-border-muted flex cursor-pointer flex-col items-center rounded-xl border p-6 text-center transition-all duration-200',
        checked && 'bg-ds-bg-subtle',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {/* Hidden radio input */}
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      {/* Payment method icon */}
      <div aria-hidden="true" className="mb-6 flex items-center justify-center">
        {icon}
      </div>

      {/* Payment method title */}
      <h3
        className={cn(
          'text-lg font-semibold lg:text-xl xl:text-2xl',
          checked ? 'text-ds-bg-primary-saturated' : 'text-ds-text-plain'
        )}
      >
        {title}
      </h3>

      {/* Payment method description */}
      <p className="text-ds-text-soft mt-2 text-sm">{description}</p>
    </label>
  );
}
