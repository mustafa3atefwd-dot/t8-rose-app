"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  FieldShell,
  adornmentButtonClass,
  innerInputClass,
  type FieldStateProps,
} from "./field-shell";

type PasswordInputProps = React.ComponentProps<"input"> &
  FieldStateProps & {
    /** aria-label for the toggle when the password is hidden. */
    showLabel?: string;
    /** aria-label for the toggle when the password is visible. */
    hideLabel?: string;
  };

/** Password input with a show/hide eye toggle that switches the input type. */
function PasswordInput({
  className,
  invalid,
  success,
  disabled,
  showLabel = "Show password",
  hideLabel = "Hide password",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <FieldShell
      invalid={invalid}
      success={success}
      disabled={disabled}
      className={className}
    >
      <input
        type={visible ? "text" : "password"}
        data-slot="input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={innerInputClass}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        disabled={disabled}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        className={cn(adornmentButtonClass, "size-6")}
      >
        {visible ? (
          <EyeOffIcon className="size-4" aria-hidden />
        ) : (
          <EyeIcon className="size-4" aria-hidden />
        )}
      </button>
    </FieldShell>
  );
}

export { PasswordInput };
export type { PasswordInputProps };
