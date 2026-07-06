import * as React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  FieldShell,
  innerInputClass,
  type FieldStateProps,
} from "./field-shell";

/** Text input with a leading search icon. */
function SearchInput({
  className,
  invalid,
  success,
  disabled,
  ...props
}: React.ComponentProps<"input"> & FieldStateProps) {
  return (
    <FieldShell
      invalid={invalid}
      success={success}
      disabled={disabled}
      className={className}
    >
      <SearchIcon className="size-4 shrink-0 text-text-muted" aria-hidden />
      <input
        type="search"
        data-slot="input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          innerInputClass,
          "[&::-webkit-search-cancel-button]:appearance-none",
        )}
        {...props}
      />
    </FieldShell>
  );
}

export { SearchInput };
