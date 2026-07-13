"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/shared/lib/utils"
import Link from "next/link"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-ds-text-muted",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  // `useRender` is Base UI's headless replacement for Radix's `Slot`.
  return useRender({
    render: asChild ? (children as React.ReactElement) : <a>{children}</a>,
    props: {
      "data-slot": "breadcrumb-link",
      className: cn("transition-colors hover:text-ds-text-plain", className),
      ...props,
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "font-medium text-ds-text-primary",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 [&>svg]:rtl:rotate-180", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export type BreadcrumbItemData = {
  label: string
  /** When omitted the item renders as the current page (non-interactive). */
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItemData[]
  className?: string
  /** Accessible label for the <nav>. */
  ariaLabel?: string
}

/**
 * Composite breadcrumb trail. The last item is always rendered as a
 * non-interactive page (no href). When there are intermediate items the trail
 * collapses them behind an ellipsis on small screens, expanding to the full
 * path from the `md` breakpoint up.
 */
function Breadcrumbs({ items, className, ariaLabel }: BreadcrumbsProps) {
  if (items.length === 0) return null

  const lastIndex = items.length - 1
  const hasCollapsible = items.length > 2

  return (
    <Breadcrumb aria-label={ariaLabel} className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === lastIndex
          const isFirst = index === 0
          // Middle items are hidden on mobile; the first and last always show.
          const isMiddle = !isFirst && !isLast
          const itemHiddenOnMobile = hasCollapsible && isMiddle

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {/* Mobile-only ellipsis standing in for the collapsed middle. */}
              {hasCollapsible && index === 1 && (
                <>
                  <BreadcrumbItem className="md:hidden">
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="md:hidden" />
                </>
              )}

              <BreadcrumbItem
                className={cn(itemHiddenOnMobile && "hidden md:inline-flex")}
              >
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator
                  className={cn(itemHiddenOnMobile && "hidden md:inline-flex")}
                />
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
