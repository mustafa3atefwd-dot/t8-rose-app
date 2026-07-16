"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "@base-ui/react"

import { cn } from "@/shared/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg  text-ds-text-muted group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-ds-bg-muted",
        line: "gap-1 bg-transparent",
        segmented:
          "!h-11 w-fit gap-1 rounded-lg border border-ds-border-soft bg-ds-bg-plain ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "group/tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-l-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-ds-text-plain/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-ds-text-plain focus-visible:border-ds-border-primary focus-visible:ring-[3px] focus-visible:ring-ds-ring/50 focus-visible:outline-1 focus-visible:outline-ds-border-primary disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-ds-text-muted dark:hover:text-ds-text-plain group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-ds-bg-plain data-active:text-ds-text-plain dark:data-active:border-ds-border-muted dark:data-active:bg-ds-bg-soft/30 dark:data-active:text-ds-text-plain",
        // Segmented (Active / Inactive) variant.
        // Corner rounding follows POSITION, not active/inactive state, so the
        // outer corners stay anchored regardless of which segment is selected.
        // Logical sides (s/e) so it mirrors automatically in RTL (Arabic).
        "group-data-[variant=segmented]/tabs-list:flex-1 group-data-[variant=segmented]/tabs-list:rounded-none group-data-[variant=segmented]/tabs-list:border-transparent group-data-[variant=segmented]/tabs-list:px-4 group-data-[variant=segmented]/tabs-list:font-semibold group-data-[variant=segmented]/tabs-list:text-ds-text-plain",
        // First segment: rounded start, square end. Last segment: square start, rounded end.
        "group-data-[variant=segmented]/tabs-list:first:rounded-s-md group-data-[variant=segmented]/tabs-list:last:rounded-e-md",
        // Focus: outline-style ring with a gap (offset) around the segment.
        "group-data-[variant=segmented]/tabs-list:focus-visible:ring-2 group-data-[variant=segmented]/tabs-list:focus-visible:ring-ds-ring/50 group-data-[variant=segmented]/tabs-list:focus-visible:ring-offset-2 group-data-[variant=segmented]/tabs-list:focus-visible:ring-offset-ds-bg-plain group-data-[variant=segmented]/tabs-list:focus-visible:border-transparent group-data-[variant=segmented]/tabs-list:focus-visible:outline-none",
        // Active segment uses the solid primary fill; the primary / primary-hover
        // / text-inverse tokens already flip for dark mode automatically.
        "group-data-[variant=segmented]/tabs-list:data-active:bg-ds-bg-primary group-data-[variant=segmented]/tabs-list:data-active:text-ds-text-inverse group-data-[variant=segmented]/tabs-list:data-active:shadow-sm group-data-[variant=segmented]/tabs-list:data-active:hover:bg-ds-bg-primary-saturated",
        // Disabled segment falls back to the neutral surface/text tokens.
        "group-data-[variant=segmented]/tabs-list:disabled:opacity-100 group-data-[variant=segmented]/tabs-list:disabled:text-ds-text-soft group-data-[variant=segmented]/tabs-list:data-active:disabled:bg-ds-bg-soft group-data-[variant=segmented]/tabs-list:data-active:disabled:text-ds-text-default",
        "after:absolute after:bg-ds-bg-inverse after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

// Optional count badge rendered inside a `TabsTrigger`.
function TabsBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tabs-badge"
      className={cn(
        "ms-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ds-bg-muted px-1.5 text-caption font-semibold text-ds-text-muted transition-colors group-data-active/tabs-trigger:bg-ds-bg-primary group-data-active/tabs-trigger:text-ds-text-inverse",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsBadge, tabsListVariants }
