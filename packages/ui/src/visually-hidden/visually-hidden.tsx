import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import type { ComponentPropsWithoutRef } from "react";

export type VisuallyHiddenProps = ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>;

/**
 * Content read by screen readers but not shown: a label for an icon, a heading a
 * design leaves out. Use `asChild` to hide your own element.
 */
export const VisuallyHidden = VisuallyHiddenPrimitive.Root;
