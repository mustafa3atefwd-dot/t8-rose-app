"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react"

import { cn } from "@/shared/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  id,
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      id={id}
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Layout & Sizing
        "flex w-fit items-center justify-between gap-1.5",
        "data-[size=default]:h-12.5",
        "data-[size=sm]:h-7",
        "rounded-lg",
        "data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
        "p-4",

        // Typography
        "text-sm",
        "text-ds-text-muted",
        "whitespace-nowrap",

        // Typography if user selected an option
        "data-[slot=select-value]:text-ds-text-plain",

        // Border & Background
        "not-disabled:border-ds-border-soft",
        "not-disabled:border",
        "bg-ds-bg-plain",
        "outline-none",
        "select-none",

        // Disabled State
        "disabled:cursor-not-allowed",
        "disabled:bg-ds-bg-muted",
        "disabled:text-ds-text-muted",

        // Placeholder && Placeholder when open
        "placeholder:text-ds-text-muted",
        "data-popup-open:placeholder:text-ds-text-plain",

        // Validation States
        "aria-invalid:border-ds-border-danger",
        "aria-invalid:ring-3",
        "aria-invalid:ring-ds-ring-danger",


        // Child Elements
        "*:data-[slot=select-value]:flex",
        "*:data-[slot=select-value]:items-center",
        "*:data-[slot=select-value]:gap-1.5",
        "*:data-[slot=select-value]:line-clamp-1",
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",

        // Animation
        "transition-colors",

        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-ds-text-muted" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  side,
  sideOffset,
  align = "center",
  alignOffset,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof SelectPrimitive.Positioner>,
    "side" | "sideOffset" | "align" | "alignOffset"
  > & {
    position?: "item-aligned" | "popper"
  }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={position === "item-aligned"}
        className="z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={position === "item-aligned"}
          className={cn(
            // Layout & Sizing
            "relative",
            "min-w-36",
            "max-h-(--available-height)",
            "origin-(--transform-origin)",
            "overflow-x-hidden overflow-y-auto",
            "rounded-lg",

            // Typography
            "text-ds-text-plain",

            // Border & Background
            "bg-ds-bg-plain",
            "shadow-md",

            // Data States
            "data-[align-trigger=true]:animate-none",

            // Animation
            "duration-100",
            "data-open:animate-in",
            "data-open:fade-in-0",
            "data-open:zoom-in-95",
            "data-closed:animate-out",
            "data-closed:fade-out-0",
            "data-closed:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",

            position === "popper" &&
              "min-w-(--anchor-width) data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",

            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          {children}
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-ds-text-default", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Layout & Sizing
        "relative",
        "flex w-full items-center gap-1.5",
        "h-12.5",
        "p-4",

        // Typography
        "text-sm",
        "text-ds-text-plain",
        "select-none",

        // Border & Background
        "outline-hidden",

        // Highlight State (Base UI sets data-highlighted on pointer + keyboard nav)
        "data-highlighted:bg-ds-bg-muted",

        // Selected Item
        "data-selected:bg-ds-bg-muted",
        "data-selected:text-ds-text-primary",

        // Disabled State
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-50",

        // Variant / Conditional State
        "not-data-[variant=destructive]:data-highlighted:**:text-ds-text-plain",

        // Icon Handling
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",

        // Child Span Layout
        "*:[span]:last:flex",
        "*:[span]:last:items-center",
        "*:[span]:last:gap-2",

        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-ds-border-soft", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-ds-bg-plain py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-ds-bg-plain py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
