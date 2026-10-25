---
"@irisui/utils": patch
---

`useControllableState`: several updater functions called in the same event now chain (`set((n) => n + 1)` twice adds 2), and refs are no longer written during render.
