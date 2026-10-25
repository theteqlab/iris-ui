import { cn } from "@irisui/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { Tone } from "../lib/look";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Fill colour. Default: the holographic film. */
  tone?: Tone | undefined;
}

/**
 * 20 px rail. Pass `value` (0 to `max`, default 100) for a determinate bar, or
 * `null` for an indeterminate one (the film slides). Name it with `aria-label`
 * or `aria-labelledby`.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { tone, value = null, max = 100, className, ...props },
  ref,
) {
  const percent = value === null ? 100 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      data-tone={tone}
      className={cn(
        "iris-look iris-progress relative box-border h-5 w-full overflow-hidden rounded-pill",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="iris-progress-fill size-full rounded-pill"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
