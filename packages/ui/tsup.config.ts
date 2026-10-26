import { defineConfig, type Options } from "tsup";

/**
 * The map entry imports components and LocaleProvider from the main entry instead of
 * bundling its own copies: one React context for the texts, one copy of each component.
 */
const shareMainEntry: NonNullable<Options["esbuildPlugins"]>[number] = {
  name: "share-main-entry",
  setup(build) {
    build.onResolve({ filter: /^\.\.\// }, (args) =>
      /[\\/]src[\\/]map[\\/]/.test(args.importer)
        ? { path: "@irisui/ui", external: true }
        : undefined,
    );
  },
};

const shared: Options = {
  format: ["esm", "cjs"],
  // tsup 8.5 injects `baseUrl`, deprecated in TypeScript 6.
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  sourcemap: true,
  target: "es2022",
  external: ["react", "react-dom", "@irisui/utils", "@irisui/tokens"],
};

export default defineConfig([
  // Interactive components: marked as Client Components.
  { ...shared, entry: { index: "src/index.ts" }, banner: { js: '"use client";' } },
  // The map: its own entry, so that apps without a map never load MapLibre. ESM only,
  // like MapLibre itself.
  {
    ...shared,
    format: ["esm"],
    entry: { map: "src/map/index.ts" },
    external: [...(shared.external ?? []), "maplibre-gl", "@irisui/ui"],
    esbuildPlugins: [shareMainEntry],
    banner: { js: '"use client";' },
  },
  // Server-safe entry: plain functions callable from Server Components.
  { ...shared, entry: { "theme-script": "src/theme/theme-script.ts" } },
]);
