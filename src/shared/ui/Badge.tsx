import { type ReactNode } from "react";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type StatusVariant = "success" | "warning" | "error" | "info" | "outline";

/** Figma brand badges + Jira system status variants */
export type BadgeVariant =
  | "default"
  | "primary"
  | "light"
  | "gray"
  | StatusVariant;

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  /** undefined → auto icon for status variants; null → suppress; ReactNode → custom */
  icon?: ReactNode | null;
}

const defaultIcons: Partial<Record<BadgeVariant, ReactNode>> = {
  info: <Info size={14} strokeWidth={2} aria-hidden />,
  success: <CheckCircle size={14} strokeWidth={2} aria-hidden />,
  warning: <AlertTriangle size={14} strokeWidth={2} aria-hidden />,
  error: <XCircle size={14} strokeWidth={2} aria-hidden />,
};

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[#A6252A] text-white dark:bg-red-700 dark:text-red-50",
  primary:
    "bg-[#A6252A] text-white hover:bg-[#821D21] dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-50",
  light:
    "bg-[#FDECEC] text-[#A6252A] hover:bg-[#FAD4D4] dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900",
  gray:
    "bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
  success:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  error:
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  info:
    "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  outline:
    "bg-transparent border border-[#A6252A] text-[#A6252A] dark:border-red-400 dark:text-red-400",
};

export const Badge = ({
  children,
  variant = "default",
  className = "",
  icon,
}: BadgeProps) => {
  const resolvedIcon =
    icon === undefined ? (defaultIcons[variant] ?? null) : icon;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 w-fit",
        "rounded-full px-3 py-1",
        "text-[12px] font-medium leading-none whitespace-nowrap",
        "transition-colors",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {resolvedIcon && (
        <span className="shrink-0 inline-flex">{resolvedIcon}</span>
      )}
      {children}
    </span>
  );
};
