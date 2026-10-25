import { cn } from "@irisui/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useFieldControl } from "../field/field";
import { CheckIcon, DashIcon } from "../lib/icons";

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "children"
> {
  /** Visible label. Its row is the 44 px click target. Without it, set `aria-label`. */
  children?: ReactNode;
  /** Marks the box invalid. Also set by `Field`. */
  invalid?: boolean;
}

/** 26 px box; checked and indeterminate are solid ink. `checked` accepts `"indeterminate"`. */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { invalid: invalidProp, className, children, ...props },
  ref,
) {
  const { invalid, control } = useFieldControl({
    ...props,
    "aria-invalid": invalidProp || props["aria-invalid"],
  });
  const box = (
    <CheckboxPrimitive.Root
      ref={ref}
      data-invalid={invalid ? "" : undefined}
      {...control}
      className={cn(
        "group iris-check iris-interactive box-border inline-flex size-[26px] shrink-0",
        "items-center justify-center rounded-check p-0 data-disabled:cursor-not-allowed",
        !children && className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="size-3.5 group-data-[state=indeterminate]:hidden" />
        <DashIcon className="hidden size-3.5 group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
  if (!children) return box;
  return (
    <label
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-3 text-md text-text",
        control.disabled && "cursor-not-allowed",
        className,
      )}
    >
      {box}
      <span className={cn(control.disabled && "opacity-(--disabled-opacity)")}>{children}</span>
    </label>
  );
});
