import { cn } from "@irisui/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ChevronDownIcon } from "../lib/icons";

/**
 * Root: `type="single"` (one item open, `collapsible` to close it) or
 * `type="multiple"`; `value` / `onValueChange` / `defaultValue`.
 */
export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

/** One section: its header and its panel, separated from the next by a line. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-line last:border-b-0", className)}
      {...props}
    />
  );
});

export interface AccordionTriggerProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> {
  /** Heading level of the header. Default 3. */
  level?: 2 | 3 | 4 | 5 | 6 | undefined;
}

/** The header's button: full width, 44 px minimum, chevron turning on open. */
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, level = 3, ...props }, ref) {
    const Heading = `h${level}` as const;
    return (
      <AccordionPrimitive.Header asChild>
        <Heading className="m-0 flex">
          <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
              "iris-accordion-trigger iris-quiet iris-interactive flex min-h-11 flex-1 cursor-pointer items-center",
              "justify-between gap-4 rounded-field border-0 px-1 py-3 text-left",
              "font-sans text-md font-bold text-text data-disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          >
            {children}
            <ChevronDownIcon className="iris-accordion-chevron size-4 shrink-0 text-text-muted" />
          </AccordionPrimitive.Trigger>
        </Heading>
      </AccordionPrimitive.Header>
    );
  },
);

export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

/** The panel. Opens and closes with a height animation (none with reduced motion). */
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        className="iris-accordion-content overflow-hidden font-sans text-md text-text"
        {...props}
      >
        <div className={cn("px-1 pb-4", className)}>{children}</div>
      </AccordionPrimitive.Content>
    );
  },
);
