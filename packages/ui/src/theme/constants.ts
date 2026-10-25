export const PALETTES = ["nacre", "aurore", "couchant", "glacier"] as const;
export const MODES = ["light", "dark", "system"] as const;

export type Palette = (typeof PALETTES)[number];
export type Mode = (typeof MODES)[number];
export type ResolvedMode = Exclude<Mode, "system">;

export const DEFAULT_PALETTE: Palette = "nacre";
export const DEFAULT_MODE: Mode = "system";
export const DEFAULT_STORAGE_KEY = "@iris-ui/theme";

export const isPalette = (value: unknown): value is Palette =>
  (PALETTES as readonly unknown[]).includes(value);
export const isMode = (value: unknown): value is Mode =>
  (MODES as readonly unknown[]).includes(value);
