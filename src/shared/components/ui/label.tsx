import * as React from "react"

import { cn } from "@/shared/lib/utils"

// Base UI has no Label primitive (unlike Radix), so this renders a native
// <label>. The styling and `data-slot` contract are unchanged.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
