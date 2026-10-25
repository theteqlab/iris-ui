# @irisui/tokens

## 0.2.0

### Minor Changes

- 798fa15: First components: Button, IconButton, Badge, Field (FieldLabel, FieldDescription, FieldError), Input, Textarea, Checkbox, RadioGroup, Switch and Select, with the holo, glass, solid, outline and ghost looks, tones 1–5, ink and danger, and sizes sm, md and lg. Import `@irisui/ui/styles.css` after the tokens. Texts are overridable and provided in English and French (`LocaleProvider`, `en`, `fr`).

  `@irisui/tokens` adds the component-level tokens these looks need (`--look-*`, `--is-dark`, `--text-on-danger`, `--control-border`, `--track-border`, `--menu-hover`). `@irisui/utils` exports `twMergeConfig`, the merge rules of `cn()`.

## 0.1.2

### Patch Changes

- 596e7a1: Fix colour contrast to meet WCAG AA in every palette and mode: darker light-mode accents (nacre, aurore, couchant, glacier) and aurore link, lighter nacre dark accent, dark-mode muted text and danger text, and an inverted (light) `--glass-ink` in dark mode so `--text-on-ink` stays readable on it.

## 0.1.1

### Patch Changes

- 78db8c8: Add a README and the MIT license file to each package.
