"use client";

import { PALETTES, type Palette } from "@irisui/ui";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "iris-docs-palette";

/** Restores the stored palette before the first paint. Light / dark is handled by next-themes. */
export function PaletteScript() {
  const script = `try{var p=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(${JSON.stringify(PALETTES)}.indexOf(p)>-1)document.documentElement.dataset.palette=p}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

const labels: Record<Palette, string> = {
  nacre: "Nacre",
  aurore: "Aurore",
  couchant: "Couchant",
  glacier: "Glacier",
};

// The palette lives on <html>: read it from there, and follow its changes.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-palette"] });
  return () => observer.disconnect();
};
const getPalette = () => document.documentElement.getAttribute("data-palette") ?? "nacre";

/** Palette used by the demos, set on <html> and remembered. */
export function PaletteSwitcher() {
  const palette = useSyncExternalStore(subscribe, getPalette, () => "nacre");

  const choose = (next: Palette) => {
    document.documentElement.setAttribute("data-palette", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice lasts for this page only.
    }
  };

  return (
    <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
      <legend className="mb-1.5 p-0 text-xs font-medium text-fd-muted-foreground">Palette</legend>
      <div className="grid grid-cols-2 gap-1">
        {PALETTES.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={palette === p}
            onClick={() => choose(p)}
            className="rounded-md border border-fd-border px-2 py-1 text-xs text-fd-foreground transition-colors hover:bg-fd-accent aria-pressed:border-fd-primary aria-pressed:bg-fd-accent"
          >
            {labels[p]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
