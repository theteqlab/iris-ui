import { cn } from "@irisui/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useFieldControl } from "../field/field";
import type { Size } from "../lib/look";
import { tv } from "../lib/tv";

export const switchVariants = tv({
  slots: {
    root: [
      "iris-switch iris-interactive relative box-border inline-flex shrink-0 items-center",
      "rounded-pill p-0 data-disabled:cursor-not-allowed",
    ],
    thumb: "iris-switch-thumb pointer-events-none box-border block rounded-pill",
  },
  variants: {
    size: {
      // The thumb keeps the same gap to the rail's inner edge on every side.
      sm: {
        root: "h-[26px] w-12",
        thumb: "size-[18px] translate-x-[3px] data-[state=checked]:translate-x-[25px]",
      },
      md: {
        root: "h-[34px] w-[62px]",
        thumb: "size-6 translate-x-1 data-[state=checked]:translate-x-8",
      },
      lg: {
        root: "h-[42px] w-[76px]",
        thumb: "size-[30px] translate-x-[5px] data-[state=checked]:translate-x-[39px]",
      },
    },
  },
  defaultVariants: { size: "md" },
});

type SwitchBaseProps = Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "children"> & {
  /** Rail 48 × 26, 62 × 34 or 76 × 42 px. Default `md`. */
  size?: Size;
};

/** A label is required: visible `children`, or `aria-label` / `aria-labelledby`. */
export type SwitchProps = SwitchBaseProps &
  (
    | { children: ReactNode; "aria-label"?: string; "aria-labelledby"?: string }
    | { children?: undefined; "aria-label": string; "aria-labelledby"?: string }
    | { children?: undefined; "aria-label"?: string; "aria-labelledby": string }
  );

/** On, the rail shows the holographic film; the thumb slides in 200 ms. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { size = "md", className, children, ...props },
  ref,
) {
  const { control } = useFieldControl(props);
  const styles = switchVariants({ size });
  const switchControl = (
    <SwitchPrimitive.Root
      ref={ref}
      data-size={size}
      {...control}
      className={styles.root({ className: children ? undefined : className })}
    >
      <SwitchPrimitive.Thumb className={styles.thumb()} />
    </SwitchPrimitive.Root>
  );
  if (!children) return switchControl;
  return (
    <label
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-between gap-4 text-md text-text",
        control.disabled && "cursor-not-allowed",
        className,
      )}
    >
      <span className={cn(control.disabled && "opacity-(--disabled-opacity)")}>{children}</span>
      {switchControl}
    </label>
  );
});
