/** Visual treatment shared by Button, IconButton and Badge. */
export type Look = "holo" | "glass" | "solid" | "outline" | "ghost";

/** Palette tones 1 to 5 (their names change from one palette to another), plus ink and danger. */
export type Tone = 1 | 2 | 3 | 4 | 5 | "ink" | "danger";

/** Control heights: 36, 44 and 56 px. */
export type Size = "sm" | "md" | "lg";

/** Default tone: none for the holo look (plain film), ink for the others. */
export function resolveTone(look: Look, tone: Tone | undefined): Tone | undefined {
  if (tone !== undefined) return tone;
  return look === "holo" ? undefined : "ink";
}
