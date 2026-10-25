# iris-ui

Accessible React components and design tokens in the _Verre irisé_ style:
iridescent glass surfaces, 4 palettes (`nacre`, `aurore`, `couchant`,
`glacier`) × light and dark modes.

## Packages

| Package | Description |
| --- | --- |
| [`@irisui/ui`](./packages/ui) | React components and theme helpers |
| [`@irisui/tokens`](./packages/tokens) | CSS design tokens and Tailwind CSS v4 bridge |
| [`@irisui/utils`](./packages/utils) | Shared utilities and hooks |

```sh
npm install @irisui/ui @irisui/tokens
```

## Development

Requires Node.js 24.11+ and pnpm (version pinned in `package.json`).

```sh
pnpm install
pnpm dev        # playground (apps/playground)
pnpm build
pnpm typecheck
pnpm contrast   # checks token color contrast
```

### Releasing

Releases are automated with [Changesets](https://github.com/changesets/changesets).
In a pull request that changes a published package, run `pnpm changeset` and
commit the generated file. Once merged, the Release workflow opens a
"Version Packages" pull request; merging it publishes the new versions to npm.
See [`.changeset/README.md`](./.changeset/README.md).

## License

[MIT](./LICENSE)
