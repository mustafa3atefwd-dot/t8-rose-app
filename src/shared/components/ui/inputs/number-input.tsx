"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  FieldShell,
  adornmentButtonClass,
  innerInputClass,
  type FieldStateProps,
} from "./field-shell";

type NumberInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> &
  FieldStateProps & {
    value?: number | "";
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number | null) => void;
    incrementLabel?: string;
    decrementLabel?: string;
  };

/** Numeric input with a numeric keyboard and up/down steppers (clamped). */
function NumberInput({
  className,
  invalid,
  success,
  disabled,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  onValueChange,
  incrementLabel = "Increment",
  decrementLabel = "Decrement",
  ...props
}: NumberInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string>(
    defaultValue != null ? String(defaultValue) : "",
  );
  const current = isControlled ? (value === "" ? "" : String(value)) : internal;

  const clamp = (n: number) => {
    if (min != null) n = Math.max(n, min);
    if (max != null) n = Math.min(n, max);
    return n;
  };

  const commit = (raw: string) => {
    if (!isControlled) setInternal(raw);
    onValueChange?.(raw === "" ? null : Number(raw));
  };

  const adjust = (direction: 1 | -1) => {
    const base = current === "" ? 0 : Number(current);
    if (Number.isNaN(base)) return;
    commit(String(clamp(base + direction * step)));
  };

  return (
    <FieldShell
      invalid={invalid}
      success={success}
      disabled={disabled}
      className={className}
    >
      <input
        type="number"
        inputMode="numeric"
        data-slot="input"
        disabled={disabled}
        value={current}
        min={min}
        max={max}
        step={step}
        aria-invalid={invalid || undefined}
        onChange={(e) => commit(e.target.value)}
        className={cn(
          innerInputClass,
          // Hide the browser's native spinner — we provide our own steppers.
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
        {...props}
      />
      <div className="flex shrink-0 flex-col">
        <button
          type="button"
          tabIndex={-1}
          aria-label={incrementLabel}
          disabled={disabled || (max != null && Number(current || 0) >= max)}
          onClick={() => adjust(1)}
          className={cn(adornmentButtonClass, "h-1/2 px-0.5")}
        >
          <ChevronUpIcon className="size-3.5" aria-hidden />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={decrementLabel}
          disabled={disabled || (min != null && Number(current || 0) <= min)}
          onClick={() => adjust(-1)}
          className={cn(adornmentButtonClass, "h-1/2 px-0.5")}
        >
          <ChevronDownIcon className="size-3.5" aria-hidden />
        </button>
      </div>
    </FieldShell>
  );
}

export { NumberInput };
export type { NumberInputProps };
