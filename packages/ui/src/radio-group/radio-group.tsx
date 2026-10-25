import { cn } from "@irisui/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useFieldControl } from "../field/field";

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Marks the group invalid. Also set by `Field`. */
  invalid?: boolean;
}

/**
 * Arrow keys move between options. Inside a `Field`, the `FieldLabel` names the
 * group. Default orientation: vertical.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { invalid: invalidProp, orientation = "vertical", className, ...props },
  ref,
) {
  const { invalid, control, labelId } = useFieldControl({
    ...props,
    "aria-invalid": invalidProp || props["aria-invalid"],
  });
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      aria-labelledby={props["aria-labelledby"] ?? (props["aria-label"] ? undefined : labelId)}
      data-invalid={invalid ? "" : undefined}
      {...control}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row flex-wrap gap-x-6" : "flex-col gap-1",
        className,
      )}
    />
  );
});

export interface RadioGroupItemProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  "children"
> {
  /** Visible label. Its row is the 44 px click target. Without it, set `aria-label`. */
  children?: ReactNode;
}

/** 26 px round box; the chosen option is solid ink. */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, children, ...props }, ref) {
    const radio = (
      <RadioGroupPrimitive.Item
        ref={ref}
        {...props}
        className={cn(
          "iris-check iris-interactive box-border inline-flex size-[26px] shrink-0 items-center",
          "justify-center rounded-pill p-0 data-disabled:cursor-not-allowed",
          !children && className,
        )}
      >
        <RadioGroupPrimitive.Indicator className="size-2.5 rounded-pill bg-current" />
      </RadioGroupPrimitive.Item>
    );
    if (!children) return radio;
    return (
      <label
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center gap-3 text-md text-text",
          props.disabled && "cursor-not-allowed",
          className,
        )}
      >
        {radio}
        <span className={cn(props.disabled && "opacity-(--disabled-opacity)")}>{children}</span>
      </label>
    );
  },
);
