import { cn } from "@irisui/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes } from "react";

export type CardVariant = "glass" | "strong" | "ink";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `glass`: frosted glass; `strong`: holographic film; `ink`: ink glass. Default `glass`. */
  variant?: CardVariant | undefined;
  /** Renders the single child (an `article`, a link…) with the card's styles. */
  asChild?: boolean;
}

/** Surface grouping related content: `CardHeader`, `CardContent`, `CardFooter`. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "glass", asChild = false, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      data-variant={variant}
      className={cn(
        "iris-card box-border flex flex-col gap-5 rounded-card p-7 font-sans text-md",
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />;
  },
);

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Renders the single child (`<h2>`, `<h3>`…) to pick the heading level. Default: `<h3>`. */
  asChild?: boolean;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { asChild = false, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp
      ref={ref}
      className={cn("m-0 text-h3 leading-tight font-medium text-text", className)}
      {...props}
    />
  );
});

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("m-0 text-sm text-text-muted", className)} {...props} />;
});

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("flex flex-wrap items-center gap-3", className)} {...props} />
    );
  },
);
