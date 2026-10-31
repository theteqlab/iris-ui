import { forwardRef, useMemo, useState, type HTMLAttributes } from "react";
import type { Size } from "../lib/look";
import { tv } from "../lib/tv";
import { useMessages } from "../locale/messages";

/** flagcdn.com, by Flagpedia: free SVG flags, no key. */
export const FLAGCDN_URL = "https://flagcdn.com";

export type FlagShape = "rect" | "square" | "round";

export const flagVariants = tv({
  base: [
    "iris-flag relative box-border inline-flex shrink-0 items-center justify-center overflow-hidden",
    "align-middle font-mono leading-none font-bold uppercase",
  ],
  variants: {
    size: {
      sm: "h-4 text-[8px]",
      md: "h-6 text-[10px]",
      lg: "h-8 text-xs",
    },
    shape: {
      rect: "aspect-[4/3] rounded-flag",
      square: "aspect-square rounded-flag",
      round: "aspect-square rounded-pill",
    },
  },
  defaultVariants: { size: "md", shape: "rect" },
});

export interface FlagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * ISO 3166-1 alpha-2 country code (`fr`, `DE`), or a flagcdn subdivision (`gb-sct`,
   * `us-ca`). Case does not matter.
   */
  code: string;
  /** Height 16, 24 or 32 px. Default `md`. */
  size?: Size | undefined;
  /** `rect` (4:3, the flag's usual proportions), `square` or `round`. Default `rect`. */
  shape?: FlagShape | undefined;
  /**
   * Accessible name. Default: the country's name in the language of `LocaleProvider`
   * ("France", "Allemagne"), from the browser.
   */
  label?: string | undefined;
  /** Hidden from assistive technology, when the country is already written next to it. */
  decorative?: boolean | undefined;
  /** Where the SVG flags are served (`{baseUrl}/{code}.svg`), to self-host them. Default flagcdn.com. */
  baseUrl?: string | undefined;
}

/** The country's name in `locale`, or undefined when the browser does not know the code. */
function regionName(code: string, locale: string): string | undefined {
  if (!/^[a-z]{2}$/i.test(code)) return undefined;
  try {
    const name = new Intl.DisplayNames([locale], { type: "region" }).of(code.toUpperCase());
    return name && name !== code.toUpperCase() ? name : undefined;
  } catch {
    return undefined;
  }
}

/**
 * A country's flag, as an SVG from flagcdn.com, cropped to the shape. If the image
 * cannot load, the country code shows instead.
 */
export const Flag = forwardRef<HTMLSpanElement, FlagProps>(function Flag(
  {
    code,
    size = "md",
    shape = "rect",
    label,
    decorative = false,
    baseUrl = FLAGCDN_URL,
    className,
    ...props
  },
  ref,
) {
  const messages = useMessages();
  const id = code.trim().toLowerCase();
  const name = useMemo(
    () => label ?? regionName(id, messages.locale ?? "en") ?? id.toUpperCase(),
    [label, id, messages.locale],
  );
  const [failed, setFailed] = useState<string | null>(null);
  const broken = failed === id;
  return (
    <span
      ref={ref}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
      data-size={size}
      data-shape={shape}
      data-code={id}
      className={flagVariants({ size, shape, className })}
      {...props}
    >
      {broken ? (
        <span aria-hidden="true">{id.split("-")[0]}</span>
      ) : (
        <img
          src={`${baseUrl}/${id}.svg`}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(id)}
          className="size-full object-cover"
        />
      )}
    </span>
  );
});
