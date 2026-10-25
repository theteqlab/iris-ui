import { cn } from "@irisui/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import type { Size, Tone } from "../lib/look";
import { tv } from "../lib/tv";

export const avatarVariants = tv({
  base: [
    "iris-look iris-avatar relative box-border inline-flex shrink-0 items-center justify-center",
    "overflow-hidden rounded-pill font-sans font-bold select-none",
  ],
  variants: {
    size: {
      sm: "size-8 text-xs",
      md: "size-11 text-sm",
      lg: "size-14 text-md",
    },
  },
  defaultVariants: { size: "md" },
});

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  /** 32, 44 or 56 px. Default `md`. */
  size?: Size | undefined;
  /** Background behind the initials. Default `ink`. */
  tone?: Tone | undefined;
}

/** Round image with initials as a fallback; the size is fixed, so nothing shifts while it loads. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = "md", tone = "ink", className, ...props },
  ref,
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-size={size}
      data-tone={tone}
      className={avatarVariants({ size, className })}
      {...props}
    />
  );
});

export const AvatarImage = forwardRef<
  HTMLImageElement,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
});

/** Initials (or an icon) shown until the image loads, or if it fails. */
export const AvatarFallback = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn("flex size-full items-center justify-center uppercase", className)}
      {...props}
    />
  );
});

/** Avatars overlapping by 12 px. Give it an `aria-label` when it stands for a list of people. */
export const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AvatarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("flex items-center pl-3 *:-ml-3", className)}
        {...props}
      />
    );
  },
);
