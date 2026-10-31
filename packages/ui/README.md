# @irisui/ui

Accessible React components in the _Verre irisé_ style, from
[iris-ui](https://github.com/theteqlab/iris-ui).

## Install

```sh
npm install @irisui/ui @irisui/tokens
```

`react`, `react-dom` (18 or 19) and `tailwindcss` (v4) are peer dependencies.

Import the tokens and the component styles once in your global CSS (see
[`@irisui/tokens`](https://www.npmjs.com/package/@irisui/tokens)):

```css
@import "tailwindcss";
@import "@irisui/tokens/tailwind.css";
@import "@irisui/ui/styles.css";
```

## Components

| Component              | Notes                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button`               | `look` (`holo` · `glass` · `solid` · `outline` · `ghost`), `tone` (`1`–`5`, `ink`, `danger`), `size` (`sm` 36 px · `md` 44 px · `lg` 56 px), `loading`, `startIcon` / `endIcon`, `asChild` |
| `IconButton`           | Same looks; round; `aria-label` required                                                                                                                                                   |
| `Badge`                | Looks `holo` · `glass` · `solid` · `outline`, `tone`, `dot`; `status` (`success` · `warning` · `danger` · `info` · `neutral`)                                                              |
| `Field`                | With `FieldLabel`, `FieldDescription`, `FieldError`: links label, help and error to the control                                                                                            |
| `Input`                | `size`, `invalid`, `startIcon`, `endSlot`                                                                                                                                                  |
| `Textarea`             | `autoResize`, `showCount` (with `maxLength`)                                                                                                                                               |
| `Checkbox`             | Label as children; `checked="indeterminate"`                                                                                                                                               |
| `RadioGroup`           | With `RadioGroupItem`; `orientation`                                                                                                                                                       |
| `Switch`               | Label as children (or `aria-label`, required); `size`                                                                                                                                      |
| `Select`               | With `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`                                                                        |
| `Card`                 | `variant` (`glass` · `strong` · `ink`), with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`                                                                     |
| `Dialog`               | With `DialogTrigger`, `DialogContent` (`size`, close button), `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose`                              |
| `DropdownMenu`         | Items, checkbox and radio items, labels, separators, shortcuts, submenus, `variant="danger"`                                                                                               |
| `Popover`              | `side`, `align`, optional `arrow`                                                                                                                                                          |
| `Tooltip`              | 300 ms delay, opens on keyboard focus                                                                                                                                                      |
| `Tabs`                 | `look` (`pill` · `underline`), with `TabsList`, `TabsTrigger`, `TabsContent`                                                                                                               |
| `Alert`                | `tone` (`info` · `success` · `warning` · `danger`), circled icon, `AlertTitle`, `AlertDescription`; `role="alert"` for warnings and errors, `status` otherwise                             |
| `Toaster` / `toast`    | Sonner: `toast()`, `toast.success()`, `.info()`, `.warning()`, `.error()`, with description and action; bottom right, 360 px, announced, paused on hover                                   |
| `Avatar`               | `size` (32 · 44 · 56 px), `tone`, with `AvatarImage`, `AvatarFallback`; `AvatarGroup` overlaps by 12 px                                                                                    |
| `Progress`             | `value` / `max`, `null` for indeterminate, optional `tone` (default: the holographic film)                                                                                                 |
| `Accordion`            | `type="single"` (`collapsible`) or `"multiple"`, with `AccordionItem`, `AccordionTrigger` (`level`), `AccordionContent`                                                                    |
| `AlertDialog`          | Confirmation: `AlertDialogAction` / `AlertDialogCancel` are Buttons, focus on Cancel, no closing on a click outside                                                                        |
| `Separator`            | Horizontal or vertical, decorative by default                                                                                                                                              |
| `Slider`               | One value or a range (`thumbLabels`), optional `tone`, horizontal or vertical                                                                                                              |
| `Toggle`               | Pressed state in solid ink, `size`                                                                                                                                                         |
| `ToggleGroup`          | `type="single"` or `"multiple"`, with `ToggleGroupItem`, `size`                                                                                                                            |
| `ScrollArea`           | Native scrolling with thin themed bars, `scrollbars` (`vertical` · `horizontal` · `both`)                                                                                                  |
| `Collapsible`          | Shows or hides content, with `CollapsibleTrigger`, `CollapsibleContent`                                                                                                                    |
| `ContextMenu`          | Right click or long press; same items as `DropdownMenu`                                                                                                                                    |
| `HoverCard`            | Link preview on hover (500 ms), optional `arrow`                                                                                                                                           |
| `Menubar`              | A row of menus, with `MenubarMenu`, `MenubarTrigger`, `MenubarContent` and the `DropdownMenu` items                                                                                        |
| `NavigationMenu`       | Main navigation: triggers with panels of links, `navigationMenuTriggerClass` for top-level links, `active`                                                                                 |
| `Toolbar`              | One Tab stop: `ToolbarButton`, `ToolbarLink`, `ToolbarToggleGroup`, `ToolbarSeparator`                                                                                                     |
| `AspectRatio`          | Keeps a `ratio`                                                                                                                                                                            |
| `VisuallyHidden`       | Read by screen readers, not shown                                                                                                                                                          |
| `Form`                 | Browser validation with `FormField`, `FormLabel`, `FormControl`, `FormMessage` (`match`), `FormSubmit`                                                                                     |
| `PasswordToggleField`  | Password input with a show / hide button, `size`, `invalid`, `Field` support                                                                                                               |
| `OneTimePasswordField` | One box per character, `length`, `validationType`, `autoSubmit`                                                                                                                            |
| `Flag`                 | Country flag (SVG from flagcdn.com), `code`, `size`, `shape` (`rect` · `square` · `round`), named in the user's language, `decorative`, `baseUrl`                                          |
| `Navbar`               | Top bar in frosted glass: `opacity` (0–1), `blur`, `variant` (`bar` · `floating`), `position` (`sticky` · `fixed` · `static`)                                                              |
| `Footer`               | With `FooterColumns`, `FooterColumn` (`title`), `FooterLink`, `FooterBottom`; `variant` (`plain` · `glass`)                                                                                |

```tsx
import { Button, Field, FieldError, FieldLabel, Input } from "@irisui/ui";

<Button look="solid" tone={3} size="lg">
  Pay
</Button>;

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldError>{error}</FieldError>
</Field>;
```

Every component forwards its ref, merges `className` and exposes `data-state`,
`data-disabled`, `data-look`, `data-tone` and `data-size` for styling. With no
`tone`, the `holo` look is the plain holographic film and the other looks use
`ink`.

### Texts

Texts rendered by the components ("Loading", the character counter, the select
placeholder, the dialog's "Close", the toast region and close labels, the password button, the code boxes, the map zoom buttons) are in English by default. Wrap your app in
`<LocaleProvider messages={fr}>` for French, or pass your own `Messages`; each
text can also be overridden by a prop (`loadingLabel`, `counterLabel`,
`placeholder`, `closeLabel`).

## Map

`@irisui/ui/map` is a separate entry, so that apps without a map never load MapLibre.
It needs `maplibre-gl` (an optional peer dependency):

```tsx
import "maplibre-gl/dist/maplibre-gl.css";
import { Map, MapMarker } from "@irisui/ui/map";

<Map aria-label="Our shops" workerUrl={workerUrl} className="h-96">
  <MapMarker lngLat={[4.83, 45.76]} label="Lyon shop" />
  <MapMarker address="8 bd du Port, 80000 Amiens" label="Amiens shop" tone={2} />
</Map>;
```

Free OpenFreeMap tiles (OpenStreetMap data, no key), recoloured with the palette and
mode; pins at positions or addresses (`photonGeocoder` worldwide by default,
`banGeocoder` for France, or your own). Bundlers do not copy MapLibre's worker: pass its
URL as `workerUrl` (with Vite, `import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url"`).

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
