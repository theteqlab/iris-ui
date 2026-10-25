import { cn } from "@irisui/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef } from "react";

export type TabsLook = "pill" | "underline";

const TabsLookContext = createContext<TabsLook>("pill");

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** `pill`: the active tab is solid ink; `underline`: a 3 px holographic line. Default `pill`. */
  look?: TabsLook | undefined;
}

/** Root: `value` / `onValueChange` / `defaultValue`, `orientation`. Arrow keys move between tabs. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { look = "pill", className, ...props },
  ref,
) {
  return (
    <TabsLookContext.Provider value={look}>
      <TabsPrimitive.Root
        ref={ref}
        data-look={look}
        className={cn("flex flex-col gap-4 font-sans", className)}
        {...props}
      />
    </TabsLookContext.Provider>
  );
});

export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  const look = useContext(TabsLookContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      data-look={look}
      className={cn(
        "flex max-w-full overflow-x-auto",
        look === "pill" ? "w-fit gap-1 rounded-pill bg-track p-1" : "gap-2 border-b border-line",
        className,
      )}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  const look = useContext(TabsLookContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-look={look}
      className={cn(
        "iris-tab iris-interactive relative inline-flex h-12 shrink-0 cursor-pointer items-center",
        "justify-center gap-2 border-0 font-sans text-md font-bold whitespace-nowrap",
        "data-disabled:cursor-not-allowed",
        look === "pill" ? "rounded-pill px-5" : "rounded-field px-4",
        className,
      )}
      {...props}
    />
  );
});

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "text-md text-text outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    />
  );
});
