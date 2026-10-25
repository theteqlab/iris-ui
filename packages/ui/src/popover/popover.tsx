import { cn } from "@irisui/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

/** Root: `open` / `onOpenChange` / `defaultOpen`, `modal`. */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /** Shows an arrow pointing to the trigger. */
  arrow?: boolean;
}

/** Floating panel in opaque glass; flips and shifts to stay on screen (`side`, `align`). */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { arrow = false, className, children, sideOffset = 8, align = "center", ...props },
    ref,
  ) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={8}
          className={cn(
            "iris-popover iris-floating z-50 box-border flex w-72 flex-col gap-3 rounded-card p-5",
            "font-sans text-md outline-none",
            className,
          )}
          {...props}
        >
          {children}
          {arrow && <PopoverPrimitive.Arrow width={16} height={8} className="fill-glass-strong" />}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
);
