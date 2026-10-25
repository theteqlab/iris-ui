import { cn } from "@irisui/utils";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { CheckIcon, ChevronRightIcon } from "../lib/icons";

/** Root: `open` / `onOpenChange` / `defaultOpen`, `modal`. */
export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuPortal = MenuPrimitive.Portal;
export const DropdownMenuSub = MenuPrimitive.Sub;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const panel =
  "iris-popover iris-floating z-50 box-border min-w-60 rounded-card p-1.5 font-sans text-md outline-none";
const item = [
  "iris-option relative flex min-h-11 cursor-pointer items-center gap-3 rounded-field px-3",
  "outline-none select-none data-disabled:cursor-not-allowed",
  "[&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
];

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 8, align = "start", ...props }, ref) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(panel, className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
});

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** `danger` for destructive actions. */
  variant?: "default" | "danger" | undefined;
}

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ variant = "default", className, ...props }, ref) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        data-variant={variant}
        className={cn(item, variant === "danger" && "font-medium text-danger-text", className)}
        {...props}
      />
    );
  },
);

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuRadioItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.RadioItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <span className="size-2.5 rounded-pill bg-current" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  );
});

export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Label
      ref={ref}
      className={cn("px-3 pt-2 pb-1 font-mono text-xs text-text-muted", className)}
      {...props}
    />
  );
});

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn("mx-1 my-1.5 h-px bg-line", className)}
      {...props}
    />
  );
});

/** Keyboard shortcut shown at the end of an item. */
export function DropdownMenuShortcut({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn("ml-auto font-mono text-xs tracking-wide text-text-muted", className)}
      {...props}
    />
  );
}

export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.SubTrigger
      ref={ref}
      className={cn(item, "data-[state=open]:bg-(--menu-hover)", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubTrigger>
  );
});

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        ref={ref}
        sideOffset={sideOffset}
        className={cn(panel, className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
});
