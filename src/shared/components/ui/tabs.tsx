"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg  text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        segmented:
          "!h-11 w-fit gap-1 rounded-lg border border-border bg-card ",
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
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group/tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-l-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        // Segmented (Active / Inactive) variant.
        // Corner rounding follows POSITION, not active/inactive state, so the
        // outer corners stay anchored regardless of which segment is selected.
        // Logical sides (s/e) so it mirrors automatically in RTL (Arabic).
        "group-data-[variant=segmented]/tabs-list:flex-1 group-data-[variant=segmented]/tabs-list:rounded-none group-data-[variant=segmented]/tabs-list:border-transparent group-data-[variant=segmented]/tabs-list:px-4 group-data-[variant=segmented]/tabs-list:font-semibold group-data-[variant=segmented]/tabs-list:text-foreground",
        // First segment: rounded start, square end. Last segment: square start, rounded end.
        "group-data-[variant=segmented]/tabs-list:first:rounded-s-md group-data-[variant=segmented]/tabs-list:last:rounded-e-md",
        // Focus: outline-style ring with a gap (offset) around the segment.
        "group-data-[variant=segmented]/tabs-list:focus-visible:ring-2 group-data-[variant=segmented]/tabs-list:focus-visible:ring-ring/50 group-data-[variant=segmented]/tabs-list:focus-visible:ring-offset-2 group-data-[variant=segmented]/tabs-list:focus-visible:ring-offset-card group-data-[variant=segmented]/tabs-list:focus-visible:border-transparent group-data-[variant=segmented]/tabs-list:focus-visible:outline-none",
        "group-data-[variant=segmented]/tabs-list:data-active:bg-maroon-600 group-data-[variant=segmented]/tabs-list:data-active:text-white group-data-[variant=segmented]/tabs-list:data-active:shadow-sm group-data-[variant=segmented]/tabs-list:data-active:hover:bg-maroon-700",
        "dark:group-data-[variant=segmented]/tabs-list:data-active:border-transparent dark:group-data-[variant=segmented]/tabs-list:data-active:bg-soft-pink-500 dark:group-data-[variant=segmented]/tabs-list:data-active:text-maroon-950 dark:group-data-[variant=segmented]/tabs-list:data-active:hover:bg-soft-pink-400",
        "group-data-[variant=segmented]/tabs-list:disabled:opacity-100 group-data-[variant=segmented]/tabs-list:disabled:text-zinc-500 group-data-[variant=segmented]/tabs-list:data-active:disabled:bg-zinc-300 group-data-[variant=segmented]/tabs-list:data-active:disabled:text-zinc-600 dark:group-data-[variant=segmented]/tabs-list:data-active:disabled:bg-zinc-700 dark:group-data-[variant=segmented]/tabs-list:data-active:disabled:text-zinc-300",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
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
        "ms-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-caption font-semibold text-muted-foreground transition-colors group-data-active/tabs-trigger:bg-primary group-data-active/tabs-trigger:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsBadge, tabsListVariants }
