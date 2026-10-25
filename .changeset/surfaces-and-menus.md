---
"@irisui/ui": minor
"@irisui/tokens": minor
---

Surfaces and menus: Card (glass, strong, ink), Dialog, DropdownMenu, Popover, Tooltip and Tabs (pill, underline).

`@irisui/tokens` adds level-2 tone tokens (`--tone-N`, `--tone-N-edge`, `--tone-N-text`, `--tone-N-soft`, adjusted per mode), which the components now read instead of the palette primitives, `--popover` (an opaque surface for the Select list, menus and popovers, also as the Tailwind colour `popover`), and `--dialog-width`.

`Messages` gains a `close` text (the Dialog close button): custom `Messages` objects must add it.
