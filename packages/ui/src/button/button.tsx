import { cn } from "@irisui/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { resolveTone, type Look, type Size, type Tone } from "../lib/look";
import { tv } from "../lib/tv";
import { useMessages } from "../locale/messages";

export const buttonVariants = tv({
  base: [
    "iris-look iris-interactive box-border inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-pill font-sans font-medium whitespace-nowrap no-underline select-none",
    "[&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
  ],
  variants: {
    size: {
      sm: "h-(--control-sm) px-4 text-sm",
      md: "h-(--control-md) px-[22px] text-md",
      lg: "h-(--control-lg) px-7 text-lg",
    },
    iconOnly: {
      true: "aspect-square px-0",
    },
  },
  defaultVariants: { size: "md" },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. Default `holo`. */
  look?: Look | undefined;
  /** Palette tone 1–5, `ink` or `danger`. Default: none with `holo`, `ink` otherwise. */
  tone?: Tone | undefined;
  /** Height 36, 44 or 56 px. Default `md`. */
  size?: Size | undefined;
  /** Shows a spinner, keeps the width, blocks clicks and sets `aria-busy`. */
  loading?: boolean;
  /** Text announced while loading. Default from `LocaleProvider` ("Loading"). */
  loadingLabel?: string;
  /** Icon before the label. */
  startIcon?: ReactNode;
  /** Icon after the label. */
  endIcon?: ReactNode;
  /**
   * Renders the single child (a link, for instance) with the button's styles and props.
   * Icons and the loading state are then the child's responsibility.
   */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    look = "holo",
    tone,
    size = "md",
    loading = false,
    loadingLabel,
    startIcon,
    endIcon,
    asChild = false,
    disabled,
    className,
    type,
    onClick,
    children,
    ...props
  },
  ref,
) {
  const messages = useMessages();
  return (
    <ButtonRoot
      ref={ref}
      look={look}
      tone={tone}
      size={size}
      loading={loading}
      disabled={disabled}
      asChild={asChild}
      className={buttonVariants({ size, className })}
      type={type}
      onClick={onClick}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {/* Kept in the layout while loading, so the width does not jump. */}
          <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
            {startIcon}
            {children}
            {endIcon}
          </span>
          {loading && (
            <>
              {" "}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="iris-spinner" aria-hidden="true" />
                <span className="sr-only">{loadingLabel ?? messages.loading}</span>
              </span>
            </>
          )}
        </>
      )}
    </ButtonRoot>
  );
});

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  look: Look;
  tone: Tone | undefined;
  size: Size;
  loading: boolean;
  asChild: boolean;
}

/** Shared by Button and IconButton: data attributes, disabled and loading behaviour. */
export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(function ButtonRoot(
  { look, tone, size, loading, asChild, disabled, type, onClick, ...props },
  ref,
) {
  const resolvedTone = resolveTone(look, tone);
  const Comp = asChild ? Slot : "button";
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  return (
    <Comp
      ref={ref}
      type={asChild ? type : (type ?? "button")}
      data-look={look}
      data-tone={resolvedTone}
      data-size={size}
      data-disabled={disabled ? "" : undefined}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      disabled={asChild ? undefined : disabled}
      onClick={handleClick}
      {...props}
    />
  );
});
