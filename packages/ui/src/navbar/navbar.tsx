import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { tv } from "../lib/tv";

export const navbarVariants = tv({
  base: [
    "iris-navbar z-40 box-border flex min-h-16 items-center gap-4 font-sans text-md text-text",
  ],
  variants: {
    variant: {
      bar: "w-full border-b px-4 sm:px-6",
      floating: "mx-auto w-full rounded-panel border px-5 py-2",
    },
    position: {
      sticky: "sticky top-0",
      fixed: "fixed inset-x-0 top-0",
      static: "relative",
    },
  },
  compoundVariants: [
    { variant: "floating", position: "sticky", className: "top-3" },
    { variant: "floating", position: "fixed", className: "top-3 right-3 left-3 w-auto" },
  ],
  defaultVariants: { variant: "bar", position: "sticky" },
});

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** `bar`: full width with a bottom line; `floating`: a rounded panel with a margin. Default `bar`. */
  variant?: "bar" | "floating" | undefined;
  /** Stays at the top while the page scrolls (`sticky`), always (`fixed`) or not. Default `sticky`. */
  position?: "sticky" | "fixed" | "static" | undefined;
  /**
   * Opacity of the background, from 0 (clear glass) to 1 (opaque). Default from the
   * `--navbar-opacity` token (about 0.6). Reduced effects, high contrast and browsers
   * without backdrop blur raise it, so the text stays readable.
   */
  opacity?: number | undefined;
  /** Blurs what passes behind it. Default true. */
  blur?: boolean | undefined;
  /** Renders the single child (a `<nav>`, a `<div>`…) instead of a `<header>`. */
  asChild?: boolean;
}

/**
 * A page's top bar, in frosted glass: what scrolls behind it is blurred. Put the brand,
 * a `NavigationMenu` and actions in it. Glass buttons inside it do not blur again
 * (blurs are never nested).
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    variant = "bar",
    position = "sticky",
    opacity,
    blur = true,
    asChild = false,
    className,
    style,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "header";
  return (
    <Comp
      ref={ref}
      data-variant={variant}
      data-blur={blur ? "" : undefined}
      className={navbarVariants({ variant, position, className })}
      style={
        opacity === undefined
          ? style
          : ({ "--navbar-opacity": Math.min(1, Math.max(0, opacity)), ...style } as CSSProperties)
      }
      {...props}
    />
  );
});
