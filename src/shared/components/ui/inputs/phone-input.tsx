'use client';

import * as React from 'react';
import { Menu } from '@base-ui/react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Input } from './input';
import { FieldShell, innerInputClass, type FieldStateProps } from './field-shell';
import { DEFAULT_COUNTRIES, isValidE164, type Country } from './countries';
import { useTranslations } from 'next-intl';

type PhoneInputProps = FieldStateProps & {
  countries?: Country[];
  defaultCountry?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;

  value?: string; // <-- add
  countryCode?: string; // <-- add

  /** Fires with the full E.164 string and whether it is valid. */
  onValueChange?: (value: string, meta: { country: Country; national: string; isValid: boolean }) => void;
  className?: string;
  id?: string;
  name?: string;
  countryLabel?: string;
};

function getFlagUrl(country: Country) {
  return (
    country.flagUrl ?? (country.code.length === 2 ? `https://flagcdn.com/${country.code.toLowerCase()}.svg` : undefined)
  );
}

function CountryFlag({ country }: { country: Country }) {
  const flagUrl = getFlagUrl(country);

  if (flagUrl) {
    return (
      <span
        aria-hidden
        className="block h-4 w-6 shrink-0 rounded-[2px] bg-cover bg-center shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
        style={{ backgroundImage: `url(${flagUrl})` }}
      />
    );
  }

  return country.flag ? (
    <span className="text-base leading-none" aria-hidden>
      {country.flag}
    </span>
  ) : null;
}

/** Phone input with a country flag + dial-code dropdown and E.164 validation. */
function PhoneInput({
  countries = DEFAULT_COUNTRIES,
  defaultCountry = 'EG',
  defaultValue = '',
  value = '',
  countryCode,
  disabled,
  invalid,
  success,
  placeholder = 'Phone number',
  onValueChange,
  className,
  id,
  name,
  countryLabel = 'Select country',
}: PhoneInputProps) {
  const t = useTranslations('input.placeholders');
  const [country, setCountry] = React.useState<Country>(
    () => countries.find((c) => c.code === defaultCountry) ?? countries[0]
  );

  const [national, setNational] = React.useState(defaultValue);

  // Sync from the controlled `value` prop during render rather than in an
  // effect, so the input never paints a stale number first.
  const [previousValue, setPreviousValue] = React.useState(value);

  if (value !== previousValue) {
    setPreviousValue(value);

    const nextCountry = value ? countries.find((c) => value.startsWith(c.dial)) : undefined;

    if (nextCountry) {
      setCountry(nextCountry);
      setNational(value.replace(nextCountry.dial, ''));
    }
  }

  const emit = (next: Country, nextNational: string) => {
    const digits = nextNational.replace(/\D/g, '');
    const full = `${next.dial}${digits}`;
    onValueChange?.(full, {
      country: next,
      national: digits,
      isValid: isValidE164(full),
    });
  };

  return (
    <FieldShell invalid={invalid} success={success} disabled={disabled} dir="ltr" className={cn('h-11.5', className)}>
      <Menu.Root>
        <Menu.Trigger
          disabled={disabled}
          aria-label={countryLabel}
          className="rounded-base text-body-sm text-ds-text-plain flex shrink-0 items-center gap-1 font-medium outline-none disabled:pointer-events-none"
        >
          <CountryFlag country={country} />
          <span className="tabular-nums">
            {country.code} ({country.dial})
          </span>
          <ChevronDownIcon className="text-ds-text-muted size-3.5" aria-hidden />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="start" sideOffset={8} className="z-50">
            <Menu.Popup className="border-ds-border-soft bg-ds-bg-plain text-ds-text-plain shadow-soft-lg max-h-64 min-w-56 overflow-x-hidden overflow-y-auto rounded-lg border p-1 outline-none">
              {countries.map((c) => (
                <Menu.Item
                  key={c.code}
                  onClick={() => {
                    setCountry(c);
                    emit(c, national);
                  }}
                  className="rounded-base text-body-sm data-[highlighted]:bg-ds-bg-muted flex cursor-pointer items-center gap-2 px-2 py-1.5 outline-none"
                >
                  <CountryFlag country={c} />
                  <span className="grow truncate">{c.name}</span>
                  <span className="text-ds-text-muted tabular-nums">{c.dial}</span>
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <span className="bg-ds-border-soft h-5 w-px shrink-0" aria-hidden />

      <Input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        dir="ltr"
        autoComplete="tel-national"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        placeholder={t('phone')}
        value={national}
        onChange={(e) => {
          setNational(e.target.value);
          emit(country, e.target.value);
        }}
        className={cn(innerInputClass, 'text-start')}
      />
    </FieldShell>
  );
}

export { PhoneInput };
export type { PhoneInputProps };
