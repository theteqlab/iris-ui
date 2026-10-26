import { cn } from "@irisui/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

/**
 * A form validated by the browser (`required`, `type="email"`, `pattern`…) and your own
 * rules, with messages shown after a submit attempt. For fields you validate
 * yourself, `Field` + `FieldError` is enough.
 */
export const Form = forwardRef<
  HTMLFormElement,
  ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(function Form({ className, ...props }, ref) {
  return (
    <FormPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-5 font-sans", className)}
      {...props}
    />
  );
});

/** One field: its label, control and messages. `name` must match the control's. */
export const FormField = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(function FormField({ className, ...props }, ref) {
  return (
    <FormPrimitive.Field ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  );
});

export const FormLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(function FormLabel({ className, ...props }, ref) {
  return (
    <FormPrimitive.Label
      ref={ref}
      className={cn("text-md font-medium text-text", className)}
      {...props}
    />
  );
});

/** The control. Use `asChild` with an `Input`, a `Textarea`… */
export const FormControl = FormPrimitive.Control;

/**
 * A message shown when the control matches `match`: `"valueMissing"`, `"typeMismatch"`,
 * `"tooShort"`… or a function of the value. Without children, the browser's message.
 */
export const FormMessage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(function FormMessage({ className, ...props }, ref) {
  return (
    <FormPrimitive.Message
      ref={ref}
      className={cn("m-0 text-sm font-bold text-danger-text", className)}
      {...props}
    />
  );
});

/** Reads a control's validity to render your own state. */
export const FormValidityState: typeof FormPrimitive.ValidityState = FormPrimitive.ValidityState;

/** The submit button. Use `asChild` with a `Button`. */
export const FormSubmit = FormPrimitive.Submit;
