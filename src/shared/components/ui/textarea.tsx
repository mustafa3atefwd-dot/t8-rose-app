import * as React from "react"
import { cn } from "@/shared/lib/utils"

function Textarea({
  className,
  maxLength = 150,
  value,
  defaultValue,
  onChange,
  ...props
}: React.ComponentProps<"textarea">) {
  const [internalValue, setInternalValue] = React.useState(
    (value ?? defaultValue ?? "").toString()
  )

  const currentLength = internalValue.length

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value

    setInternalValue(val)
    onChange?.(e)
  }

  React.useEffect(() => {
    if (typeof value === "string") {
      setInternalValue(value)
    }
  }, [value])

  return (
    <div className="w-full">
      <textarea
        data-slot="textarea"
        maxLength={maxLength}
        value={value ?? internalValue}
        onChange={handleChange}
        className={cn(
          // Layout & Sizing
          "flex field-sizing-content w-full min-h-37.5 px-2.5 py-2 md:text-sm",

          // Border & Background
          "rounded-lg bg-ds-bg-plain outline-none",
          "not-disabled:border not-disabled:border-ds-border-soft",

          // Placeholder
          "placeholder:text-ds-text-muted",

          // Hover State
          "hover:not-disabled:not-focus:border-ds-border-default",

          // Focus Ring
          "focus:border-ds-border-primary",
          "focus-visible:ring-3 focus-visible:ring-ds-ring",

          // Disabled State
          "disabled:cursor-not-allowed",
          "disabled:bg-ds-bg-muted",
          "disabled:text-ds-text-muted",

          // Validation States
          "aria-invalid:border-ds-border-danger",
          "aria-invalid:ring-ds-ring-danger",

          // Typography
          "text-base text-ds-text-plain",

          // Animation
          "transition-colors",

          className
        )}
        {...props}
      />

      <div className="mt-1 text-xs text-ds-text-soft text-right" >
        {currentLength}/{maxLength} characters
      </div>
    </div>
  )
}

export { Textarea }