"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { MinusIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex gap-2.5 justify-center items-center", 
        "has-disabled:opacity-50",
        "has-disabled:[&_div[data-slot='input-otp-slot']]:bg-ds-bg-muted",
        "has-disabled:[&_div[data-slot='input-otp-slot']]:text-ds-text-muted",
        "has-disabled:[&_div[data-slot='input-otp-slot']]:border-none",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}

      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-lg has-aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 sm:size-11.5  items-center justify-center border rounded-[10px] text-sm transition-all outline-none",
        "border-ds-border-soft",
        "data-[active=true]:border-ds-border-default",
        "data-[active=true]:ring-3 data-[active=true]:ring-ds-ring",
        "aria-invalid:border-ds-border-danger",
        "aria-invalid:data-[active=true]:ring-3 aria-invalid:data-[active=true]:ring-ds-ring",
        "data-[active=true]:aria-invalid:border-ds-border-danger",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
