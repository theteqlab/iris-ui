import { cn } from "@irisui/utils";
import type { CSSProperties } from "react";
import { Toaster as SonnerToaster, toast, type ToasterProps as SonnerToasterProps } from "sonner";
import { StatusIcon } from "../alert/alert";
import { useMessages } from "../locale/messages";

export { toast };

export type ToasterProps = SonnerToasterProps;

/**
 * Renders the toasts sent with `toast()`, `toast.success()`, `toast.info()`,
 * `toast.warning()` and `toast.error()`: stacked bottom right, 360 px wide,
 * announced to screen readers, paused while hovered or focused.
 */
export function Toaster({ toastOptions, style, containerAriaLabel, ...props }: ToasterProps) {
  const messages = useMessages();
  const { classNames, ...options } = toastOptions ?? {};
  return (
    <SonnerToaster
      position="bottom-right"
      gap={12}
      containerAriaLabel={containerAriaLabel ?? messages.notifications}
      style={{ "--width": "360px", ...style } as CSSProperties}
      icons={{
        info: <StatusIcon tone="info" />,
        success: <StatusIcon tone="success" />,
        warning: <StatusIcon tone="warning" />,
        error: <StatusIcon tone="danger" />,
      }}
      toastOptions={{
        unstyled: true,
        closeButtonAriaLabel: messages.closeNotification,
        ...options,
        classNames: {
          toast: cn(
            "iris-toast box-border flex w-(--width) items-start gap-3.5 rounded-card p-[18px]",
            "font-sans text-md",
          ),
          icon: "flex shrink-0",
          content: "flex min-w-0 flex-1 flex-col gap-1 pt-0.5",
          title: "font-bold text-text",
          description: "text-sm text-text",
          actionButton: cn(
            "iris-interactive ml-auto h-(--control-sm) shrink-0 self-center rounded-pill border-0 px-4",
            "bg-selected-bg font-sans text-sm font-bold text-selected-text",
          ),
          cancelButton: cn(
            "iris-interactive h-(--control-sm) shrink-0 self-center rounded-pill border-0 bg-transparent px-4",
            "font-sans text-sm font-bold text-text",
          ),
          closeButton:
            "iris-interactive absolute top-2 right-2 flex size-7 items-center justify-center rounded-pill border-0 bg-transparent text-text-muted",
          ...classNames,
        },
      }}
      {...props}
    />
  );
}
