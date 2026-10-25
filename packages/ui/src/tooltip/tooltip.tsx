import { cn } from "@irisui/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

/** Shares the open delay between tooltips. Optional: each `Tooltip` brings its own. */
export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  /** Delay before opening on hover, in ms. Keyboard focus opens it at once. Default 300. */
  delayDuration?: number;
}

/** Short label shown on hover and on keyboard focus. */
export function Tooltip({ delayDuration = 300, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props} />
    </TooltipPrimitive.Provider>
  );
}

/** Ink glass bubble, 14 px bold text. */
export const TooltipContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          "iris-tooltip iris-floating z-50 box-border max-w-xs rounded-field px-3 py-2",
          "font-sans text-sm leading-snug font-bold",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
