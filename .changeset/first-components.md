---
"@irisui/ui": minor
"@irisui/tokens": minor
"@irisui/utils": minor
---

First components: Button, IconButton, Badge, Field (FieldLabel, FieldDescription, FieldError), Input, Textarea, Checkbox, RadioGroup, Switch and Select, with the holo, glass, solid, outline and ghost looks, tones 1–5, ink and danger, and sizes sm, md and lg. Import `@irisui/ui/styles.css` after the tokens. Texts are overridable and provided in English and French (`LocaleProvider`, `en`, `fr`).

`@irisui/tokens` adds the component-level tokens these looks need (`--look-*`, `--is-dark`, `--text-on-danger`, `--control-border`, `--track-border`, `--menu-hover`). `@irisui/utils` exports `twMergeConfig`, the merge rules of `cn()`.
