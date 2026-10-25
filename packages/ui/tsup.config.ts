import { defineConfig, type Options } from "tsup";

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
  // Server-safe entry: plain functions callable from Server Components.
  { ...shared, entry: { "theme-script": "src/theme/theme-script.ts" } },
]);
