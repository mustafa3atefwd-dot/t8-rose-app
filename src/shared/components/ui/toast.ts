"use client"

import { toast as sonnerToast, type ExternalToast } from "sonner"

export type ToastVariant = "success" | "error" | "warning" | "info"

/**
 * Thin, typed wrapper around sonner. Pass the message string to display.
 * Styling, the 3s
 * auto-dismiss, the close button and vertical stacking are handled globally by
 * the `<Toaster />` mounted in the app providers.
 */
export const toast = {
  success: (message: string, options?: ExternalToast) =>
    sonnerToast.success(message, options),
  error: (message: string, options?: ExternalToast) =>
    sonnerToast.error(message, options),
  warning: (message: string, options?: ExternalToast) =>
    sonnerToast.warning(message, options),
  info: (message: string, options?: ExternalToast) =>
    sonnerToast.info(message, options),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
}

export function showToast(
  variant: ToastVariant,
  message: string,
  options?: ExternalToast,
) {
  return toast[variant](message, options)
}
