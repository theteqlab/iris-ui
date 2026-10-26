import { cn } from "@irisui/utils";
import * as OtpPrimitive from "@radix-ui/react-one-time-password-field";
import { forwardRef } from "react";
import { useFieldControl } from "../field/field";
import { useMessages } from "../locale/messages";

export interface OneTimePasswordFieldProps extends Omit<
  OtpPrimitive.OneTimePasswordFieldProps,
  "children"
> {
  /** Number of characters (one box each). Default 6. */
  length?: number;
  /** Marks the boxes invalid. Also set by `Field`. */
  invalid?: boolean | undefined;
  /** Label of each box. Default from `LocaleProvider` ("Character 1 of 6"). */
  characterLabel?: ((index: number, length: number) => string) | undefined;
}

/**
 * A one-time code (by SMS or email), one box per character. Typing moves to the next
 * box, Backspace to the previous one, and a pasted code fills every box.
 * `validationType` is `numeric` by default; `autoSubmit` submits the form when full.
 * Inside a `Field`, the `FieldLabel` names the group.
 */
export const OneTimePasswordField = forwardRef<HTMLDivElement, OneTimePasswordFieldProps>(
  function OneTimePasswordField(
    { length = 6, invalid: invalidProp, characterLabel, className, ...props },
    ref,
  ) {
    const messages = useMessages();
    const { invalid, control, labelId } = useFieldControl({
      ...props,
      "aria-invalid": invalidProp || props["aria-invalid"],
    });
    const label = characterLabel ?? messages.codeCharacter;
    return (
      <OtpPrimitive.Root
        ref={ref}
        role="group"
        aria-labelledby={props["aria-labelledby"] ?? (props["aria-label"] ? undefined : labelId)}
        data-invalid={invalid ? "" : undefined}
        {...props}
        disabled={control.disabled}
        className={cn("flex gap-2", className)}
      >
        {Array.from({ length }, (_, i) => (
          <OtpPrimitive.Input
            key={i}
            aria-label={label(i + 1, length)}
            aria-invalid={invalid || undefined}
            data-invalid={invalid ? "" : undefined}
            className={cn(
              "iris-field box-border size-12 p-0 text-center font-mono text-h3 caret-current",
              "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              "disabled:cursor-not-allowed",
            )}
          />
        ))}
        <OtpPrimitive.HiddenInput />
      </OtpPrimitive.Root>
    );
  },
);
