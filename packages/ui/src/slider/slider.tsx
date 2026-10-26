import { cn } from "@irisui/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useFieldControl } from "../field/field";
import type { Tone } from "../lib/look";

export interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Fill colour of the range. Default: the holographic film. */
  tone?: Tone | undefined;
  /**
   * One label per thumb, for a range ("Minimum price", "Maximum price"). With a
   * single thumb, `aria-label`, `aria-labelledby` or a `Field` label is enough.
   */
  thumbLabels?: string[];
}

/**
 * Picks a value (one thumb) or a range (two thumbs, from `value` / `defaultValue`)
 * on an 8 px rail, with 24 px thumbs. Arrow keys move by `step`, Page Up / Down by
 * ten steps, Home / End to the ends.
 */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  {
    tone,
    thumbLabels,
    className,
    orientation = "horizontal",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...props
  },
  ref,
) {
  const { control, labelId } = useFieldControl(props);
  const thumbs = (props.value ?? props.defaultValue ?? [props.min ?? 0]).length;
  return (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      data-tone={tone}
      {...control}
      className={cn(
        "iris-look iris-slider relative flex touch-none items-center select-none",
        "data-disabled:cursor-not-allowed data-disabled:opacity-(--disabled-opacity)",
        orientation === "horizontal" ? "h-11 w-full" : "h-full min-h-40 w-11 flex-col",
        className,
      )}
    >
      <SliderPrimitive.Track
        className={cn(
          "iris-slider-track relative grow overflow-hidden rounded-pill",
          orientation === "horizontal" ? "h-2 w-full" : "h-full w-2",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "iris-slider-range absolute rounded-pill",
            orientation === "horizontal" ? "h-full" : "w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => {
        const label = thumbLabels?.[i] ?? (thumbs === 1 ? ariaLabel : undefined);
        return (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={label}
            aria-labelledby={label ? undefined : (ariaLabelledBy ?? labelId)}
            className="iris-slider-thumb iris-interactive block size-6 cursor-grab rounded-pill active:cursor-grabbing"
          />
        );
      })}
    </SliderPrimitive.Root>
  );
});
