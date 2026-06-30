"use client";

import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          disabled={disabled}
          aria-label={countryLabel}
          className="flex shrink-0 items-center gap-1 rounded-base text-body-sm font-medium text-foreground outline-none disabled:pointer-events-none"
        >
          <span className="text-base leading-none" aria-hidden>
            {country.flag}
          </span>
          <span className="tabular-nums">
            {country.code} ({country.dial})
          </span>
          <ChevronDownIcon className="size-3.5 text-text-muted" aria-hidden />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={8}
            className="z-50 max-h-64 min-w-56 overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-card p-1 text-card-foreground shadow-soft-lg"
          >
            {countries.map((c) => (
              <DropdownMenu.Item
                key={c.code}
                onSelect={() => {
                  setCountry(c);
                  emit(c, national);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-base px-2 py-1.5 text-body-sm outline-none data-[highlighted]:bg-background-muted"
              >
                <span className="text-base leading-none" aria-hidden>
                  {c.flag}
                </span>
                <span className="grow truncate">{c.name}</span>
                <span className="text-text-muted tabular-nums">{c.dial}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <span className="h-5 w-px shrink-0 bg-border" aria-hidden />

      <input
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
