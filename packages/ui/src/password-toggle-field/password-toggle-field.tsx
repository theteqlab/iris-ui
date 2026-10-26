import { cn, useControllableState } from "@irisui/utils";
import * as PasswordPrimitive from "@radix-ui/react-password-toggle-field";
import { forwardRef, type ReactNode } from "react";
import { useFieldControl } from "../field/field";
import { inputVariants } from "../input/input";
import { EyeIcon, EyeOffIcon } from "../lib/icons";
import type { Size } from "../lib/look";
import { useMessages } from "../locale/messages";

export interface PasswordToggleFieldProps extends Omit<
  PasswordPrimitive.PasswordToggleFieldInputProps,
  "size"
> {
  /** Height 36, 44 or 56 px. Default `md`. */
  size?: Size | undefined;
  /** Marks the field invalid. Also set by `Field`. */
  invalid?: boolean | undefined;
  /** Icon at the start (decorative). */
  startIcon?: ReactNode;
  /** Shows the password as text. Controlled; use with `onVisibilityChange`. */
  visible?: boolean | undefined;
  /** Shown as text on first render. Default false. */
  defaultVisible?: boolean | undefined;
  onVisibilityChange?: ((visible: boolean) => void) | undefined;
  /** Button label while hidden. Default from `LocaleProvider` ("Show password"). */
  showLabel?: string | undefined;
  /** Button label while shown. Default from `LocaleProvider` ("Hide password"). */
  hideLabel?: string | undefined;
  /** Classes of the native input; `className` styles the visible box. */
  inputClassName?: string | undefined;
}

/**
 * A password input with a button to show or hide it. Hidden again when the form is
 * submitted; `autoComplete` defaults to `current-password` (`new-password` to create one).
 */
export const PasswordToggleField = forwardRef<HTMLInputElement, PasswordToggleFieldProps>(
  function PasswordToggleField(
    {
      size = "md",
      invalid: invalidProp,
      startIcon,
      visible: visibleProp,
      defaultVisible = false,
      onVisibilityChange,
      showLabel,
      hideLabel,
      className,
      inputClassName,
      ...props
    },
    ref,
  ) {
    const messages = useMessages();
    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible,
      onChange: onVisibilityChange,
    });
    const { invalid, control } = useFieldControl({
      ...props,
      "aria-invalid": invalidProp || props["aria-invalid"],
    });
    const styles = inputVariants({ size });
    return (
      <PasswordPrimitive.Root visible={visible} onVisibilityChange={setVisible} id={control.id}>
        <div
          data-size={size}
          data-invalid={invalid ? "" : undefined}
          data-disabled={control.disabled ? "" : undefined}
          className={styles.root({ className: cn("pr-1.5", className) })}
        >
          {startIcon && (
            <span aria-hidden="true" className={styles.adornment()}>
              {startIcon}
            </span>
          )}
          <PasswordPrimitive.Input
            ref={ref}
            {...control}
            className={cn(styles.input(), inputClassName)}
          />
          <PasswordPrimitive.Toggle
            aria-label={
              visible ? (hideLabel ?? messages.hidePassword) : (showLabel ?? messages.showPassword)
            }
            disabled={control.disabled}
            className={cn(
              "iris-password-toggle iris-interactive flex size-9 shrink-0 cursor-pointer items-center",
              "justify-center rounded-pill border-0 bg-transparent p-0 text-text-muted",
              "disabled:cursor-not-allowed [&_svg]:size-[18px]",
            )}
          >
            <PasswordPrimitive.Icon visible={<EyeOffIcon />} hidden={<EyeIcon />} />
          </PasswordPrimitive.Toggle>
        </div>
      </PasswordPrimitive.Root>
    );
  },
);
