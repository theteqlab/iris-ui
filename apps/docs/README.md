# docs

The iris-ui documentation site: Next.js + Fumadocs, exported as static files.

```sh
pnpm --filter docs dev   # http://localhost:3000
pnpm build:docs          # builds the packages and the site into apps/docs/out
pnpm check:docs          # checks that every component has its page and demos
```

## Documenting a component

Every component of `packages/ui` (one per `.tsx` file) needs a page; CI fails otherwise.

1. **Demos**: one file per example in `components/demos/<component>/`, default export,
   `"use client"` at the top. The page shows the file's source, so write it as the code
   people will copy. The demo list is generated at build time: no registry to edit.
2. **Page**: `content/docs/components/<component>.mdx`, on the model of `dialog.mdx`:
   `<Demo name="<component>/<file>" />`, `<Install />`, `<PropsTable type="…Props"
pick={[…]} />` (read from the types and their JSDoc; end a description with
   "Default `x`." to fill the default column), data attributes, `<KeyboardTable />`.
3. **Sidebar**: add the page to `content/docs/components/meta.json`.

The end-to-end tests then check the new page with axe, in light and dark mode.
