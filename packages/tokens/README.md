# @irisui/tokens

CSS design tokens for [iris-ui](https://github.com/theteqlab/iris-ui), in the
_Verre irisé_ style: 4 palettes (`nacre`, `aurore`, `couchant`, `glacier`) ×
light and dark modes.

## Install

```sh
npm install @irisui/tokens
```

## Usage

### Plain CSS

```css
@import "@irisui/tokens";

body {
  background: var(--bg-glow), var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
}
```

Pick the palette and mode with attributes on `<html>`:

<!-- prettier-ignore -->
```html
<html data-palette="nacre" data-mode="system">
```

- `data-palette`: `nacre` (default), `aurore`, `couchant` or `glacier`.
- `data-mode`: `light` (default), `dark` or `system` (follows
  `prefers-color-scheme`).

Tokens come in two levels: primitives per palette, and semantic tokens per
mode (`--bg`, `--text`, `--accent`, `--glass`, `--success`…). Use the semantic
tokens only; they adapt to the current palette and mode.

### Tailwind CSS v4

```css
@import "tailwindcss";
@import "@irisui/tokens/tailwind.css";
```

This exposes the semantic tokens as utilities (`bg-glass`, `text-text-muted`,
`rounded-card`, `shadow-glass`, `text-h3`…) and removes Tailwind's default
palette, so only iris-ui colors are available.

To keep Tailwind's defaults next to iris-ui (to mix it with another design
system), import the tokens and the mapping only:

```css
@import "tailwindcss";
@import "@irisui/tokens/tokens.css";
@import "@irisui/tokens/tailwind-theme.css";
```

## Exports

| Path                                           | Content                             |
| ---------------------------------------------- | ----------------------------------- |
| `@irisui/tokens` / `@irisui/tokens/tokens.css` | All tokens as CSS custom properties |
| `@irisui/tokens/tailwind.css`                  | Tokens + Tailwind v4 theme bridge   |
| `@irisui/tokens/tailwind-theme.css`            | The bridge's mapping only           |
| `@irisui/tokens/tailwind-reset.css`            | Removes Tailwind's default theme    |

## License

[MIT](./LICENSE)
