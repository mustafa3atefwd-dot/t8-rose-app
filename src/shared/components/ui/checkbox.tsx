"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

/**
 * Checkbox supporting checked, unchecked, indeterminate and disabled states.
 * Pass `checked="indeterminate"` (or the `indeterminate` value from Radix) for
 * the mixed state — e.g. a parent whose children are only partly selected.
 * `onCheckedChange` fires with the boolean (or "indeterminate") value.
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/checkbox peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-border bg-transparent text-text-inverse transition-colors outline-none",
        "dark:bg-input/30",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring-default",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        "aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        {/* Radix mounts the indicator for both checked and indeterminate; pick
            the glyph from the Root's data-state. */}
        <CheckIcon className="hidden size-3.5 group-data-[state=checked]/checkbox:block" />
        <MinusIcon className="hidden size-3.5 group-data-[state=indeterminate]/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
