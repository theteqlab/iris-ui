"use client";

import { useId, useState, type ReactNode } from "react";

/** Shows the first lines of a demo's source; the rest on demand. */
export function CodeCollapse({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="relative border-t border-fd-border">
      <div
        id={id}
        className={
          open
            ? "[&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0"
            : "max-h-40 overflow-hidden [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0"
        }
        inert={!open}
      >
        {children}
      </div>
      <div
        className={
          open
            ? "flex justify-center border-t border-fd-border bg-fd-card py-2"
            : "absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-fd-card from-40% to-transparent pt-12 pb-3"
        }
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
        >
          {open ? "Hide code" : "Show code"}
        </button>
      </div>
    </div>
  );
}
