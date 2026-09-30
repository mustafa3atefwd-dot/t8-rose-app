"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
  Check,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Auto-dismiss after 3 seconds and stack newest toasts at the top.
      duration={3000}
      closeButton
      position="top-right"
      icons={{
        success: <Check className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          // Map sonner's internals onto the design-system surface tokens. The
          // toast is an elevated surface, so it uses the `card` tokens.
          "--normal-bg": "var(--ds-bg-plain)",
          "--normal-text": "var(--ds-text-plain)",
          "--normal-border": "var(--ds-border-soft)",
          "--border-radius": "var(--radius-ds-lg)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group cn-toast w-full items-center gap-3 rounded-lg border p-4 shadow-sm",
          title: "text-body-sm font-semibold",
          description: "text-caption text-ds-text-muted",
          // Logical insets keep the button on the trailing edge and mirror it
          // to the leading edge automatically in RTL (Arabic).
          closeButton:
            "!start-auto !end-3 !top-1/2 !bottom-auto !-translate-y-1/2 !bg-transparent !border-0 !text-ds-text-muted hover:!text-ds-text-plain",
          // Variant colours are driven by design tokens so they adapt to
          // light/dark mode automatically.
          success:
            "!bg-ds-bg-success/10 !border-ds-border-success/40 [&_[data-icon]]:!text-ds-text-success",
          error: "!bg-ds-bg-danger/10 !border-ds-border-danger/40 [&_[data-icon]]:!text-ds-text-danger",
          warning:
            "!bg-ds-bg-warning/10 !border-ds-border-warning/50 [&_[data-icon]]:!text-ds-text-warning",
          info: "!bg-ds-bg-muted !border-ds-border-soft [&_[data-icon]]:!text-ds-text-plain",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
