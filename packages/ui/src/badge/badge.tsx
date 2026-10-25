import { forwardRef, type HTMLAttributes } from "react";
import { resolveTone, type Look, type Tone } from "../lib/look";
import { tv } from "../lib/tv";

export const badgeVariants = tv({
  base: [
    "iris-look iris-badge box-border inline-flex h-6 items-center gap-1.5 rounded-pill px-3",
    "font-sans text-xs leading-none font-bold whitespace-nowrap",
  ],
});

export type BadgeLook = Exclude<Look, "ghost">;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual treatment. Default `holo`. */
  look?: BadgeLook | undefined;
  /** Palette tone 1–5, `ink` or `danger`. Default: none with `holo`, `ink` otherwise. */
  tone?: Tone | undefined;
  /** Shows a small dot before the label, in the text colour. */
  dot?: boolean;
}

/** Short status or category label. Not interactive. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { look = "holo", tone, dot = false, className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-look={look}
      data-tone={resolveTone(look, tone)}
      className={badgeVariants({ className })}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-pill bg-current" />}
      {children}
    </span>
  );
});
