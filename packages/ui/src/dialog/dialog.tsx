import { cn } from "@irisui/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { IconButton } from "../button/icon-button";
import { CloseIcon } from "../lib/icons";
import { tv } from "../lib/tv";
import { useMessages } from "../locale/messages";

/** Root: `open` / `onOpenChange` / `defaultOpen`, `modal`. */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const dialogContentVariants = tv({
  base: [
    "iris-dialog fixed top-1/2 left-1/2 z-50 box-border flex max-h-[calc(100dvh-32px)] -translate-1/2",
    "flex-col overflow-hidden rounded-card font-sans text-md outline-none",
  ],
  variants: {
    size: {
      sm: "w-[min(380px,calc(100vw-32px))]",
      md: "w-[min(var(--dialog-width),calc(100vw-32px))]",
      lg: "w-[min(640px,calc(100vw-32px))]",
    },
  },
  defaultVariants: { size: "md" },
});

export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /** Width 380, 460 (`--dialog-width`) or 640 px. Default `md`. */
  size?: "sm" | "md" | "lg" | undefined;
  /** Shows the 44 px close button in the top corner. Default true. */
  showClose?: boolean;
  /** Close button label. Default from `LocaleProvider` ("Close"). */
  closeLabel?: string;
}

/**
 * The veil and the panel. Focus is trapped inside and given back to the trigger
 * on close; Escape and a click outside close it; the page behind does not scroll.
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { size = "md", showClose = true, closeLabel, className, children, ...props },
  ref,
) {
  const messages = useMessages();
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="iris-overlay fixed inset-0 z-50" />
      <DialogPrimitive.Content
        ref={ref}
        data-size={size}
        className={dialogContentVariants({ size, className })}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close asChild>
            <IconButton
              look="ghost"
              aria-label={closeLabel ?? messages.close}
              className="iris-dialog-close absolute top-3 right-3"
            >
              <CloseIcon />
            </IconButton>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

/** Holographic band holding the title (and the close button). */
export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("iris-dialog-header flex flex-col gap-1 py-5 pr-16 pl-7", className)}
        {...props}
      />
    );
  },
);

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("m-0 text-h3 leading-tight font-medium text-text", className)}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("m-0 text-sm text-text-muted", className)}
      {...props}
    />
  );
});

/** Scrollable content between the header and the actions. */
export const DialogBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogBody({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex min-h-0 flex-col gap-4 overflow-y-auto px-7 py-6", className)}
        {...props}
      />
    );
  },
);

/** Actions, aligned to the end. */
export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center justify-end gap-3 px-7 pb-7", className)}
        {...props}
      />
    );
  },
);
