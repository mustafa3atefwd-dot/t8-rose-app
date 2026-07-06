"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import type { FieldStateProps } from "./field-shell";

const otpBoxClass = cva([
  "size-12 rounded-lg border border-ds-border-soft bg-transparent text-center text-heading-md font-semibold text-ds-text-plain transition-colors outline-none md:size-11",
  "dark:bg-ds-bg-soft/30",
  "focus-visible:border-ds-border-primary focus-visible:ring-3 focus-visible:ring-ds-ring",
  "disabled:pointer-events-none disabled:bg-ds-bg-muted disabled:opacity-50",
  "data-[invalid=true]:border-ds-border-danger data-[invalid=true]:focus-visible:ring-ds-ring-danger",
  "data-[success=true]:border-ds-border-success",
]);

type OtpInputProps = FieldStateProps & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every box is filled. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  className?: string;
  /** Base aria-label; the box index is appended, e.g. "Digit 1". */
  digitLabel?: string;
  id?: string;
};

/** N single-digit boxes with auto-advance, backspace-to-previous and paste. */
function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  disabled,
  invalid,
  success,
  autoFocus,
  name,
  className,
  digitLabel = "Digit",
  id,
}: OtpInputProps) {
  // Dense-string model (the standard OTP behaviour): the code is a left-packed
  // string of digits, so there is a single source of truth and no gaps to track.
  // Controlled via `value`/`onChange`, otherwise internal.
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const code = isControlled ? value : internal;
  const digits = Array.from({ length }, (_, i) => code[i] ?? "");

  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const focusBox = (i: number) => refs.current[i]?.focus();

  const commit = (next: string[]) => {
    // join() drops empty slots, keeping the code left-packed (dense).
    const joined = next.join("");
    if (!isControlled) setInternal(joined);
    onChange?.(joined);
    if (joined.length === length) {
      onComplete?.(joined);
    }
  };

  const setDigit = (i: number, digit: string) => {
    const next = [...digits];
    next[i] = digit;
    commit(next);
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    // Only digits; take the last typed character so overwriting a full box works.
    const onlyDigits = e.target.value.replace(/\D/g, "");
    if (!onlyDigits) {
      setDigit(i, "");
      return;
    }
    setDigit(i, onlyDigits[onlyDigits.length - 1]);
    if (i < length - 1) focusBox(i + 1);
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        setDigit(i, "");
      } else if (i > 0) {
        setDigit(i - 1, "");
        focusBox(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      focusBox(i + 1);
    }
  };

  const handlePaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length - i);
    if (!pasted) return;
    const next = [...digits];
    for (let k = 0; k < pasted.length; k++) next[i + k] = pasted[k];
    commit(next);
    focusBox(Math.min(i + pasted.length, length - 1));
  };

  return (
    // OTP codes are entered left-to-right even in RTL locales, so the group is
    // pinned to LTR — box 1 is always on the left.
    <div dir="ltr" className={cn("flex items-center gap-2", className)}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          id={i === 0 ? id : undefined}
          name={name ? `${name}-${i}` : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          pattern="\d*"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          disabled={disabled}
          data-invalid={invalid || undefined}
          data-success={success || undefined}
          aria-invalid={invalid || undefined}
          aria-label={`${digitLabel} ${i + 1}`}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
          className={otpBoxClass()}
        />
      ))}
    </div>
  );
}

export { OtpInput };
export type { OtpInputProps };
