"use client"

import * as React from "react"
import { AlertCircle, Eye, EyeOff, FileUp, Minus, Plus, Search } from "lucide-react"

import { cn } from "@/lib/utils"

type InputSize = "sm" | "md" | "lg"

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  label?: string
  helperText?: string
  error?: string
  valid?: boolean
  size?: InputSize
  containerClass?: string
}

export function Input({
  type = "text",
  label,
  helperText,
  error,
  valid,
  size = "md",
  containerClass,
  className,
  disabled,
  id,
  dir,
  inputMode,
  ...props
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const generatedId = React.useId()
  const [showPassword, setShowPassword] = React.useState(false)

  const inputId = id || generatedId
  const showError = Boolean(error)
  const isRtl = dir === "rtl"

  const sizeStyles = {
    sm: "h-9 px-3",
    md: "h-12 px-4",
    lg: "h-12 px-4",
  }

  function onIncrement() {
    if (!inputRef.current || disabled) return
    inputRef.current.stepUp()
  }

  function onDecrement() {
    if (!inputRef.current || disabled) return
    inputRef.current.stepDown()
  }

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClass)} dir={dir}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium",
            showError ? "text-[#DC2626]" : "text-[#27272A]",
            disabled && "text-[#A1A1AA]"
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {type === "search" && (
          <Search
            size={18}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-[#A1A1AA]",
              isRtl ? "right-3" : "left-3"
            )}
          />
        )}

        <input
          {...props}
          id={inputId}
          ref={inputRef}
          type={type === "password" && showPassword ? "text" : type}
          disabled={disabled}
          dir={dir}
          inputMode={inputMode || (type === "number" ? "numeric" : undefined)}
          aria-invalid={showError}
          className={cn(
            "w-full min-w-0 rounded-lg border bg-transparent text-sm text-[#27272A] outline-none transition-colors placeholder:text-[#A1A1AA]",
            "border-[#D4D4D8] hover:border-[#A1A1AA] focus-visible:border-[#A6252A] focus-visible:ring-2 focus-visible:ring-[#A6252A]/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F4F4F5] disabled:text-[#A1A1AA] disabled:opacity-70",
            sizeStyles[size],
            type === "search" && (isRtl ? "pr-10" : "pl-10"),
            (type === "password" || type === "number" || showError) &&
              (isRtl ? "pl-10" : "pr-10"),
            type === "number" &&
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            showError &&
              "border-[#DC2626] focus-visible:border-[#DC2626] focus-visible:ring-[#DC2626]/20",
            valid &&
              !showError &&
              "border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/20",
            className
          )}
        />

        {type === "password" && (
          <button
            type="button"
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#27272A] disabled:cursor-not-allowed disabled:opacity-50",
              isRtl ? "left-3" : "right-3"
            )}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {type === "number" && (
          <div
            className={cn(
              "absolute top-1/2 flex -translate-y-1/2 flex-col overflow-hidden rounded-md border border-[#D4D4D8] bg-white",
              isRtl ? "left-2" : "right-2"
            )}
          >
            <button
              type="button"
              disabled={disabled}
              aria-label="Increase value"
              onClick={onIncrement}
              className="flex h-4 w-6 items-center justify-center hover:bg-zinc-100 disabled:opacity-50"
            >
              <Plus size={12} />
            </button>

            <button
              type="button"
              disabled={disabled}
              aria-label="Decrease value"
              onClick={onDecrement}
              className="flex h-4 w-6 items-center justify-center border-t border-[#D4D4D8] hover:bg-zinc-100 disabled:opacity-50"
            >
              <Minus size={12} />
            </button>
          </div>
        )}

        {showError && type !== "search" && type !== "password" && type !== "number" && (
          <AlertCircle
            size={18}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-[#DC2626]",
              isRtl ? "left-3" : "right-3"
            )}
          />
        )}
      </div>

      {error ? (
        <p className="text-xs text-[#DC2626]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#71717A]">{helperText}</p>
      ) : null}
    </div>
  )
}

interface OTPInputProps {
  length?: number
  label?: string
  value?: string
  error?: string
  disabled?: boolean
  dir?: "ltr" | "rtl"
  containerClass?: string
  onChange?: (value: string) => void
}

export function OTPInput({
  length = 6,
  label,
  value,
  error,
  disabled,
  dir = "ltr",
  containerClass,
  onChange,
}: OTPInputProps) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

  const [otp, setOtp] = React.useState<string[]>(() => {
    const newOtp = Array(length).fill("")
    const digits = (value || "").replace(/\D/g, "").slice(0, length).split("")

    digits.forEach((digit, index) => {
      newOtp[index] = digit
    })

    return newOtp
  })

  function update(newOtp: string[]) {
    setOtp(newOtp)
    onChange?.(newOtp.join(""))
  }

  function handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const digit = event.target.value.replace(/\D/g, "").slice(-1)
    const newOtp = [...otp]

    newOtp[index] = digit
    update(newOtp)

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)

    if (!pasted) return

    event.preventDefault()

    const newOtp = Array(length).fill("")

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit
    })

    update(newOtp)

    const focusIndex = Math.min(pasted.length, length) - 1
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClass)} dir={dir}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium",
            error ? "text-[#DC2626]" : "text-[#27272A]",
            disabled && "text-[#A1A1AA]"
          )}
        >
          {label}
        </label>
      )}

      <div className="flex gap-2.5">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node
            }}
            value={digit}
            disabled={disabled}
            inputMode="numeric"
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={cn(
              "h-11 w-11 rounded-lg border border-[#D4D4D8] bg-transparent text-center text-sm text-[#27272A] outline-none transition-colors",
              "hover:border-[#A1A1AA] focus-visible:border-[#A6252A] focus-visible:ring-2 focus-visible:ring-[#A6252A]/20",
              "disabled:cursor-not-allowed disabled:bg-[#F4F4F5] disabled:text-[#A1A1AA] disabled:opacity-70",
              error && "border-[#DC2626] focus-visible:border-[#DC2626] focus-visible:ring-[#DC2626]/20"
            )}
          />
        ))}
      </div>

      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  )
}

interface FileInputProps extends Omit<React.ComponentProps<"input">, "type" | "size" | "onChange"> {
  label?: string
  helperText?: string
  error?: string
  maxSize?: number
  containerClass?: string
  onFileChange?: (file: File | null) => void
}

export function FileInput({
  label,
  helperText,
  error,
  accept,
  maxSize,
  disabled,
  containerClass,
  className,
  onFileChange,
  ...props
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = React.useState("")
  const [fileError, setFileError] = React.useState("")

  const err = error || fileError

  function validType(file: File) {
    if (!accept) return true

    const types = accept.split(",").map((item) => item.trim())

    return types.some((item) => {
      if (item.startsWith(".")) {
        return file.name.toLowerCase().endsWith(item.toLowerCase())
      }

      if (item.endsWith("/*")) {
        return file.type.startsWith(item.replace("/*", ""))
      }

      return file.type === item
    })
  }

  function handleFile(file: File | null) {
    if (!file) return

    if (maxSize && file.size > maxSize) {
      setFileError("File is too large")
      setFileName("")
      onFileChange?.(null)
      return
    }

    if (!validType(file)) {
      setFileError("File type is not accepted")
      setFileName("")
      onFileChange?.(null)
      return
    }

    setFileError("")
    setFileName(file.name)
    onFileChange?.(file)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    handleFile(file)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (disabled) return

    const file = event.dataTransfer.files?.[0] || null
    handleFile(file)
  }

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClass)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium",
            err ? "text-[#DC2626]" : "text-[#27272A]",
            disabled && "text-[#A1A1AA]"
          )}
        >
          {label}
        </label>
      )}

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-[#D4D4D8] bg-transparent px-4 text-sm transition-colors",
          "hover:border-[#A1A1AA] focus-within:border-[#A6252A] focus-within:ring-2 focus-within:ring-[#A6252A]/20",
          disabled && "pointer-events-none cursor-not-allowed bg-[#F4F4F5] opacity-70",
          err && "border-[#DC2626] focus-within:border-[#DC2626] focus-within:ring-[#DC2626]/20",
          className
        )}
      >
        <span className={cn("truncate", fileName ? "text-[#27272A]" : "text-[#A1A1AA]")}>
          {fileName || "Choose file"}
        </span>

        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-md bg-[#A6252A] px-3 py-2 text-xs font-medium text-white disabled:cursor-not-allowed"
        >
          <FileUp size={16} />
          Browse
        </button>

        <input
          {...props}
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {err ? (
        <p className="text-xs text-[#DC2626]">{err}</p>
      ) : helperText ? (
        <p className="text-xs text-[#71717A]">{helperText}</p>
      ) : null}
    </div>
  )
}

const countries = [
  { flag: "🇪🇬", code: "+20", name: "Egypt" },
  { flag: "🇺🇸", code: "+1", name: "United States" },
  { flag: "🇸🇦", code: "+966", name: "Saudi Arabia" },
  { flag: "🇦🇪", code: "+971", name: "United Arab Emirates" },
]

interface PhoneInputProps {
  label?: string
  value?: string
  error?: string
  helperText?: string
  disabled?: boolean
  dir?: "ltr" | "rtl"
  containerClass?: string
  onChange?: (value: string) => void
}

export function PhoneInput({
  label,
  value,
  error,
  helperText,
  disabled,
  dir = "ltr",
  containerClass,
  onChange,
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = React.useState("+20")
  const [phoneNumber, setPhoneNumber] = React.useState(value || "")

  const numbers = phoneNumber.replace(/\D/g, "")
  const fullPhone = countryCode + numbers.replace(/^0+/, "")
  const invalidPhone = numbers.length > 0 && !/^\+[1-9]\d{7,14}$/.test(fullPhone)

  const err = error || (invalidPhone ? "Invalid phone number" : "")

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const code = event.target.value

    setCountryCode(code)
    onChange?.(code + numbers.replace(/^0+/, ""))
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const num = event.target.value.replace(/\D/g, "")

    setPhoneNumber(num)
    onChange?.(countryCode + num.replace(/^0+/, ""))
  }

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClass)} dir={dir}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium",
            err ? "text-[#DC2626]" : "text-[#27272A]",
            disabled && "text-[#A1A1AA]"
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex h-12 w-full overflow-hidden rounded-lg border border-[#D4D4D8] bg-transparent text-sm transition-colors",
          "hover:border-[#A1A1AA] focus-within:border-[#A6252A] focus-within:ring-2 focus-within:ring-[#A6252A]/20",
          disabled && "cursor-not-allowed bg-[#F4F4F5] opacity-70",
          err && "border-[#DC2626] focus-within:border-[#DC2626] focus-within:ring-[#DC2626]/20"
        )}
      >
        <select
          value={countryCode}
          disabled={disabled}
          onChange={handleCountryChange}
          className="border-r border-[#D4D4D8] bg-transparent px-3 text-[#27272A] outline-none disabled:cursor-not-allowed"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.code}
            </option>
          ))}
        </select>

        <input
          value={phoneNumber}
          disabled={disabled}
          dir={dir}
          inputMode="tel"
          placeholder="Phone number"
          onChange={handlePhoneChange}
          className="min-w-0 flex-1 bg-transparent px-4 text-[#27272A] outline-none placeholder:text-[#A1A1AA] disabled:cursor-not-allowed disabled:text-[#A1A1AA]"
        />
      </div>

      {err ? (
        <p className="text-xs text-[#DC2626]">{err}</p>
      ) : helperText ? (
        <p className="text-xs text-[#71717A]">{helperText}</p>
      ) : null}
    </div>
  )
}