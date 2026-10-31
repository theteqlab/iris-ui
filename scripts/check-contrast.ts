/**
 * Contrast gate: checks every text / background pair of tokens.css in the
 * 8 palette × mode combinations against the WCAG 2.2 AA thresholds, including
 * the text of every Button / Badge look in every tone.
 *
 *   node scripts/check-contrast.ts            # exit 1 on any failure
 *
 * `bg` is the plain background colour. `page` is the worst case of the page
 * backdrop: the plain background and each colour blob at its peak opacity.
 * Translucent surfaces are composited over `page` (with the glass
 * `saturate()` applied to the backdrop). Also checks that the
 * `data-mode="system"` block stays identical to the dark mode.
 */
import { appendFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const TOKENS_PATH = fileURLToPath(new URL("../packages/tokens/src/tokens.css", import.meta.url));

const PALETTES = ["nacre", "aurore", "couchant", "glacier"] as const;
const MODES = ["light", "dark"] as const;
type Palette = (typeof PALETTES)[number];
type Mode = (typeof MODES)[number];

const TEXT = 4.5;
const NON_TEXT = 3;

// ---------------------------------------------------------------------------
// CSS parsing and cascade

interface Rule {
  selectors: string[];
  decls: Map<string, string>;
  /** Enclosing at-rule prelude, e.g. "@media (prefers-color-scheme: dark)". */
  atRule: string | null;
}

function parseCss(source: string): Rule[] {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules: Rule[] = [];
  let i = 0;

  function parseBlock(atRule: string | null, end: number): void {
    while (i < end) {
      const open = css.indexOf("{", i);
      if (open === -1 || open >= end) {
        i = end;
        return;
      }
      const prelude = css.slice(i, open).trim();
      const close = matchingBrace(open);
      if (prelude.startsWith("@")) {
        i = open + 1;
        if (prelude.startsWith("@keyframes")) {
          i = close + 1;
          continue;
        }
        parseBlock(prelude.replace(/\s+/g, " "), close);
        i = close + 1;
        continue;
      }
      rules.push({
        selectors: prelude.split(",").map((s) => s.trim()),
        decls: parseDecls(css.slice(open + 1, close)),
        atRule,
      });
      i = close + 1;
    }
  }

  function matchingBrace(open: number): number {
    let depth = 0;
    for (let j = open; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}" && --depth === 0) return j;
    }
    throw new Error(`Unbalanced braces at ${open}`);
  }

  parseBlock(null, css.length);
  return rules;
}

function parseDecls(body: string): Map<string, string> {
  const decls = new Map<string, string>();
  let depth = 0;
  let start = 0;
  const push = (chunk: string) => {
    const colon = chunk.indexOf(":");
    if (colon === -1) return;
    const name = chunk.slice(0, colon).trim();
    if (name.startsWith("--")) decls.set(name, chunk.slice(colon + 1).trim());
  };
  for (let j = 0; j < body.length; j++) {
    const c = body[j];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === ";" && depth === 0) {
      push(body.slice(start, j));
      start = j + 1;
    }
  }
  push(body.slice(start));
  return decls;
}

interface Context {
  palette: Palette;
  mode: Mode | "system";
  prefersDark: boolean;
}

function selectorMatches(selector: string, ctx: Context): boolean {
  if (selector === ":root") return true;
  if (selector === "[data-mode]") return true;
  const attr = /^\[data-(palette|mode)="([a-z]+)"\]$/.exec(selector);
  if (!attr) return false;
  return attr[1] === "palette" ? attr[2] === ctx.palette : attr[2] === ctx.mode;
}

function atRuleApplies(atRule: string | null, ctx: Context): boolean {
  if (atRule === null) return true;
  if (atRule === "@media (prefers-color-scheme: dark)") return ctx.prefersDark;
  // Degradations (reduced motion, more contrast, no backdrop-filter) are not the base state.
  return false;
}

/** All custom properties on <html> for a context, with var() resolved. */
function computeVars(rules: Rule[], ctx: Context): Map<string, string> {
  const raw = new Map<string, string>();
  for (const rule of rules) {
    if (!atRuleApplies(rule.atRule, ctx)) continue;
    if (!rule.selectors.some((s) => selectorMatches(s, ctx))) continue;
    for (const [name, value] of rule.decls) raw.set(name, value);
  }
  const resolved = new Map<string, string>();
  const resolve = (name: string, seen: Set<string>): string => {
    const cached = resolved.get(name);
    if (cached !== undefined) return cached;
    if (seen.has(name)) throw new Error(`Cyclic variable ${name}`);
    const value = raw.get(name);
    if (value === undefined) throw new Error(`Undefined variable ${name}`);
    const next = new Set(seen).add(name);
    const out = value.replace(/var\((--[\w-]+)\)/g, (_, ref: string) => resolve(ref, next));
    resolved.set(name, out);
    return out;
  };
  for (const name of raw.keys()) resolve(name, new Set());
  return resolved;
}

// ---------------------------------------------------------------------------
// Colours

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(value: string): Rgba {
  const v = value.trim();
  const hex = /^#([0-9a-f]{3,8})$/i.exec(v);
  if (hex) {
    let h = hex[1]!;
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    const n = (k: number) => parseInt(h.slice(k, k + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  const fn = /^rgba?\(([^)]+)\)$/i.exec(v);
  if (fn) {
    const parts = fn[1]!
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(parseFloat);
    const [r = 0, g = 0, b = 0, a = 1] = parts;
    return { r, g, b, a };
  }
  if (v === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  const colorMix = /^color-mix\(\s*in srgb\s*,(.*)\)$/i.exec(v);
  if (colorMix) {
    // color-mix(in srgb, A p%, B [q%]): the second share defaults to 100 % − p.
    const [first, second] = splitTopLevel(colorMix[1]!).map((part) => {
      const pct = /\s([\d.]+)%\s*$/.exec(part);
      return {
        color: parseColor(pct ? part.slice(0, pct.index) : part),
        pct: pct ? parseFloat(pct[1]!) / 100 : undefined,
      };
    }) as [{ color: Rgba; pct?: number }, { color: Rgba; pct?: number }];
    const p = first.pct ?? (second.pct !== undefined ? 1 - second.pct : 0.5);
    return mix(first.color, p, second.color);
  }
  throw new Error(`Unsupported colour: ${value}`);
}

/** Splits on the commas that are not inside parentheses. */
function splitTopLevel(list: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "(") depth++;
    else if (list[i] === ")") depth--;
    else if (list[i] === "," && depth === 0) {
      parts.push(list.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(list.slice(start).trim());
  return parts;
}

/** Space-separated RGB triplet (blob tokens) with an alpha. */
function fromTriplet(triplet: string, alpha: number): Rgba {
  const [r = 0, g = 0, b = 0] = triplet.trim().split(/\s+/).map(Number);
  return { r, g, b, a: alpha };
}

function over(top: Rgba, bottom: Rgba): Rgba {
  const a = top.a + bottom.a * (1 - top.a);
  const mix = (t: number, b: number) => (t * top.a + b * bottom.a * (1 - top.a)) / a;
  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a };
}

/** CSS `saturate()` filter (Filter Effects spec matrix). */
function saturate(c: Rgba, s: number): Rgba {
  const clamp = (x: number) => Math.min(255, Math.max(0, x));
  return {
    r: clamp((0.213 + 0.787 * s) * c.r + (0.715 - 0.715 * s) * c.g + (0.072 - 0.072 * s) * c.b),
    g: clamp((0.213 - 0.213 * s) * c.r + (0.715 + 0.285 * s) * c.g + (0.072 - 0.072 * s) * c.b),
    b: clamp((0.213 - 0.213 * s) * c.r + (0.715 - 0.715 * s) * c.g + (0.072 + 0.928 * s) * c.b),
    a: c.a,
  };
}

function luminance({ r, g, b }: Rgba): number {
  const lin = (x: number) => {
    const c = x / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(fg: Rgba, bg: Rgba): number {
  const solidFg = fg.a < 1 ? over(fg, bg) : fg;
  const [l1, l2] = [luminance(solidFg), luminance(bg)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

// ---------------------------------------------------------------------------
// Surfaces and pairs

/** A surface resolves to the set of opaque colours it can show (worst case = min). */
type Surface = (vars: Map<string, string>) => Rgba[];

const color = (vars: Map<string, string>, name: string): Rgba => {
  const value = vars.get(name);
  if (value === undefined) throw new Error(`Missing token ${name}`);
  return parseColor(value);
};

/** The page: plain background, and each colour blob at its peak. */
const page: Surface = (vars) => {
  const bg = color(vars, "--bg");
  const alpha = parseFloat(vars.get("--glow-alpha") ?? "0");
  const blobs = [1, 2, 3, 4, 5].map((n) =>
    over(fromTriplet(vars.get(`--blob-${n}`) ?? "", alpha), bg),
  );
  return [bg, ...blobs];
};

/** A translucent layer, optionally with backdrop-filter saturate(), over another surface. */
const layer =
  (token: string, below: Surface, withSaturate = false): Surface =>
  (vars) => {
    const top = color(vars, token);
    const s = withSaturate ? parseFloat(vars.get("--glass-saturate") ?? "100") / 100 : 1;
    return below(vars).map((b) => over(top, withSaturate ? saturate(b, s) : b));
  };

const solid =
  (token: string): Surface =>
  (vars) => [color(vars, token)];

const glass = layer("--glass", page, true);
const glassStrong = layer("--glass-strong", page, true);
const glassInk = layer("--glass-ink", page, true);
const fieldOnGlass = layer("--field", glass);

interface Pair {
  label: string;
  /** A token, or a colour computed from the tokens (component recipes). */
  fg: string | ((vars: Map<string, string>) => Rgba);
  on: Surface;
  surface: string;
  min: number;
  /** Advisory pairs are reported but do not fail the gate. */
  advisory?: boolean;
}

const pairs: Pair[] = [
  ...["--text", "--text-muted"].flatMap((fg) => [
    { label: `${fg} / bg`, fg, on: solid("--bg"), surface: "bg", min: TEXT },
    { label: `${fg} / page`, fg, on: page, surface: "page", min: TEXT },
    { label: `${fg} / glass`, fg, on: glass, surface: "glass", min: TEXT },
    { label: `${fg} / glass-strong`, fg, on: glassStrong, surface: "glass-strong", min: TEXT },
    { label: `${fg} / field`, fg, on: fieldOnGlass, surface: "field", min: TEXT },
  ]),
  ...["--accent", "--link"].flatMap((fg) => [
    { label: `${fg} / bg`, fg, on: solid("--bg"), surface: "bg", min: TEXT },
    { label: `${fg} / page`, fg, on: page, surface: "page", min: TEXT },
    { label: `${fg} / glass`, fg, on: glass, surface: "glass", min: TEXT },
  ]),
  ...[1, 2, 3, 4, 5].map((n) => ({
    label: `--text-on-holo / --holo-${n}`,
    fg: "--text-on-holo",
    on: solid(`--holo-${n}`),
    surface: `holo-${n}`,
    min: TEXT,
  })),
  {
    label: "--selected-text / --selected-bg",
    fg: "--selected-text",
    on: solid("--selected-bg"),
    surface: "selected-bg",
    min: TEXT,
  },
  {
    label: "--text-on-ink / --glass-ink",
    fg: "--text-on-ink",
    on: glassInk,
    surface: "glass-ink",
    min: TEXT,
  },
  ...(["success", "warning", "danger", "info"] as const).map((s) => ({
    label: `--${s}-text / --${s}-soft`,
    fg: `--${s}-text`,
    on: layer(`--${s}-soft`, glass),
    surface: `${s}-soft`,
    min: TEXT,
  })),
  ...[1, 2, 3, 4, 5].flatMap((n) => [
    {
      label: `--tone-${n}-deep / --tone-${n}-tint-light`,
      fg: `--tone-${n}-deep`,
      on: solid(`--tone-${n}-tint-light`),
      surface: "tint",
      min: TEXT,
    },
    {
      label: `--ink / --tone-${n}-base`,
      fg: "--ink",
      on: solid(`--tone-${n}-base`),
      surface: "tone",
      min: TEXT,
    },
  ]),
  { label: "--focus-ring / page", fg: "--focus-ring", on: page, surface: "page", min: NON_TEXT },
  { label: "--focus-ring / glass", fg: "--focus-ring", on: glass, surface: "glass", min: NON_TEXT },
  {
    label: "--danger / field (invalid border)",
    fg: "--danger",
    on: fieldOnGlass,
    surface: "field",
    min: NON_TEXT,
  },
  ...[1, 2, 3].map((n) => ({
    label: `--chart-${n} / glass`,
    fg: `--chart-${n}`,
    on: glass,
    surface: "glass",
    min: NON_TEXT,
    advisory: true,
  })),
];

// ---------------------------------------------------------------------------
// Button and badge looks (recipes of packages/ui/src/styles.css)

const TRANSPARENT: Rgba = { r: 0, g: 0, b: 0, a: 0 };

/** CSS `color-mix(in srgb, a p, b)`, with premultiplied alpha like browsers. */
function mix(a: Rgba, p: number, b: Rgba): Rgba {
  const q = 1 - p;
  const alpha = a.a * p + b.a * q;
  if (alpha === 0) return TRANSPARENT;
  const ch = (x: number, y: number) => (x * a.a * p + y * b.a * q) / alpha;
  return { r: ch(a.r, b.r), g: ch(a.g, b.g), b: ch(a.b, b.b), a: alpha };
}

type ToneId = 1 | 2 | 3 | 4 | 5 | "ink" | "danger";
const TONE_IDS: ToneId[] = [1, 2, 3, 4, 5, "ink", "danger"];

interface ToneColors {
  base: Rgba;
  fg: Rgba;
  glassBg: Rgba;
  glassText: Rgba;
  outlineText: Rgba;
  soft: Rgba;
}

function toneColors(vars: Map<string, string>, id: ToneId): ToneColors {
  const c = (name: string) => color(vars, name);
  if (id === "ink") {
    const base = c("--solid-ink");
    return {
      base,
      fg: c("--text-on-ink"),
      glassBg: c("--glass-strong"),
      glassText: c("--text"),
      outlineText: c("--text"),
      soft: c("--track"),
    };
  }
  if (id === "danger") {
    const base = c("--danger");
    // Glass: the soft danger tint over the glass layer.
    const glassBg = over(c("--danger-soft"), c("--glass"));
    return {
      base,
      fg: c("--text-on-danger"),
      glassBg,
      glassText: c("--danger-text"),
      outlineText: c("--danger-text"),
      soft: c("--danger-soft"),
    };
  }
  const base = c(`--tone-${id}`);
  const tint = parseFloat(vars.get("--look-glass-tint") ?? "0") / 100;
  return {
    base,
    fg: c("--ink"),
    glassBg: mix(base, tint, c("--look-glass-wash")),
    glassText: c("--look-glass-text"),
    outlineText: c(`--tone-${id}-text`),
    soft: c(`--tone-${id}-soft`),
  };
}

const lookPairs: Pair[] = TONE_IDS.flatMap((id): Pair[] => {
  const t = (vars: Map<string, string>) => toneColors(vars, id);
  const filled = id === "ink" || id === "danger";
  return [
    {
      label: `look holo · tone ${id}`,
      fg: (vars) => t(vars).fg,
      // Pastel tones tint the film at 45 % (the white sheen only lightens it);
      // ink and danger are a plain fill, like solid.
      on: filled
        ? (vars) => [t(vars).base]
        : (vars) =>
            [1, 2, 3, 4, 5].map((n) =>
              over(mix(t(vars).base, 0.45, TRANSPARENT), color(vars, `--holo-${n}`)),
            ),
      surface: "holo",
      min: TEXT,
    },
    {
      label: `look glass · tone ${id}`,
      fg: (vars) => t(vars).glassText,
      on: (vars) => page(vars).map((b) => over(t(vars).glassBg, saturate(b, 1.8))),
      surface: "glass",
      min: TEXT,
    },
    {
      label: `look solid · tone ${id}`,
      fg: (vars) => t(vars).fg,
      on: (vars) => [t(vars).base],
      surface: "solid",
      min: TEXT,
    },
    {
      label: `look outline · tone ${id}`,
      fg: (vars) => t(vars).outlineText,
      on: solid("--look-outline-bg"),
      surface: "outline",
      min: TEXT,
    },
    {
      label: `look outline:hover · tone ${id}`,
      fg: (vars) => t(vars).outlineText,
      on: (vars) => [over(t(vars).soft, color(vars, "--look-outline-bg"))],
      surface: "outline-hover",
      min: TEXT,
    },
  ];
});
pairs.push(...lookPairs);

// Alert, Toast and status Badge: text on the soft status tint, over glass or the opaque surface.
for (const s of ["info", "success", "warning", "danger"] as const) {
  pairs.push(
    {
      label: `--text / --${s}-soft (Alert)`,
      fg: "--text",
      on: layer(`--${s}-soft`, glass),
      surface: `${s}-soft`,
      min: TEXT,
    },
    {
      label: `--${s}-text / --${s}-soft (Toast, status Badge)`,
      fg: `--${s}-text`,
      on: (vars) => [over(color(vars, `--${s}-soft`), color(vars, "--popover"))],
      surface: `${s}-soft`,
      min: TEXT,
    },
  );
}

// Surfaces: muted text of the ink Card, and the active option of menus and lists.
pairs.push(
  {
    label: "--text-on-ink 78% / --glass-ink (Card ink, muted)",
    fg: (vars) => mix(color(vars, "--text-on-ink"), 0.78, TRANSPARENT),
    on: glassInk,
    surface: "glass-ink",
    min: TEXT,
  },
  {
    label: "--text / --menu-hover (active option)",
    fg: "--text",
    on: (vars) => [over(color(vars, "--menu-hover"), color(vars, "--popover"))],
    surface: "menu-hover",
    min: TEXT,
  },
  {
    label: "--text / --hover-bg (hovered ghost button, tab, toggle)",
    fg: "--text",
    on: layer("--hover-bg", glass),
    surface: "hover-bg",
    min: TEXT,
  },
  {
    label: "--text / --navbar-bg at --navbar-opacity (Navbar over the page)",
    fg: "--text",
    on: (vars) => {
      const alpha = parseFloat(vars.get("--navbar-opacity") ?? "1");
      const bar = mix(color(vars, "--navbar-bg"), alpha, TRANSPARENT);
      return page(vars).map((below) => over(bar, below));
    },
    surface: "navbar-bg",
    min: TEXT,
  },
  {
    label: "--danger-text / --popover (danger menu item)",
    fg: "--danger-text",
    on: solid("--popover"),
    surface: "popover",
    min: TEXT,
  },
  ...["--text", "--text-muted"].map((fg) => ({
    label: `${fg} / --popover (lists and menus)`,
    fg,
    on: solid("--popover"),
    surface: "popover",
    min: TEXT,
  })),
  {
    label: "--text / --track (inactive pill tab)",
    fg: "--text",
    on: layer("--track", glass),
    surface: "track",
    min: TEXT,
  },
);

// ---------------------------------------------------------------------------
// Run

const rules = parseCss(readFileSync(TOKENS_PATH, "utf8"));
const combos = PALETTES.flatMap((palette) => MODES.map((mode) => ({ palette, mode })));
const comboName = (c: { palette: Palette; mode: Mode }) => `${c.palette}·${c.mode}`;

interface Result {
  ratio: number;
  pass: boolean;
}
const results = new Map<string, Result[]>(); // pair label -> result per combo
let failures = 0;
let warnings = 0;

for (const combo of combos) {
  const vars = computeVars(rules, { ...combo, prefersDark: false });
  for (const pair of pairs) {
    const fg = typeof pair.fg === "string" ? color(vars, pair.fg) : pair.fg(vars);
    const ratio = Math.min(...pair.on(vars).map((bg) => contrast(fg, bg)));
    const pass = ratio >= pair.min;
    if (!pass) {
      if (pair.advisory) warnings++;
      else failures++;
    }
    const row = results.get(pair.label) ?? [];
    row.push({ ratio, pass });
    results.set(pair.label, row);
  }
}

// data-mode="system" with a dark OS must equal data-mode="dark".
const drift: string[] = [];
for (const palette of PALETTES) {
  const dark = computeVars(rules, { palette, mode: "dark", prefersDark: false });
  const system = computeVars(rules, { palette, mode: "system", prefersDark: true });
  for (const [name, value] of dark) {
    if (system.get(name) !== value)
      drift.push(`${palette} ${name}: dark=${value} system=${system.get(name)}`);
  }
}
failures += drift.length;

// ---------------------------------------------------------------------------
// Report

const pairWidth = Math.max(...pairs.map((p) => p.label.length)) + 2;
const cell = 15;
const fmt = (r: Result, advisory: boolean) =>
  `${r.pass ? "✓" : advisory ? "!" : "✗"} ${r.ratio.toFixed(2)}`.padEnd(cell);

const lines: string[] = [];
lines.push(`Contrast gate — ${TOKENS_PATH.replace(process.cwd() + "/", "")}`);
lines.push("");
lines.push("".padEnd(pairWidth + 6) + combos.map((c) => comboName(c).padEnd(cell)).join(""));
for (const pair of pairs) {
  const row = results.get(pair.label)!;
  lines.push(
    pair.label.padEnd(pairWidth) +
      `≥${pair.min}`.padEnd(6) +
      row.map((r) => fmt(r, Boolean(pair.advisory))).join(""),
  );
}
lines.push("");
lines.push(
  `system ≡ dark : ${drift.length === 0 ? "✓ identical" : `✗ ${drift.length} difference(s)`}`,
);
for (const d of drift) lines.push(`  ${d}`);
lines.push("");

const perCombo = combos.map((c, i) => {
  const failed = pairs.filter((p) => !p.advisory && !results.get(p.label)![i]!.pass).length;
  return `${comboName(c)}: ${failed === 0 ? "PASS" : `FAIL (${failed})`}`;
});
lines.push(perCombo.join("   "));
lines.push(
  failures === 0
    ? `GATE PASSED — ${pairs.length} pairs × ${combos.length} combinations` +
        (warnings ? ` (${warnings} advisory warning(s))` : "")
    : `GATE FAILED — ${failures} failure(s)` +
        (warnings ? `, ${warnings} advisory warning(s)` : ""),
);
console.log(lines.join("\n"));

// GitHub Actions job summary
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  const md: string[] = [];
  md.push(`## Contrast gate: ${failures === 0 ? "passed ✅" : "failed ❌"}`, "");
  md.push(`| Pair | Min | ${combos.map(comboName).join(" | ")} |`);
  md.push(`| --- | --- | ${combos.map(() => "---").join(" | ")} |`);
  for (const pair of pairs) {
    const row = results.get(pair.label)!;
    const cells = row.map(
      (r) => `${r.pass ? "" : pair.advisory ? "⚠️ " : "❌ "}${r.ratio.toFixed(2)}`,
    );
    md.push(
      `| \`${pair.label}\`${pair.advisory ? " (advisory)" : ""} | ${pair.min} | ${cells.join(" | ")} |`,
    );
  }
  md.push("", `system ≡ dark: ${drift.length === 0 ? "identical" : drift.join("<br>")}`, "");
  appendFileSync(summaryPath, md.join("\n"));
}

process.exit(failures === 0 ? 0 : 1);
