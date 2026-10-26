import { cn } from "@irisui/utils";
import * as MenuPrimitive from "@radix-ui/react-menubar";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { CheckIcon, ChevronRightIcon } from "../lib/icons";
import {
  menuItem as item,
  menuLabel,
  menuPanel as panel,
  menuSeparator,
  menuShortcut,
} from "../lib/menu";

export const MenubarMenu: typeof MenuPrimitive.Menu = MenuPrimitive.Menu;
export const MenubarGroup = MenuPrimitive.Group;
export const MenubarPortal = MenuPrimitive.Portal;
export const MenubarSub = MenuPrimitive.Sub;
export const MenubarRadioGroup = MenuPrimitive.RadioGroup;

/**
 * A row of menus, like an application's menu bar: each `MenubarMenu` has its
 * `MenubarTrigger` and `MenubarContent`. Arrow keys move between menus.
 */
export const Menubar = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Root>
>(function Menubar({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Root
      ref={ref}
      className={cn(
        "iris-menubar box-border flex w-fit items-center gap-1 rounded-pill p-1 font-sans",
        className,
      )}
      {...props}
    />
  );
});

/** A menu's button in the bar. */
export const MenubarTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(function MenubarTrigger({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "iris-menubar-trigger iris-interactive inline-flex h-(--control-md) cursor-pointer items-center",
        "rounded-pill border-0 px-4 font-sans text-md font-bold outline-none select-none",
        "data-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});

export const MenubarContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(function MenubarContent({ className, sideOffset = 8, align = "start", ...props }, ref) {
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

export interface MenubarItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** `danger` for destructive actions. */
  variant?: "default" | "danger" | undefined;
}

export const MenubarItem = forwardRef<HTMLDivElement, MenubarItemProps>(function MenubarItem(
  { variant = "default", className, ...props },
  ref,
) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      data-variant={variant}
      className={cn(item, variant === "danger" && "font-medium text-danger-text", className)}
      {...props}
    />
  );
});

export const MenubarCheckboxItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(function MenubarCheckboxItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.CheckboxItem>
  );
});

export const MenubarRadioItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(function MenubarRadioItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.RadioItem ref={ref} className={cn(item, "pr-10", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-3 flex">
        <span className="size-2.5 rounded-pill bg-current" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  );
});

export const MenubarLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function MenubarLabel({ className, ...props }, ref) {
  return <MenuPrimitive.Label ref={ref} className={cn(menuLabel, className)} {...props} />;
});

export const MenubarSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function MenubarSeparator({ className, ...props }, ref) {
  return <MenuPrimitive.Separator ref={ref} className={cn(menuSeparator, className)} {...props} />;
});

/** Keyboard shortcut shown at the end of an item. */
export function MenubarShortcut({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cn(menuShortcut, className)} {...props} />;
}

export const MenubarSubTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>
>(function MenubarSubTrigger({ className, children, ...props }, ref) {
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

export const MenubarSubContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(function MenubarSubContent({ className, sideOffset = 6, ...props }, ref) {
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
