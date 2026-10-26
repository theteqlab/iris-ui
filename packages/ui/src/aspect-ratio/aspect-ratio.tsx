import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { ComponentPropsWithoutRef } from "react";

export type AspectRatioProps = ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>;

/** Keeps its content at a width / height ratio (`ratio={16 / 9}`), whatever the width. */
export const AspectRatio = AspectRatioPrimitive.Root;
