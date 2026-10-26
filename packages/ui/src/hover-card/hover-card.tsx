import { cn } from "@irisui/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface HoverCardProps extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  /** Delay before opening, in ms. Default 500. */
  openDelay?: number;
  /** Delay before closing, in ms. Default 200. */
  closeDelay?: number;
}

/**
 * A preview shown when a pointer rests on a link (a profile, a page). For sighted
 * pointer users only: what it shows must also be reachable another way.
 */
export function HoverCard({ openDelay = 500, closeDelay = 200, ...props }: HoverCardProps) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}

/** The link that opens the card. Use `asChild` to keep your own `<a>`. */
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export interface HoverCardContentProps extends ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> {
  /** Shows an arrow pointing to the trigger. */
  arrow?: boolean;
}

/** The card, in opaque glass; flips and shifts to stay on screen. */
export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  function HoverCardContent(
    { arrow = false, className, children, sideOffset = 8, align = "center", ...props },
    ref,
  ) {
    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={8}
          className={cn(
            "iris-popover iris-floating z-50 box-border flex w-80 flex-col gap-3 rounded-card p-5",
            "font-sans text-md outline-none",
            className,
          )}
          {...props}
        >
          {children}
          {arrow && <HoverCardPrimitive.Arrow width={16} height={8} className="fill-popover" />}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    );
  },
);
