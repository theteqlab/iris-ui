import { cn } from "@irisui/utils";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef } from "react";
import type { Size } from "../lib/look";
import { toggleVariants } from "../toggle/toggle";

const ToggleGroupSizeContext = createContext<Size>("md");

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  /** Height of the items: 36, 44 or 56 px. Default `md`. */
  size?: Size | undefined;
};

/**
 * A set of toggles on a shared rail: `type="single"` (one pressed at most) or
 * `type="multiple"`, with `value` / `onValueChange`. Arrow keys move between items.
 * Name it with `aria-label`.
 */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
  { size = "md", className, ...props },
  ref,
) {
  return (
    <ToggleGroupSizeContext.Provider value={size}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex w-fit gap-1 rounded-pill bg-track p-1",
          "data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    </ToggleGroupSizeContext.Provider>
  );
});

export type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>;

/** One option. With an icon alone, set `aria-label`. */
export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem({ className, ...props }, ref) {
    const size = useContext(ToggleGroupSizeContext);
    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        data-size={size}
        className={toggleVariants({ size, className })}
        {...props}
      />
    );
  },
);
