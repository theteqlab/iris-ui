import { cn } from "@irisui/utils";
import * as MenuPrimitive from "@radix-ui/react-context-menu";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { CheckIcon, ChevronRightIcon } from "../lib/icons";
import {
  menuItem as item,
  menuLabel,
  menuPanel as panel,
  menuSeparator,
  menuShortcut,
} from "../lib/menu";

/** Root: `onOpenChange`, `modal`. Opens at the pointer on a right click or a long press. */
export const ContextMenu = MenuPrimitive.Root;
/** The area that opens the menu. Keep a visible way to reach the same actions: a context menu is hard to discover. */
export const ContextMenuTrigger = MenuPrimitive.Trigger;
export const ContextMenuGroup = MenuPrimitive.Group;
export const ContextMenuPortal = MenuPrimitive.Portal;
export const ContextMenuSub = MenuPrimitive.Sub;
export const ContextMenuRadioGroup = MenuPrimitive.RadioGroup;

export const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content ref={ref} className={cn(panel, className)} {...props} />
    </MenuPrimitive.Portal>
  );
});

export interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** `danger` for destructive actions. */
  variant?: "default" | "danger" | undefined;
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem({ variant = "default", className, ...props }, ref) {
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

export const ContextMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(function ContextMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.CheckboxItem>
  );
});

export const ContextMenuRadioItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(function ContextMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.RadioItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <span className="size-2.5 rounded-pill bg-current" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  );
});

export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function ContextMenuLabel({ className, ...props }, ref) {
  return <MenuPrimitive.Label ref={ref} className={cn(menuLabel, className)} {...props} />;
});

export const ContextMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return <MenuPrimitive.Separator ref={ref} className={cn(menuSeparator, className)} {...props} />;
});

/** Keyboard shortcut shown at the end of an item. */
export function ContextMenuShortcut({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cn(menuShortcut, className)} {...props} />;
}

export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>
>(function ContextMenuSubTrigger({ className, children, ...props }, ref) {
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

export const ContextMenuSubContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(function ContextMenuSubContent({ className, sideOffset = 6, ...props }, ref) {
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
