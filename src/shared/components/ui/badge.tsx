'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '@/shared/lib/utils';

// Status badges use the "faint background + matching text colour" treatment from
// the design system (same as the status chips in DesignSystemPreview). Every
// colour is a semantic token, so light/dark flip automatically.
const badgeVariants = cva(
  'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-semibold whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-ds-bg-primary-faint text-ds-text-primary',
        success: 'bg-ds-bg-success-faint text-ds-text-success',
        warning: 'bg-ds-bg-warning-faint text-ds-text-warning',
        error: 'bg-ds-bg-danger-faint text-ds-text-danger',
        info: 'bg-ds-bg-info-faint text-ds-text-info',
        outline: 'border-ds-border-soft bg-transparent text-ds-text-default',
        new: 'bg-ds-bg-badge-new text-ds-text-badge-new',
        hot: 'bg-ds-bg-badge-hot text-ds-text-badge-hot',
        outOfStock: 'bg-ds-bg-badge-out-of-stock text-ds-text-badge-out-of-stock',
        notification: 'text-ds-bg-badge-new h-3.5 w-3.5 p-0 bg-ds-bg-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  // Base UI's `useRender` is the headless replacement for Radix's `Slot`: when
  // `asChild` is set we render onto the provided child element, merging props.
  return useRender({
    render: asChild ? (children as React.ReactElement) : <span>{children}</span>,
    props: {
      'data-slot': 'badge',
      'data-variant': variant,
      className: cn(badgeVariants({ variant }), className),
      ...props,
    },
  });
}

export { Badge, badgeVariants };
