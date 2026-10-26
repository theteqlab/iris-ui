import { cn } from "@irisui/utils";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ChevronDownIcon } from "../lib/icons";

/**
 * A site's main navigation: top-level links and triggers opening panels of links,
 * shown in a shared viewport under the bar. Name it with `aria-label`.
 */
export const NavigationMenu = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenu({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("relative z-10 flex max-w-max flex-1 items-center font-sans", className)}
      {...props}
    >
      {children}
      <div className="absolute top-full left-0 flex justify-center">
        <NavigationMenuPrimitive.Viewport
          className={cn(
            "iris-popover iris-nav-viewport relative mt-2 h-(--radix-navigation-menu-viewport-height)",
            "w-full origin-top overflow-hidden rounded-card sm:w-(--radix-navigation-menu-viewport-width)",
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
});

export const NavigationMenuList = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("m-0 flex list-none items-center gap-1 p-0", className)}
      {...props}
    />
  );
});

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

/** Classes of a top-level entry; give them to a top-level `NavigationMenuLink`. */
export const navigationMenuTriggerClass = cn(
  "iris-nav-trigger iris-interactive inline-flex h-(--control-md) cursor-pointer items-center gap-1.5",
  "rounded-pill border-0 px-4 font-sans text-md font-bold no-underline outline-none select-none",
  "data-disabled:cursor-not-allowed",
);

/** Opens its item's panel, on hover or on click. */
export const NavigationMenuTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerClass, className)}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden="true" className="iris-nav-chevron size-3.5 text-text-muted" />
    </NavigationMenuPrimitive.Trigger>
  );
});

/** The panel of an item, shown in the viewport. */
export const NavigationMenuContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn("top-0 left-0 w-full p-2 sm:absolute sm:w-auto", className)}
      {...props}
    />
  );
});

/**
 * A link, in a panel or at the top level. Set `active` on the current page
 * (`aria-current="page"`).
 */
export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        "iris-nav-link block rounded-field px-3 py-2.5 text-md no-underline outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    />
  );
});
