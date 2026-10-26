import { cn } from "@irisui/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Scroll directions with a styled bar. Default `vertical`. */
  scrollbars?: "vertical" | "horizontal" | "both";
}

/**
 * Native scrolling (wheel, touch, keyboard) with thin rounded bars in the theme's
 * colours. Give it a height (or a width) for its content to scroll. Unlike the
 * native bars, these do not take space.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { scrollbars = "vertical", className, children, ...props },
  ref,
) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Focusable, so that keyboard users can scroll it. */}
      <ScrollAreaPrimitive.Viewport
        tabIndex={0}
        className="size-full rounded-[inherit] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollbars !== "horizontal" && <ScrollBar orientation="vertical" />}
      {scrollbars !== "vertical" && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

export type ScrollBarProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>;

/** A bar and its thumb. Rendered by `ScrollArea`; exported for custom layouts. */
export const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(function ScrollBar(
  { orientation = "vertical", className, ...props },
  ref,
) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 select-none",
        orientation === "vertical" ? "h-full w-2.5" : "h-2.5 flex-col",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="iris-scroll-thumb relative flex-1 rounded-pill" />
    </ScrollAreaPrimitive.Scrollbar>
  );
});
