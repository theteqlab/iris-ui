import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale. The custom theme keys
 * declared in `@verre/tokens/tailwind.css` are registered here so that, for
 * instance, `text-h3` is seen as a font size and not as a text color.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["xs", "sm", "md", "lg", "h1", "h2", "h3"],
      "font-weight": ["regular", "medium", "bold"],
      tracking: ["display"],
      radius: ["pill", "field", "check", "card", "panel"],
      blur: ["glass", "small"],
      shadow: ["glass", "rim", "holo"],
      animate: ["holo"],
    },
  },
});

/** Merges class names, resolving conflicting Tailwind utilities (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export type { ClassValue };
