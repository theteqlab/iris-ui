# Changesets

Each pull request that changes a published package (`@irisui/ui`,
`@irisui/tokens`, `@irisui/utils`) should include a changeset:

```sh
pnpm changeset
```

Pick the packages, the bump type (patch, minor, major) and write a short
summary; this becomes the changelog entry.

On `main`, the Release workflow opens a "Version Packages" pull request that
bumps versions and updates the changelogs. Merging it publishes the new
versions to npm.
