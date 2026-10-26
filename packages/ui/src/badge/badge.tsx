import { forwardRef, type HTMLAttributes } from "react";
import { resolveTone, type Look, type Tone } from "../lib/look";
import { tv } from "../lib/tv";

export const badgeVariants = tv({
  base: [
    "iris-look iris-badge box-border inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5",
    "font-sans text-xs leading-none font-semibold whitespace-nowrap",
  ],
});

export type BadgeLook = Exclude<Look, "ghost">;

/** Meaning of a status badge, in the status colours shared with Alert and Toast. */
export type BadgeStatus = "neutral" | "info" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual treatment. Default `holo`. Ignored with `status`. */
  look?: BadgeLook | undefined;
  /** Palette tone 1–5, `ink` or `danger`. Default: none with `holo`, `ink` otherwise. Ignored with `status`. */
  tone?: Tone | undefined;
  /**
   * A state with a meaning (validated, pending, failed…): soft tint, coloured text and a
   * dot, in the status colours. Say the state in the label too: colour alone is not enough.
   */
  status?: BadgeStatus | undefined;
  /** Shows a small dot before the label, in the text colour. Default: true with `status`. */
  dot?: boolean | undefined;
}

/** Short status or category label. Not interactive. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { look = "holo", tone, status, dot, className, children, ...props },
  ref,
) {
  const showDot = dot ?? status !== undefined;
  return (
    <span
      ref={ref}
      {...(status
        ? { "data-status": status }
        : { "data-look": look, "data-tone": resolveTone(look, tone) })}
      className={badgeVariants({ className })}
      {...props}
    >
      {showDot && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-pill bg-current" />}
      {children}
    </span>
  );
});
