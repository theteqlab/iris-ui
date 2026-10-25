import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { Look, Size, Tone } from "../lib/look";
import { useMessages } from "../locale/messages";
import { ButtonRoot, buttonVariants } from "./button";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children"
> {
  /** Required: the icon has no visible text. */
  "aria-label": string;
  /** The icon. */
  children: ReactNode;
  look?: Look | undefined;
  tone?: Tone | undefined;
  size?: Size | undefined;
  loading?: boolean;
  loadingLabel?: string;
  asChild?: boolean;
}

/** Round button holding only an icon; same looks, tones and sizes as Button. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    look = "holo",
    tone,
    size = "md",
    loading = false,
    loadingLabel,
    asChild = false,
    disabled,
    className,
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
      className={buttonVariants({ size, iconOnly: true, className })}
      {...props}
    >
      {asChild ? (
        children
      ) : loading ? (
        <>
          <span className="iris-spinner" aria-hidden="true" />
          <span className="sr-only">{loadingLabel ?? messages.loading}</span>
        </>
      ) : (
        children
      )}
    </ButtonRoot>
  );
});
