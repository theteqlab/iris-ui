import { cn } from "@irisui/utils";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { useFieldControl } from "../field/field";
import type { Size } from "../lib/look";
import { tv } from "../lib/tv";

export const inputVariants = tv({
  slots: {
    root: "iris-field box-border flex w-full items-center gap-2.5 px-3.5 font-sans",
    input: [
      "h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-inherit outline-none",
      "placeholder:text-text-muted disabled:cursor-not-allowed",
    ],
    adornment:
      "flex shrink-0 items-center text-text-muted [&_svg]:pointer-events-none [&_svg]:size-[18px]",
  },
  variants: {
    size: {
      sm: { root: "h-(--control-sm) text-sm" },
      md: { root: "h-(--control-md) text-md" },
      lg: { root: "h-(--control-lg) text-lg" },
    },
  },
  defaultVariants: { size: "md" },
});

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Height 36, 44 or 56 px. Default `md`. */
  size?: Size;
  /** Marks the field invalid (red border and ring, `aria-invalid`). Also set by `Field`. */
  invalid?: boolean;
  /** Icon at the start (decorative). */
  startIcon?: ReactNode;
  /** Icon, unit or button at the end. */
  endSlot?: ReactNode;
  /** Classes of the native input; `className` styles the visible box. */
  inputClassName?: string;
}

/** Single-line text field. The ref and every native prop go to the `<input>`. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid: invalidProp, startIcon, endSlot, className, inputClassName, ...props },
  ref,
) {
  const { invalid, control } = useFieldControl({
    ...props,
    "aria-invalid": invalidProp || props["aria-invalid"],
  });
  const styles = inputVariants({ size });
  return (
    <div
      data-size={size}
      data-invalid={invalid ? "" : undefined}
      data-disabled={control.disabled ? "" : undefined}
      className={styles.root({ className })}
    >
      {startIcon && (
        <span aria-hidden="true" className={styles.adornment()}>
          {startIcon}
        </span>
      )}
      <input ref={ref} {...control} className={cn(styles.input(), inputClassName)} />
      {endSlot && <span className={styles.adornment()}>{endSlot}</span>}
    </div>
  );
});
