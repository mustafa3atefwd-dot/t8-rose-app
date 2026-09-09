"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/components/ui/spinner";

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none hover:cursor-pointer',
    'focus-visible:ring-3 focus-visible:ring-ds-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        // Solid brand fill. primary / primary-hover / text-inverse flip for dark
        // mode automatically — no `dark:` overrides needed.
        default: 'bg-ds-bg-primary-saturated text-ds-text-inverse hover:bg-ds-bg-primary',
        // Soft primary-tinted fill for a lower-emphasis action.
        secondary: 'bg-ds-bg-primary-fade text-ds-text-primary hover:bg-ds-bg-primary-faint',
        outline:
          'border-ds-border-soft bg-ds-bg-plain text-ds-text-plain hover:bg-ds-bg-muted dark:bg-ds-bg-soft/30 dark:hover:bg-ds-bg-soft/50',
        ghost: 'text-ds-text-plain hover:bg-ds-bg-muted dark:hover:bg-ds-bg-soft/50',
        // Red scheme for irreversible / dangerous actions.
        destructive:
          'bg-ds-bg-danger text-ds-text-inverse hover:bg-ds-bg-danger-saturated focus-visible:ring-ds-ring-danger',
        link: 'text-ds-text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-3',
        xs: 'h-6 gap-1 rounded-md px-2 text-xs',
        sm: 'h-7 gap-1 rounded-md px-2.5 text-[0.8rem]',
        lg: 'h-9 px-4',
        // Square icon-only buttons.
        icon: 'size-8',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-7 rounded-md',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
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
  const isDisabled = disabled || loading;

  // Base UI's `useRender` replaces Radix's `Slot` for the `asChild` pattern.
  return useRender({
    render: asChild ? (children as React.ReactElement) : <button />,
    props: {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      "data-loading": loading || undefined,
      "aria-busy": loading || undefined,
      // Native <button> gets `disabled`; an asChild element (e.g. <a>) can't, so
      // it relies on `aria-disabled` + the `aria-disabled:*` utilities above.
      disabled: asChild ? undefined : isDisabled,
      "aria-disabled": asChild && isDisabled ? true : undefined,
      className: cn(buttonVariants({ variant, size }), className),
      // An asChild element keeps its own children; otherwise inject the spinner.
      ...(asChild
        ? {}
        : {
            children: (
              <>
                {loading ? <Spinner className="size-4" /> : null}
                {loading && loadingText != null ? loadingText : children}
              </>
            ),
          }),
      ...props,
    },
  });
}

export { Button, buttonVariants };
export type { ButtonProps };
