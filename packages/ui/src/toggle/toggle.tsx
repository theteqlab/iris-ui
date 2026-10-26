import * as TogglePrimitive from "@radix-ui/react-toggle";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { Size } from "../lib/look";
import { tv } from "../lib/tv";

export const toggleVariants = tv({
  base: [
    "iris-toggle iris-interactive box-border inline-flex shrink-0 cursor-pointer items-center",
    "justify-center gap-2 rounded-pill border-0 font-sans font-bold whitespace-nowrap select-none",
    "data-disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
  ],
  variants: {
    size: {
      sm: "h-(--control-sm) min-w-(--control-sm) px-3 text-sm",
      md: "h-(--control-md) min-w-(--control-md) px-4 text-md",
      lg: "h-(--control-lg) min-w-(--control-lg) px-5 text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  /** Height 36, 44 or 56 px. Default `md`. */
  size?: Size | undefined;
}

/**
 * A button that stays pressed: `pressed` / `onPressedChange` / `defaultPressed`.
 * Pressed, it turns solid ink. With an icon alone, set `aria-label`.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { size = "md", className, ...props },
  ref,
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-size={size}
      className={toggleVariants({ size, className })}
      {...props}
    />
  );
});
