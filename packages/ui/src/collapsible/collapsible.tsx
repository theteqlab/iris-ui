import { cn } from "@irisui/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

/** Root: `open` / `onOpenChange` / `defaultOpen`, `disabled`. */
export const Collapsible = CollapsiblePrimitive.Root;

/** The button that shows or hides the content. Use `asChild` to render your own Button. */
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

/** The content, opened with a height animation (none with reduced motion). */
export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ className, ...props }, ref) {
    return (
      <CollapsiblePrimitive.Content
        ref={ref}
        className={cn("iris-collapsible-content overflow-hidden", className)}
        {...props}
      />
    );
  },
);
