"use client";

import * as React from "react";
import { Menu } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Input } from "./input";
import {
  FieldShell,
  innerInputClass,
  type FieldStateProps,
} from "./field-shell";
import { DEFAULT_COUNTRIES, isValidE164, type Country } from "./countries";

type PhoneInputProps = FieldStateProps & {
  countries?: Country[];
  defaultCountry?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  /** Fires with the full E.164 string and whether it is valid. */
  onValueChange?: (
    value: string,
    meta: { country: Country; national: string; isValid: boolean },
  ) => void;
  className?: string;
  id?: string;
  name?: string;
  countryLabel?: string;
};

function getFlagUrl(country: Country) {
  return (
    country.flagUrl ??
    (country.code.length === 2
      ? `https://flagcdn.com/${country.code.toLowerCase()}.svg`
      : undefined)
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
  defaultCountry = "EG",
  defaultValue = "",
  disabled,
  invalid,
  success,
  placeholder = "Phone number",
  onValueChange,
  className,
  id,
  name,
  countryLabel = "Select country",
}: PhoneInputProps) {
  const [country, setCountry] = React.useState<Country>(
    () => countries.find((c) => c.code === defaultCountry) ?? countries[0],
  );
  const [national, setNational] = React.useState(defaultValue);

  const emit = (next: Country, nextNational: string) => {
    const digits = nextNational.replace(/\D/g, "");
    const full = `${next.dial}${digits}`;
    onValueChange?.(full, {
      country: next,
      national: digits,
      isValid: isValidE164(full),
    });
  };

  return (
    <FieldShell
      invalid={invalid}
      success={success}
      disabled={disabled}
      className={className}
    >
      <Menu.Root>
        <Menu.Trigger
          disabled={disabled}
          aria-label={countryLabel}
          className="flex shrink-0 items-center gap-1 rounded-base text-body-sm font-medium text-ds-text-plain outline-none disabled:pointer-events-none"
        >
          <CountryFlag country={country} />
          <span className="tabular-nums">
            {country.code} ({country.dial})
          </span>
          <ChevronDownIcon className="size-3.5 text-ds-text-muted" aria-hidden />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="start" sideOffset={8} className="z-50">
            <Menu.Popup className="max-h-64 min-w-56 overflow-x-hidden overflow-y-auto rounded-lg border border-ds-border-soft bg-ds-bg-plain p-1 text-ds-text-plain shadow-soft-lg outline-none">
              {countries.map((c) => (
                <Menu.Item
                  key={c.code}
                  onClick={() => {
                    setCountry(c);
                    emit(c, national);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-base px-2 py-1.5 text-body-sm outline-none data-[highlighted]:bg-ds-bg-muted"
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

      <span className="h-5 w-px shrink-0 bg-ds-border-soft" aria-hidden />

      <Input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        dir="ltr"
        autoComplete="tel-national"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        placeholder={placeholder}
        value={national}
        onChange={(e) => {
          setNational(e.target.value);
          emit(country, e.target.value);
        }}
        className={cn(innerInputClass, "text-start")}
      />
    </FieldShell>
  );
}

export { PhoneInput };
export type { PhoneInputProps };
