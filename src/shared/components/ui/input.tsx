import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-ds-border-muted bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ds-text-plain placeholder:text-ds-text-muted focus-visible:border-ds-border-primary focus-visible:ring-3 focus-visible:ring-ds-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-soft/50 disabled:opacity-50 aria-invalid:border-ds-border-danger aria-invalid:ring-3 aria-invalid:ring-ds-ring-danger/20 md:text-sm dark:bg-ds-bg-soft/30 dark:disabled:bg-ds-bg-soft/80 dark:aria-invalid:border-ds-border-danger/50 dark:aria-invalid:ring-ds-ring-danger/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
