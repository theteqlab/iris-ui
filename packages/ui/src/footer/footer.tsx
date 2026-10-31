import { cn } from "@irisui/utils";
import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from "react";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** `plain`: on the page, with a top line; `glass`: a frosted glass panel. Default `plain`. */
  variant?: "plain" | "glass" | undefined;
}

/**
 * The page's footer: `FooterColumns` of `FooterColumn`s with `FooterLink`s, then a
 * `FooterBottom` for the copyright and legal links.
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { variant = "plain", className, ...props },
  ref,
) {
  return (
    <footer
      ref={ref}
      data-variant={variant}
      className={cn(
        "iris-footer box-border flex w-full flex-col gap-10 font-sans text-md text-text",
        variant === "glass" ? "rounded-panel border p-8 sm:p-10" : "border-t px-4 py-12 sm:px-6",
        className,
      )}
      {...props}
    />
  );
});

/** A responsive grid of columns, with the brand or a short text first if you like. */
export const FooterColumns = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function FooterColumns({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4", className)}
        {...props}
      />
    );
  },
);

export interface FooterColumnProps extends HTMLAttributes<HTMLElement> {
  /** The column's heading, which also names its navigation landmark. */
  title: string;
}

/** A titled list of links, as a named `<nav>`. */
export const FooterColumn = forwardRef<HTMLElement, FooterColumnProps>(function FooterColumn(
  { title, className, children, ...props },
  ref,
) {
  return (
    <nav ref={ref} aria-label={title} className={cn("flex flex-col gap-3", className)} {...props}>
      <p className="m-0 font-mono text-xs tracking-wide text-text-muted uppercase">{title}</p>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">{children}</ul>
    </nav>
  );
});

/** A link in a column, inside its list item. */
export const FooterLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function FooterLink({ className, ...props }, ref) {
    return (
      <li>
        <a
          ref={ref}
          className={cn(
            "iris-footer-link rounded-field text-sm no-underline outline-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            className,
          )}
          {...props}
        />
      </li>
    );
  },
);

/** The bottom row: copyright, legal links, a theme switch… Wraps on small screens. */
export const FooterBottom = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function FooterBottom({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-text-muted",
          className,
        )}
        {...props}
      />
    );
  },
);
