---
"@irisui/tokens": minor
"@irisui/ui": minor
---

Add `Navbar` (a top bar in frosted glass with an `opacity` setting, blurring what scrolls behind it, `bar` or `floating`) and `Footer` (columns of links and a bottom row). New tokens `--navbar-bg` and `--navbar-opacity`; reduced effects, high contrast and browsers without backdrop blur make the bar opaque.

Fix: glass surfaces now blur in every browser. The stylesheet declared `-webkit-backdrop-filter` after `backdrop-filter`, and the CSS minifier kept only the prefixed one, so the blur only showed in Safari.
