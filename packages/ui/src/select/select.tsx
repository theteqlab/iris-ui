import { cn } from "@irisui/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useFieldControl } from "../field/field";
import { CheckIcon, ChevronDownIcon } from "../lib/icons";
import type { Size } from "../lib/look";
import { tv } from "../lib/tv";
import { useMessages } from "../locale/messages";

/** Root: `value` / `onValueChange` / `defaultValue`, `disabled`, `required`, `name`. */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;

export const selectTriggerVariants = tv({
  base: [
    "iris-field box-border flex w-full cursor-pointer items-center justify-between gap-3",
    "px-3.5 text-left font-sans data-disabled:cursor-not-allowed data-[placeholder]:text-text-muted",
    "[&>span]:min-w-0 [&>span]:truncate",
  ],
  variants: {
    size: {
      sm: "h-(--control-sm) text-sm",
      md: "h-(--control-md) text-md",
      lg: "h-(--control-lg) text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SelectTriggerProps extends ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  /** Height 36, 44 or 56 px. Default `md`. */
  size?: Size;
  /** Marks the field invalid. Also set by `Field`. */
  invalid?: boolean;
}

/** The field that opens the list. Takes its id, description and state from `Field`. */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { size = "md", invalid: invalidProp, className, children, ...props },
    ref,
  ) {
    const { invalid, control } = useFieldControl({
      ...props,
      "aria-invalid": invalidProp || props["aria-invalid"],
    });
    // `required` belongs to the Radix root; a Field's `required` becomes aria-required here.
    const { required, ...rest } = control as typeof control & { required?: boolean };
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        data-size={size}
        data-invalid={invalid ? "" : undefined}
        aria-required={required || undefined}
        {...rest}
        className={selectTriggerVariants({ size, className })}
      >
        {children}
        <SelectPrimitive.Icon className="flex shrink-0 text-text-muted">
          <ChevronDownIcon className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

/** Shows the chosen option, or the placeholder (default from `LocaleProvider`). */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { placeholder, ...props },
  ref,
) {
  const messages = useMessages();
  return (
    <SelectPrimitive.Value
      ref={ref}
      placeholder={placeholder ?? messages.selectPlaceholder}
      {...props}
    />
  );
});

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

/** The list, in opaque glass. Placed under the trigger and at least as wide. */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { className, children, position = "popper", sideOffset = 8, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        {...(position === "popper" ? { sideOffset } : {})}
        className={cn(
          "iris-popover z-50 box-border overflow-hidden rounded-card p-1.5 font-sans text-md",
          position === "popper" &&
            "max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width)",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="flex flex-col gap-0.5">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

/** An option: soft gradient when active, check mark when chosen. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "iris-option flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-field",
        "px-3 outline-none select-none data-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="flex shrink-0">
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

/** Title of a `SelectGroup`. */
export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-3 pt-2 pb-1 font-mono text-xs text-text-muted", className)}
      {...props}
    />
  );
});

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn("mx-1 my-1.5 h-px bg-line", className)}
        {...props}
      />
    );
  },
);
