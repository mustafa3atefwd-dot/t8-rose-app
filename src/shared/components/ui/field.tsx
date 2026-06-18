"use client"

import * as React from "react"
import { cn } from "@/shared/lib/utils"

type FieldContextValue = {
  invalid?: boolean
  required?: boolean
  hintId: string
  error?: string
  errorId: string
  controlId: string
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useField() {
  const context = React.useContext(FieldContext)

  if (!context) {
    throw new Error("Field components must be used inside <Field>")
  }

  return context
}

type FieldProps = React.ComponentProps<"div"> & {
  invalid?: boolean
  required?: boolean
  error?: string
}

function Field({
  className,
  invalid,
  required,
  error,
  ...props
}: FieldProps) {
  const id = React.useId()

  return (
    <FieldContext.Provider
      value={{
        invalid,
        required,
        error,
        hintId: `${id}-hint`,
        errorId: `${id}-error`,
        controlId: `${id}-control`,
      }}
    >
      <div
        data-slot="field"
        data-invalid={invalid}
        className={cn("space-y-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const { required, error, errorId, controlId } = useField()

  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium text-zinc-800 dark:text-zinc-50 aria-invalid:text-red-600 dark:aria-invalid:text-red-500",
        className
      )}
      htmlFor={controlId}
      aria-invalid={!!error}
      aria-describedby={errorId}
      {...props}
    >
      {children}

      {required && (
        <span
          aria-hidden="true"
          className="ms-1 text-red-600"
        >
          *
        </span>
      )}
    </label>
  )
}

function FieldHint({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { hintId, invalid } = useField()

  if (invalid) return null

  return (
    <p
      id={hintId}
      data-slot="field-hint"
      className={cn(
        "text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { errorId, invalid } = useField()

  if (!invalid || !children) return null

  return (
    <p
      id={errorId}
      role="alert"
      data-slot="field-error"
      className={cn(
        "text-xs font-medium text-red-600",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  useField,
}