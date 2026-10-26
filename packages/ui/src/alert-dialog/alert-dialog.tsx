import { cn } from "@irisui/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { Button, type ButtonProps } from "../button/button";
import { dialogContentVariants } from "../dialog/dialog";

/** Root: `open` / `onOpenChange` / `defaultOpen`. Always modal. */
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export interface AlertDialogContentProps extends ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
> {
  /** Width 380, 460 (`--dialog-width`) or 640 px. Default `sm`. */
  size?: "sm" | "md" | "lg" | undefined;
}

/**
 * The veil and the panel. Unlike a Dialog, a click outside does not close it and
 * there is no close button: the user answers with an action or Cancel (or Escape).
 * Focus starts on Cancel.
 */
export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  function AlertDialogContent({ size = "sm", className, ...props }, ref) {
    return (
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="iris-overlay fixed inset-0 z-50" />
        <AlertDialogPrimitive.Content
          ref={ref}
          data-size={size}
          className={dialogContentVariants({ size, className })}
          {...props}
        />
      </AlertDialogPrimitive.Portal>
    );
  },
);

/** Holographic band holding the title and the description. */
export const AlertDialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertDialogHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("iris-dialog-header flex flex-col gap-1 px-7 py-5", className)}
        {...props}
      />
    );
  },
);

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("m-0 text-h3 leading-tight font-medium text-text", className)}
      {...props}
    />
  );
});

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("m-0 text-sm text-text-muted", className)}
      {...props}
    />
  );
});

/** Actions, aligned to the end. */
export const AlertDialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertDialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center justify-end gap-3 px-7 pt-6 pb-7", className)}
        {...props}
      />
    );
  },
);

export type AlertDialogActionProps = ButtonProps;

/** Confirms and closes. A Button: `look="solid"` by default; `tone="danger"` for destructive actions. */
export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  function AlertDialogAction({ look = "solid", ...props }, ref) {
    return (
      <AlertDialogPrimitive.Action asChild>
        <Button ref={ref} look={look} {...props} />
      </AlertDialogPrimitive.Action>
    );
  },
);

export type AlertDialogCancelProps = ButtonProps;

/** Closes without acting, and has the focus when the dialog opens. A Button: `look="ghost"` by default. */
export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  function AlertDialogCancel({ look = "ghost", ...props }, ref) {
    return (
      <AlertDialogPrimitive.Cancel asChild>
        <Button ref={ref} look={look} {...props} />
      </AlertDialogPrimitive.Cancel>
    );
  },
);
