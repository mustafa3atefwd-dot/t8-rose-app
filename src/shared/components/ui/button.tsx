import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/components/ui/spinner";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none",
    "focus-visible:ring-3 focus-visible:ring-ring-default",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        // Solid brand fill. primary / primary-hover / text-inverse flip for dark
        // mode automatically — no `dark:` overrides needed.
        default: "bg-primary text-text-inverse hover:bg-primary-hover",
        // Soft primary-tinted fill for a lower-emphasis action.
        secondary:
          "bg-background-primary-fade text-text-primary hover:bg-background-primary-faint",
        outline:
          "border-border bg-background text-foreground hover:bg-background-muted dark:bg-input/30 dark:hover:bg-input/50",
        ghost: "text-foreground hover:bg-background-muted dark:hover:bg-input/50",
        // Red scheme for irreversible / dangerous actions.
        destructive:
          "bg-danger text-text-inverse hover:bg-background-danger-saturated focus-visible:ring-ring-danger",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem]",
        lg: "h-9 px-4",
        // Square icon-only buttons.
        icon: "size-8",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-md",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Shows a spinner, disables the button and (optionally) swaps the label. */
    loading?: boolean;
    /** Label shown while `loading` (e.g. "Loading…"). Falls back to children. */
    loadingText?: React.ReactNode;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      // Native <button> gets `disabled`; an asChild element (e.g. <a>) can't, so
      // it relies on `aria-disabled` + the `aria-disabled:*` utilities above.
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={asChild && isDisabled ? true : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <Spinner className="size-4" /> : null}
          {loading && loadingText != null ? loadingText : children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
