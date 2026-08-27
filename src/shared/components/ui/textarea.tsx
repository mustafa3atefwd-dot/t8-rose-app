'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

function Textarea({ className, maxLength, value, defaultValue, onChange, ...props }: React.ComponentProps<'textarea'>) {
  const t = useTranslations();

  // State
  const [internalValue, setInternalValue] = React.useState(String(defaultValue ?? ''));

  const currentValue = value ?? internalValue;
  const currentLength = String(currentValue).length;

  // Functions
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }

    onChange?.(e);
  };

  return (
    <div className="w-full">
      <textarea
        data-slot="textarea"
        {...(maxLength ? { maxLength } : {})}
        value={currentValue}
        onChange={handleChange}
        className={cn(
          'flex field-sizing-content min-h-37.5 w-full px-2.5 py-2 md:text-sm',
          'bg-ds-bg-plain rounded-lg outline-none',
          'not-disabled:border-ds-border-soft not-disabled:border',
          'placeholder:text-ds-text-muted',
          'hover:not-disabled:not-focus:border-ds-border-default',
          'focus:border-ds-border-primary',
          'focus-visible:ring-ds-ring focus-visible:ring-3',
          'disabled:cursor-not-allowed',
          'disabled:bg-ds-bg-muted',
          'disabled:text-ds-text-muted',
          'aria-invalid:border-border-danger',
          'aria-invalid:ring-ring-danger',
          'text-ds-text-plain text-base',
          'transition-colors',
          className
        )}
        {...props}
      />

      {maxLength !== undefined && (
        <div className="text-ds-text-soft mt-1 text-end text-xs">
          {t('textarea.charCount', {
            current: currentLength,
            max: maxLength,
          })}
        </div>
      )}
    </div>
  );
}

export { Textarea };
