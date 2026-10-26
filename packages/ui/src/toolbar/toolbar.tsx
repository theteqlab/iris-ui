import { cn } from "@irisui/utils";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { toggleVariants } from "../toggle/toggle";

/**
 * A row of controls (buttons, toggle groups, links) reached with a single Tab stop;
 * arrow keys move between them. Name it with `aria-label`.
 */
export const Toolbar = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(function Toolbar({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      className={cn(
        "flex w-fit max-w-full items-center gap-1 rounded-pill bg-track p-1",
        "data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
});

/** A button of the toolbar. With an icon alone, set `aria-label`. */
export const ToolbarButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(function ToolbarButton({ className, ...props }, ref) {
  return <ToolbarPrimitive.Button ref={ref} className={toggleVariants({ className })} {...props} />;
});

/** A link of the toolbar. */
export const ToolbarLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(function ToolbarLink({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      className={toggleVariants({ className: cn("no-underline", className) })}
      {...props}
    />
  );
});

/** Toggles inside the toolbar: `type="single"` or `"multiple"`, like a ToggleGroup. */
export const ToolbarToggleGroup = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(function ToolbarToggleGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleGroup
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
});

export const ToolbarToggleItem = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(function ToolbarToggleItem({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleItem ref={ref} className={toggleVariants({ className })} {...props} />
  );
});

export const ToolbarSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn(
        "mx-1 shrink-0 bg-line data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-6",
        className,
      )}
      {...props}
    />
  );
});
