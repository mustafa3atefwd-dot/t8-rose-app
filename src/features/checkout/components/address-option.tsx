import { Phone } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface IAddressOptionProps {
  id: string;
  title: string;
  street: string;
  city: string;
  phone: string;
  checked: boolean;
  onChange: () => void;
}

export default function AddressOption({ id, title, street, city, phone, checked, onChange }: IAddressOptionProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'relative flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-xl border p-4 transition-all',
        checked
          ? 'bg-ds-bg-primary-saturated text-ds-text-inverse shadow-md'
          : 'border-ds-border-soft hover:border-ds-border-soft/80 text-ds-text-plain'
      )}
    >
      {/* Hidden radio input */}
      <input
        id={id}
        name="addressId"
        type="radio"
        value={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      {/* Address details */}
      <div className="space-y-1">
        {/* Address title */}
        <h3 className="text-base font-semibold md:text-lg lg:text-xl xl:text-2xl">{title}</h3>

        {/* Address street and city */}
        <p className={cn('rounded-4xl px-3 py-0.5 text-sm', checked ? 'bg-ds-bg-inverse' : 'bg-ds-bg-muted')}>
          {street}, {city}
        </p>
      </div>

      {/* Contact information */}
      <div className="dir-ltr flex items-center gap-2">
        {/* Phone icon */}
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8',
            checked ? 'text-ds-bg-primary-saturated bg-ds-bg-plain' : 'bg-ds-bg-primary-saturated text-ds-text-inverse'
          )}
          aria-hidden="true"
        >
          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
        </span>

        {/* Phone number */}
        <span className={cn('text-sm font-medium sm:text-lg', checked ? 'text-ds-text-inverse' : 'text-ds-text-soft')}>
          {phone}
        </span>
      </div>
    </label>
  );
}
