import { cn } from "@irisui/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from "../lib/icons";

export type StatusTone = "info" | "success" | "warning" | "danger";

const ICONS: Record<StatusTone, () => ReactNode> = {
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  danger: () => <DangerIcon />,
};

/** 28 px circled status icon, in the tone's text colour. */
export function StatusIcon({ tone, icon }: { tone: StatusTone; icon?: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="iris-status-icon box-border flex size-7 shrink-0 items-center justify-center rounded-pill [&_svg]:size-4"
    >
      {icon ?? ICONS[tone]()}
    </span>
  );
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Default `info`. `warning` and `danger` are announced at once (`role="alert"`), the others politely (`role="status"`). */
  tone?: StatusTone | undefined;
  /** Replaces the tone's icon; `null` hides it. */
  icon?: ReactNode;
}

/** Message about the page or an action: circled icon, `AlertTitle`, `AlertDescription`. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = "info", icon, className, children, role, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role ?? (tone === "warning" || tone === "danger" ? "alert" : "status")}
      data-tone={tone}
      className={cn(
        "iris-status iris-alert box-border flex items-start gap-3.5 rounded-card p-[18px] font-sans text-md",
        className,
      )}
      {...props}
    >
      {icon !== null && <StatusIcon tone={tone} icon={icon} />}
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">{children}</div>
    </div>
  );
});

export const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function AlertTitle({ className, ...props }, ref) {
    return <p ref={ref} className={cn("m-0 font-bold text-text", className)} {...props} />;
  },
);

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function AlertDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("m-0 text-sm text-text", className)} {...props} />;
});
