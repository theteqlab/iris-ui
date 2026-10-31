# @irisui/ui

## 0.6.0

### Minor Changes

- d7eed2e: Add `Flag`: a country's flag as an SVG from flagcdn.com (or your own `baseUrl`), in three shapes and sizes, named after the country in the language of `LocaleProvider` through `Intl.DisplayNames`, with the country code as a fallback. `Messages` gains an optional `locale`; new `--radius-flag` token.
- d7eed2e: Add `Navbar` (a top bar in frosted glass with an `opacity` setting, blurring what scrolls behind it, `bar` or `floating`) and `Footer` (columns of links and a bottom row). New tokens `--navbar-bg` and `--navbar-opacity`; reduced effects, high contrast and browsers without backdrop blur make the bar opaque.

  Fix: glass surfaces now blur in every browser. The stylesheet declared `-webkit-backdrop-filter` after `backdrop-filter`, and the CSS minifier kept only the prefixed one, so the blur only showed in Safari.

- d7eed2e: Neutral hover. The highlighted option of menus and lists, and the hover of ghost buttons, tabs, toggles, accordion headers, the password button and the toast buttons, now share one neutral tint of the text colour (new `--hover-bg` token; `--menu-hover` points to it). It replaces the holographic gradient of light mode and the accent tint of dark mode.

### Patch Changes

- Updated dependencies [d7eed2e]
- Updated dependencies [d7eed2e]
- Updated dependencies [d7eed2e]
  - @irisui/tokens@0.6.0

## 0.5.0

### Minor Changes

- 21aef0a: Add `Map` and `MapMarker`, in the new `@irisui/ui/map` entry (MapLibre, an optional peer dependency): free OpenFreeMap tiles recoloured with the palette and mode, pins at positions or addresses (`photonGeocoder`, `banGeocoder` or your own), optional popovers, zoom buttons. New `--map-*` tokens and `Messages` `zoomIn` / `zoomOut`.
- 21aef0a: Plainer edges. Glass surfaces, fields and menus lose the two-tone pink / blue rim for a plain white border with a thin highlight along the top (`--rim-edge`, new `--edge-highlight` token). The `solid` and `outline` looks drop their animated holographic border: `solid` is a flat fill, `outline` a 1.5 px border in the tone's text colour. The holographic film stays on the `holo` look, the `strong` card, the switch, the progress bar and the dialog header.
- 21aef0a: Add Accordion, AlertDialog, Separator, Slider, Toggle, ToggleGroup and ScrollArea. Every Radix primitive moves to its October 2026 release, so that all share the same internal packages.
- 21aef0a: Add Collapsible, ContextMenu, HoverCard, Menubar, NavigationMenu, Toolbar, AspectRatio and VisuallyHidden.
- 21aef0a: Add Form, PasswordToggleField and OneTimePasswordField (Radix previews). New `Messages`: `showPassword`, `hidePassword`, `codeCharacter`.
- 21aef0a: Status badges: `<Badge status="success">` (and `warning`, `danger`, `info`, `neutral`) shows a state in the status colours of Alert and Toast, with a dot. Badges are now flat (no drop shadow), slightly narrower and semibold. Solid and tinted holo buttons get a tighter shadow and lift by a pixel on hover. `holo` with `tone="ink"` or `"danger"` is now a plain fill, without the multicoloured border. `--info` is now the same blue in every palette (it was the palette's accent, coral in Couchant), so that it never reads as an error.

### Patch Changes

- Updated dependencies [21aef0a]
- Updated dependencies [21aef0a]
- Updated dependencies [21aef0a]
- Updated dependencies [a6b2fc7]
  - @irisui/tokens@0.5.0

## 0.4.0

### Minor Changes

- 962e46c: Feedback components: Alert (info, success, warning, danger), Toaster and `toast()` (Sonner), Avatar and AvatarGroup, Progress (determinate, indeterminate, tones).

  `@irisui/tokens` adds the `info` status (`--info`, `--info-soft`, `--info-text`, also as Tailwind colours) and `--avatar-ring`.

  `Messages` gains `notifications` and `closeNotification` (the toast region and close button): custom `Messages` objects must add them.

### Patch Changes

- Updated dependencies [962e46c]
  - @irisui/tokens@0.4.0

## 0.3.0

### Minor Changes

- 3087a31: Surfaces and menus: Card (glass, strong, ink), Dialog, DropdownMenu, Popover, Tooltip and Tabs (pill, underline).

  `@irisui/tokens` adds level-2 tone tokens (`--tone-N`, `--tone-N-edge`, `--tone-N-text`, `--tone-N-soft`, adjusted per mode), which the components now read instead of the palette primitives, `--popover` (an opaque surface for the Select list, menus and popovers, also as the Tailwind colour `popover`), and `--dialog-width`.

  `Messages` gains a `close` text (the Dialog close button): custom `Messages` objects must add it.

### Patch Changes

- Updated dependencies [3087a31]
  - @irisui/tokens@0.3.0

## 0.2.0

### Minor Changes

- 798fa15: First components: Button, IconButton, Badge, Field (FieldLabel, FieldDescription, FieldError), Input, Textarea, Checkbox, RadioGroup, Switch and Select, with the holo, glass, solid, outline and ghost looks, tones 1–5, ink and danger, and sizes sm, md and lg. Import `@irisui/ui/styles.css` after the tokens. Texts are overridable and provided in English and French (`LocaleProvider`, `en`, `fr`).

  `@irisui/tokens` adds the component-level tokens these looks need (`--look-*`, `--is-dark`, `--text-on-danger`, `--control-border`, `--track-border`, `--menu-hover`). `@irisui/utils` exports `twMergeConfig`, the merge rules of `cn()`.

### Patch Changes

- Updated dependencies [798fa15]
  - @irisui/tokens@0.2.0
  - @irisui/utils@0.2.0

## 0.1.3

### Patch Changes

- Updated dependencies [931175d]
  - @irisui/utils@0.1.2

## 0.1.2

### Patch Changes

- Updated dependencies [596e7a1]
  - @irisui/tokens@0.1.2

## 0.1.1

### Patch Changes

- 78db8c8: Add a README and the MIT license file to each package.
- Updated dependencies [78db8c8]
  - @irisui/tokens@0.1.1
  - @irisui/utils@0.1.1
