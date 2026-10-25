import {
  DEFAULT_MODE,
  DEFAULT_PALETTE,
  DEFAULT_STORAGE_KEY,
  MODES,
  PALETTES,
  type Mode,
  type Palette,
} from "./constants";

export interface ThemeScriptOptions {
  storageKey?: string;
  defaultPalette?: Palette;
  defaultMode?: Mode;
}

/**
 * Returns an inline script that applies the stored palette and mode to
 * `<html>` before the first paint, to avoid a flash of the default theme.
 * Optional: without it the theme still works from the HTML attributes alone.
 */
export function getThemeScript({
  storageKey = DEFAULT_STORAGE_KEY,
  defaultPalette = DEFAULT_PALETTE,
  defaultMode = DEFAULT_MODE,
}: ThemeScriptOptions = {}): string {
  const args = [storageKey, PALETTES, MODES, defaultPalette, defaultMode]
    .map((arg) => JSON.stringify(arg))
    .join(",");
  return `(function(k,P,M,dp,dm){var d=document.documentElement,s={};try{s=JSON.parse(localStorage.getItem(k)||"{}")||{}}catch(e){}d.setAttribute("data-palette",P.indexOf(s.palette)>-1?s.palette:dp);d.setAttribute("data-mode",M.indexOf(s.mode)>-1?s.mode:dm)})(${args})`;
}

export {
  DEFAULT_MODE,
  DEFAULT_PALETTE,
  DEFAULT_STORAGE_KEY,
  MODES,
  PALETTES,
  type Mode,
  type Palette,
  type ResolvedMode,
} from "./constants";
