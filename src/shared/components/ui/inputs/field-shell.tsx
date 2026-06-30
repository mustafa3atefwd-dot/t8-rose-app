import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

// Shell used by every "adorned" variant (search, password, number, phone,
// file). The border, focus ring and state colours live on the container so the
// adornments (icons, buttons, dropdowns) sit *inside* the border and the focus
// ring wraps the whole control. State is driven by `data-*` attributes so the
// same shell serves valid / invalid / success / disabled. All colours are
// semantic tokens, so light/dark flip automatically.
const fieldShellVariants = cva(
  [
    "group/field flex w-full min-w-0 items-center gap-2 rounded-lg border border-border bg-transparent px-3 text-base transition-colors outline-none md:text-sm",
    "dark:bg-input/30",
    "focus-within:border-primary focus-within:ring-3 focus-within:ring-ring-default",
    "data-[success=true]:border-success",
    "data-[invalid=true]:border-danger data-[invalid=true]:focus-within:border-danger data-[invalid=true]:focus-within:ring-ring-danger",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:bg-background-muted data-[disabled=true]:opacity-50",
  ],
  {
    variants: {
      sizing: {
        default: "h-10",
        lg: "h-11",
      },
    },
    defaultVariants: { sizing: "default" },
  },
);

// The bare <input> rendered inside a shell — it has no border/ring of its own.
const innerInputClass =
  "h-full w-full grow bg-transparent p-0 text-foreground outline-none placeholder:text-text-muted disabled:cursor-not-allowed";

// A small icon-button adornment (eye toggle, steppers, …).
const adornmentButtonClass =
  "grid shrink-0 place-items-center rounded-base text-text-muted outline-none transition-colors hover:text-foreground focus-visible:text-foreground disabled:pointer-events-none";

type FieldStateProps = {
  /** Render the error (red border + danger ring) treatment. */
  invalid?: boolean;
  /** Render the success (green border) treatment. */
  success?: boolean;
};

function FieldShell({
  className,
  invalid,
  success,
  disabled,
  sizing,
  children,
  ...props
}: React.ComponentProps<"div"> &
  FieldStateProps &
  VariantProps<typeof fieldShellVariants> & { disabled?: boolean }) {
  return (
    <div
      data-slot="input-shell"
      data-invalid={invalid || undefined}
      data-success={success || undefined}
      data-disabled={disabled || undefined}
      className={cn(fieldShellVariants({ sizing }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  FieldShell,
  fieldShellVariants,
  innerInputClass,
  adornmentButtonClass,
};
export type { FieldStateProps };
