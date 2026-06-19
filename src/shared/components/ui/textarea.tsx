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
          "flex field-sizing-content min-h-37.5 w-full rounded-lg border not-disabled:border-zinc-300 hover:not-disabled:not-focus:border-zinc-400 bg-transparent px-2.5 py-2 text-base transition-colors outline-none text-zinc-800 placeholder:text-zinc-400 focus:border-maroon-600 disabled:cursor-not-allowed disabled:bg-zinc-100 aria-invalid:border-red-600 md:text-sm dark:bg-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:not-disabled:border-zinc-600 dark:disabled:border-zinc-700 dark:disabled:bg-transparent dark:focus:border-pink-500 dark:aria-invalid:border-red-500",
          className
        )}
        {...props}
      />

      <div className="mt-1 text-xs text-zinc-500 text-right" >
        {currentLength}/{maxLength} characters
      </div>
    </div>
  )
}

export { Textarea }