# @irisui/ui

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
