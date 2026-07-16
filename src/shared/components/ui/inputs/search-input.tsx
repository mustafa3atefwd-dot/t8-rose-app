import * as React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Input } from "./input";
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
      <SearchIcon className="size-4 shrink-0 text-ds-text-muted" aria-hidden />
      <Input
        type="search"
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
