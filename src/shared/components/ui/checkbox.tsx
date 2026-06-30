"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  /** Pass `"indeterminate"` for the mixed state (e.g. a partly-selected parent). */
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  /** Fires with the resolved boolean (an indeterminate checkbox toggles to a boolean). */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
};

/**
 * Checkbox supporting checked, unchecked, indeterminate and disabled states.
 * Pass `checked="indeterminate"` (or the `indeterminate` prop) for the mixed
 * state — e.g. a parent whose children are only partly selected.
 *
 * Base UI models indeterminate as a separate `indeterminate` prop rather than a
 * third `checked` value, so this wrapper adapts the ergonomic Radix-style
 * `checked="indeterminate"` API onto it.
 */
function Checkbox({
  className,
  checked,
  defaultChecked,
  indeterminate,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const isIndeterminate = indeterminate ?? checked === "indeterminate";

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked === "indeterminate" ? false : checked}
      defaultChecked={defaultChecked}
      indeterminate={isIndeterminate}
      onCheckedChange={
        onCheckedChange ? (value) => onCheckedChange(value) : undefined
      }
      className={cn(
        "group/checkbox peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-border bg-transparent text-text-inverse transition-colors outline-none",
        "dark:bg-input/30",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring-default",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-checked:border-primary data-checked:bg-primary",
        "data-indeterminate:border-primary data-indeterminate:bg-primary",
        "aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        {/* Base UI mounts the indicator for both checked and indeterminate; pick
            the glyph from the Root's state data-attributes. */}
        <CheckIcon className="hidden size-3.5 group-data-checked/checkbox:block" />
        <MinusIcon className="hidden size-3.5 group-data-indeterminate/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
