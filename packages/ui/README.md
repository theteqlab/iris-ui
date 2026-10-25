# @irisui/ui

Accessible React components in the _Verre irisé_ style, from
[iris-ui](https://github.com/theteqlab/iris-ui).

## Install

```sh
npm install @irisui/ui @irisui/tokens
```

`react` and `react-dom` (18 or 19) are peer dependencies.

Import the tokens once in your global CSS (see
[`@irisui/tokens`](https://www.npmjs.com/package/@irisui/tokens)):

```css
@import "tailwindcss";
@import "@irisui/tokens/tailwind.css";
```

## Theme

The theme is driven by two attributes on `<html>`: `data-palette` (`nacre`,
`aurore`, `couchant`, `glacier`) and `data-mode` (`light`, `dark`, `system`).
Setting them by hand is enough; the helpers below are optional.

### `ThemeProvider` and `useTheme`

`ThemeProvider` sets the attributes on `<html>` and remembers the user's choice
in `localStorage` (synced across tabs).

```tsx
import { ThemeProvider, useTheme, PALETTES, type Palette } from "@irisui/ui";

function PaletteSwitcher() {
  const { palette, setPalette } = useTheme();
  return (
    <select value={palette} onChange={(e) => setPalette(e.target.value as Palette)}>
      {PALETTES.map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>
  );
}

<ThemeProvider defaultPalette="nacre" defaultMode="system">
  <App />
</ThemeProvider>;
```

Props: `palette` / `mode` (controlled), `defaultPalette` / `defaultMode`,
`onPaletteChange` / `onModeChange`, and `storageKey` (default
`"@irisui/theme"`, `null` disables persistence).

`useTheme()` returns `{ palette, mode, resolvedMode, setPalette, setMode }`;
`resolvedMode` is `light` or `dark`, with `system` resolved.

### Avoiding a flash of the default theme

Render `ThemeScript` in `<head>` so the stored theme is applied before the
first paint:

```tsx
import { ThemeScript } from "@irisui/ui";

<head>
  <ThemeScript />
</head>;
```

Outside React (a Vite plugin, a server template, a Server Component), use
`getThemeScript()` from the server-safe entry point; it returns the script as a
string:

```ts
import { getThemeScript } from "@irisui/ui/theme-script";
```

Pass the same `storageKey`, `defaultPalette` and `defaultMode` as to
`ThemeProvider`.

## License

[MIT](./LICENSE)
