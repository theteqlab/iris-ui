import { twMergeConfig } from "@irisui/utils";
import { createTV } from "tailwind-variants";

/** tailwind-variants with the same merge rules as `cn()` (iris-ui theme keys). */
export const tv = createTV({ twMergeConfig });

export type { VariantProps } from "tailwind-variants";
