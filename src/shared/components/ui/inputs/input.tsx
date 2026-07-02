import * as React from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Standalone styled input. Carries its own border/focus ring so it can be used
 * on its own for the Default, Email and plain Number text variants. Set
 * `aria-invalid` (the `InputField` wrapper does this for you) for the error
 * treatment.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-lg border border-ds-border-soft bg-transparent px-3 py-1 text-base text-ds-text-plain transition-colors outline-none md:text-sm",
        "placeholder:text-ds-text-muted",
        "dark:bg-ds-bg-soft/30",
        "focus-visible:border-ds-border-primary focus-visible:ring-3 focus-visible:ring-ds-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-muted disabled:opacity-50",
        "aria-invalid:border-ds-border-danger aria-invalid:focus-visible:ring-ds-ring-danger",
        "data-[success=true]:border-ds-border-success",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
