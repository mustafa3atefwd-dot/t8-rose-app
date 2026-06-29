"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
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
        "text-text-muted",
        "whitespace-nowrap",

        // Typography if user selected an option
        "data-[slot=select-value]:text-text-plain",

        // Border & Background
        "not-disabled:border-border-soft",
        "not-disabled:border",
        "bg-background-plain",
        "outline-none",
        "select-none",

        // Disabled State
        "disabled:cursor-not-allowed",
        "disabled:bg-background-muted",
        "disabled:text-text-muted",

        // Placeholder && Placeholder when open
        "placeholder:text-text-muted",
        "data-[state=open]:placeholder:text-text-plain",

        // Validation States
        "aria-invalid:border-border-danger",
        "aria-invalid:ring-3",
        "aria-invalid:ring-ring-danger",


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
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn(
          // Layout & Sizing
          "relative z-50",
          "min-w-36",
          "max-h-(--radix-select-content-available-height)",
          "origin-(--radix-select-content-transform-origin)",
          "overflow-x-hidden overflow-y-auto",
          "rounded-lg",

          // Typography
          "text-popover-foreground",

          // Border & Background
          "bg-background-plain",
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
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",

          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            // Layout & Sizing
            "data-[position=popper]:h-(--radix-select-trigger-height)",
            "data-[position=popper]:w-full",
            "data-[position=popper]:min-w-(--radix-select-trigger-width)",

            // Conditional State
            position === "popper" && "",

            className
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-text-default", className)}
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
        "text-text-plain",
        "select-none",

        // Border & Background
        "outline-hidden",

        // Hover State
        "hover:bg-background-muted",

        // Selected Item
        "data-[state=checked]:bg-background-muted",
        "data-[state=checked]:text-text-primary",

        // Disabled State
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-50",

        // Variant / Conditional State
        "not-data-[variant=destructive]:focus:**:text-accent-foreground",

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
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownButton>
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
